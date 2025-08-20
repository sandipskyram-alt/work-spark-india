import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X } from "lucide-react";

const PostJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    budget_type: 'fixed',
    budget_min: '',
    budget_max: '',
    duration: '',
    experience_level: 'intermediate',
    skills_required: [] as string[],
    location_preference: '',
    is_remote: true,
    screening_questions: [] as string[]
  });
  const [newSkill, setNewSkill] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadCategories();
    loadSkills();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    // Check if user is a buyer
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (!profile || profile.user_type !== 'buyer') {
      toast({
        title: "Access Denied",
        description: "Only clients can post jobs.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setUser(profile);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from('job_categories')
      .select('*')
      .eq('is_active', true);
    
    if (data) setCategories(data);
  };

  const loadSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('name');
    
    if (data) setSkills(data);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills_required.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills_required: [...prev.skills_required, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.filter(s => s !== skill)
    }));
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setFormData(prev => ({
        ...prev,
        screening_questions: [...prev.screening_questions, newQuestion.trim()]
      }));
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screening_questions: prev.screening_questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const jobData = {
        poster_id: user.id,
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        budget_type: formData.budget_type,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        duration: formData.duration,
        experience_level: formData.experience_level,
        skills_required: formData.skills_required,
        location_preference: formData.location_preference,
        is_remote: formData.is_remote,
        screening_questions: formData.screening_questions,
        status: 'open'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Job Posted Successfully!",
        description: "Your job is now live and talents can start applying.",
      });

      navigate(`/jobs/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post job.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Post a New Job</CardTitle>
              <CardDescription>
                Find the perfect talent for your project on WorkSpark India
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Need SEO Expert for E-commerce Website"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, deliverables, and expectations..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Type */}
                <div className="space-y-3">
                  <Label>Budget Type *</Label>
                  <RadioGroup value={formData.budget_type} onValueChange={(value) => handleInputChange('budget_type', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly">Hourly Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="milestone" id="milestone" />
                      <Label htmlFor="milestone">Milestone Based</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Budget Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget_min">
                      {formData.budget_type === 'hourly' ? 'Min Hourly Rate (₹)' : 'Min Budget (₹)'}
                    </Label>
                    <Input
                      id="budget_min"
                      type="number"
                      placeholder="1000"
                      value={formData.budget_min}
                      onChange={(e) => handleInputChange('budget_min', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget_max">
                      {formData.budget_type === 'hourly' ? 'Max Hourly Rate (₹)' : 'Max Budget (₹)'}
                    </Label>
                    <Input
                      id="budget_max"
                      type="number"
                      placeholder="5000"
                      value={formData.budget_max}
                      onChange={(e) => handleInputChange('budget_max', e.target.value)}
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 2 weeks, 1 month, 3 months"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label>Experience Level Required</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills Required */}
                <div className="space-y-2">
                  <Label>Skills Required</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills_required.map((skill) => (
                      <div key={skill} className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <span className="text-sm">{skill}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 h-auto p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={formData.is_remote}
                      onCheckedChange={(checked) => handleInputChange('is_remote', checked)}
                    />
                    <Label htmlFor="remote">Remote work allowed</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai, Bangalore, or Any Location"
                      value={formData.location_preference}
                      onChange={(e) => handleInputChange('location_preference', e.target.value)}
                    />
                  </div>
                </div>

                {/* Screening Questions */}
                <div className="space-y-2">
                  <Label>Screening Questions (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a screening question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQuestion())}
                    />
                    <Button type="button" onClick={addQuestion} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.screening_questions.map((question, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-3 rounded">
                        <span className="text-sm">{question}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Posting Job..." : "Post Job"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;