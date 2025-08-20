import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Users, TrendingUp } from "lucide-react";

const JobCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [talents, setTalents] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, avgBudget: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategoryData();
  }, [categoryName]);

  const loadCategoryData = async () => {
    if (!categoryName) return;

    setIsLoading(true);

    // Load category
    const { data: categoryData } = await supabase
      .from('job_categories')
      .select('*')
      .ilike('name', categoryName.replace('-', ' '))
      .single();

    if (!categoryData) {
      navigate('/jobs');
      return;
    }

    setCategory(categoryData);

    // Load jobs in this category
    const { data: jobsData } = await supabase
      .from('jobs')
      .select(`
        *,
        profiles (full_name, company_name, location, is_verified)
      `)
      .eq('category_id', categoryData.id)
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(10);

    if (jobsData) {
      setJobs(jobsData);
    }

    // Load talented professionals in this category
    const { data: talentsData } = await supabase
      .from('talent_profiles')
      .select(`
        *,
        profiles (full_name, location, avatar_url, is_verified)
      `)
      .contains('skills', JSON.stringify([categoryData.name]))
      .order('rating', { ascending: false })
      .limit(6);

    if (talentsData) {
      setTalents(talentsData);
    }

    // Calculate stats
    const { data: allCategoryJobs } = await supabase
      .from('jobs')
      .select('budget_max, status')
      .eq('category_id', categoryData.id);

    if (allCategoryJobs) {
      const totalJobs = allCategoryJobs.length;
      const activeJobs = allCategoryJobs.filter(job => job.status === 'open').length;
      const budgets = allCategoryJobs.filter(job => job.budget_max).map(job => job.budget_max);
      const avgBudget = budgets.length > 0 ? budgets.reduce((sum, budget) => sum + budget, 0) / budgets.length : 0;
      
      setStats({ totalJobs, activeJobs, avgBudget });
    }

    setIsLoading(false);
  };

  const formatBudget = (job: any) => {
    const { budget_type, budget_min, budget_max, currency } = job;
    const symbol = currency === 'INR' ? '₹' : '$';
    
    if (budget_type === 'hourly') {
      if (budget_min && budget_max) {
        return `${symbol}${budget_min}-${budget_max}/hr`;
      } else if (budget_min) {
        return `${symbol}${budget_min}+/hr`;
      }
      return 'Hourly rate TBD';
    } else {
      if (budget_min && budget_max) {
        return `${symbol}${budget_min.toLocaleString()}-${symbol}${budget_max.toLocaleString()}`;
      } else if (budget_min) {
        return `${symbol}${budget_min.toLocaleString()}+`;
      }
      return 'Budget TBD';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const getCityBadge = (location: string) => {
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
    const foundCity = cities.find(city => location?.includes(city));
    return foundCity ? `Top ${category?.name} Expert ${foundCity}` : `Top ${category?.name} Expert India`;
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-secondary/5 border-b">
        <div className="container mx-auto py-8 px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/jobs')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{category.name} Jobs</h1>
            <p className="text-muted-foreground mb-6">
              {category.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stats.activeJobs}</p>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">₹{Math.round(stats.avgBudget).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Avg. Project Value</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{talents.length}+</p>
                      <p className="text-sm text-muted-foreground">Expert Talents</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Talents Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Top {category.name} Experts</h2>
              <Button variant="outline" onClick={() => navigate('/talents')}>
                View All Talents
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talents.map((talent) => (
                <Card key={talent.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Profile Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {talent.profiles?.full_name?.charAt(0) || 'T'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{talent.profiles?.full_name}</h3>
                            <p className="text-sm text-muted-foreground">{talent.headline}</p>
                          </div>
                        </div>
                        {talent.profiles?.is_verified && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>

                      {/* Badge */}
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        {getCityBadge(talent.profiles?.location)}
                      </Badge>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="font-semibold">{talent.rating || 'New'}</span>
                          </div>
                          <p className="text-muted-foreground">Rating</p>
                        </div>
                        <div>
                          <p className="font-semibold">{talent.total_jobs || 0}</p>
                          <p className="text-muted-foreground">Jobs Done</p>
                        </div>
                      </div>

                      {/* Rate */}
                      <div>
                        <p className="text-lg font-bold text-primary">
                          ₹{talent.hourly_rate || 500}/hr
                        </p>
                        <p className="text-sm text-muted-foreground">Starting at</p>
                      </div>

                      {/* Skills */}
                      {talent.skills && talent.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {talent.skills.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button className="w-full">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Jobs Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent {category.name} Jobs</h2>
              <Button variant="outline" onClick={() => navigate(`/jobs?category=${category.id}`)}>
                View All Jobs
              </Button>
            </div>

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No active jobs in this category yet.</p>
                    <Button onClick={() => navigate('/post-job')}>
                      Post the First Job
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">
                                {job.profiles?.company_name || job.profiles?.full_name}
                              </span>
                              {job.profiles?.is_verified && (
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-muted-foreground ml-1">Verified</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary">
                              {formatBudget(job)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {job.budget_type === 'fixed' ? 'Fixed Price' : 
                               job.budget_type === 'hourly' ? 'Hourly' : 'Milestone'}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-2">
                          {job.description}
                        </p>

                        {/* Skills */}
                        {job.skills_required && job.skills_required.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {job.skills_required.slice(0, 5).map((skill: string) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills_required.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills_required.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <Separator />

                        {/* Footer */}
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            {job.is_remote ? (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>Remote</span>
                              </div>
                            ) : job.location_preference && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{job.location_preference}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{getTimeAgo(job.created_at)}</span>
                            </div>

                            <Badge variant={
                              job.experience_level === 'entry' ? 'secondary' :
                              job.experience_level === 'intermediate' ? 'default' : 'destructive'
                            }>
                              {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1">
                            <span>{job.applications_count || 0} proposals</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobCategory;