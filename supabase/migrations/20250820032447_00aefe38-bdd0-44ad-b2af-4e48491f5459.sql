-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('buyer', 'talent')),
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  kyc_documents JSONB DEFAULT '{}',
  membership_plan TEXT DEFAULT 'individual' CHECK (membership_plan IN ('individual', 'agency', 'agency_plus')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table for categorization
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create talent profiles table for detailed seller information
CREATE TABLE public.talent_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  headline TEXT,
  hourly_rate DECIMAL(10,2),
  experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'expert')),
  portfolio_url TEXT,
  skills JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  work_history JSONB DEFAULT '[]',
  total_earnings DECIMAL(12,2) DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  badges JSONB DEFAULT '[]',
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'unavailable')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job categories table
CREATE TABLE public.job_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  parent_id UUID REFERENCES public.job_categories(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poster_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.job_categories(id),
  budget_type TEXT NOT NULL CHECK (budget_type IN ('fixed', 'hourly', 'milestone')),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  duration TEXT,
  experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'expert')),
  skills_required JSONB DEFAULT '[]',
  location_preference TEXT,
  is_remote BOOLEAN DEFAULT TRUE,
  attachments JSONB DEFAULT '[]',
  screening_questions JSONB DEFAULT '[]',
  status TEXT DEFAULT 'open' CHECK (status IN ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  applications_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job proposals table
CREATE TABLE public.job_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  talent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_budget DECIMAL(10,2) NOT NULL,
  proposed_duration TEXT,
  milestones JSONB DEFAULT '[]',
  attachments JSONB DEFAULT '[]',
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'shortlisted', 'interview', 'accepted', 'rejected', 'withdrawn')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, talent_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_proposals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for skills (public read)
CREATE POLICY "Anyone can view skills" ON public.skills FOR SELECT USING (true);

-- Create RLS policies for talent profiles
CREATE POLICY "Anyone can view talent profiles" ON public.talent_profiles FOR SELECT USING (true);
CREATE POLICY "Talents can update their own profile" ON public.talent_profiles 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = talent_profiles.profile_id 
    AND p.user_id = auth.uid()
  )
);
CREATE POLICY "Talents can insert their own profile" ON public.talent_profiles 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = talent_profiles.profile_id 
    AND p.user_id = auth.uid()
  )
);

-- Create RLS policies for job categories (public read)
CREATE POLICY "Anyone can view job categories" ON public.job_categories FOR SELECT USING (true);

-- Create RLS policies for jobs
CREATE POLICY "Anyone can view open jobs" ON public.jobs FOR SELECT USING (status = 'open' OR status = 'in_progress');
CREATE POLICY "Job posters can view their own jobs" ON public.jobs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = jobs.poster_id 
    AND p.user_id = auth.uid()
  )
);
CREATE POLICY "Buyers can insert jobs" ON public.jobs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = jobs.poster_id 
    AND p.user_id = auth.uid() 
    AND p.user_type = 'buyer'
  )
);
CREATE POLICY "Job posters can update their own jobs" ON public.jobs FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = jobs.poster_id 
    AND p.user_id = auth.uid()
  )
);

-- Create RLS policies for job proposals
CREATE POLICY "Job posters can view proposals for their jobs" ON public.job_proposals FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.jobs j 
    JOIN public.profiles p ON j.poster_id = p.id
    WHERE j.id = job_proposals.job_id 
    AND p.user_id = auth.uid()
  )
);
CREATE POLICY "Talents can view their own proposals" ON public.job_proposals FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = job_proposals.talent_id 
    AND p.user_id = auth.uid()
  )
);
CREATE POLICY "Talents can insert proposals" ON public.job_proposals FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = job_proposals.talent_id 
    AND p.user_id = auth.uid() 
    AND p.user_type = 'talent'
  )
);
CREATE POLICY "Talents can update their own proposals" ON public.job_proposals FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = job_proposals.talent_id 
    AND p.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_talent_profiles_updated_at
  BEFORE UPDATE ON public.talent_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_proposals_updated_at
  BEFORE UPDATE ON public.job_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample job categories
INSERT INTO public.job_categories (name, description, icon_url) VALUES
('Digital Marketing', 'SEO, PPC, Social Media Marketing, Content Marketing', '/icons/digital-marketing.svg'),
('UGC & Video Content', 'Video Production, UGC Creation, Animation, Editing', '/icons/video-content.svg'),
('Web Development', 'Frontend, Backend, Full-stack Development', '/icons/web-development.svg'),
('Graphic Design', 'Logo Design, Branding, UI/UX Design', '/icons/graphic-design.svg'),
('Content Writing', 'Blog Writing, Copywriting, Technical Writing', '/icons/content-writing.svg'),
('Data Analysis', 'Data Science, Analytics, Business Intelligence', '/icons/data-analysis.svg');

-- Insert sample skills
INSERT INTO public.skills (name, category) VALUES
('SEO', 'Digital Marketing'),
('Google Ads', 'Digital Marketing'),
('Facebook Ads', 'Digital Marketing'),
('Instagram Marketing', 'Digital Marketing'),
('Content Strategy', 'Digital Marketing'),
('Video Editing', 'UGC & Video Content'),
('Motion Graphics', 'UGC & Video Content'),
('YouTube Content', 'UGC & Video Content'),
('React', 'Web Development'),
('Node.js', 'Web Development'),
('Python', 'Web Development'),
('UI/UX Design', 'Graphic Design'),
('Logo Design', 'Graphic Design'),
('Figma', 'Graphic Design'),
('Content Writing', 'Content Writing'),
('Copywriting', 'Content Writing'),
('Technical Writing', 'Content Writing'),
('Data Analysis', 'Data Analysis'),
('Power BI', 'Data Analysis'),
('Excel', 'Data Analysis');