import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Clock, DollarSign, Filter, Star } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
    loadCategories();
    
    // Handle category filter from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    loadJobs();
  }, [selectedCategory, budgetRange, experienceLevel, searchQuery]);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('job_categories')
      .select('*')
      .eq('is_active', true);
    
    if (data) setCategories(data);
  };

  const loadJobs = async () => {
    setIsLoading(true);
    
    let query = supabase
      .from('jobs')
      .select(`
        *,
        job_categories (name),
        profiles (full_name, company_name, location, is_verified)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    // Apply filters
    if (selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory);
    }

    if (experienceLevel !== 'all') {
      query = query.eq('experience_level', experienceLevel);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading jobs:', error);
    } else {
      let filteredJobs = data || [];

      // Apply budget filter
      if (budgetRange !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
          const maxBudget = job.budget_max || job.budget_min;
          if (!maxBudget) return true;
          
          switch (budgetRange) {
            case 'under-5k':
              return maxBudget < 5000;
            case '5k-15k':
              return maxBudget >= 5000 && maxBudget <= 15000;
            case '15k-50k':
              return maxBudget >= 15000 && maxBudget <= 50000;
            case 'above-50k':
              return maxBudget > 50000;
            default:
              return true;
          }
        });
      }

      setJobs(filteredJobs);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/3 to-secondary/5 border-b">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Find Your Next Project</h1>
            <p className="text-muted-foreground mb-6">
              Discover opportunities from Indian businesses and global clients
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Budget Range</h3>
                  <Select value={budgetRange} onValueChange={setBudgetRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Budget</SelectItem>
                      <SelectItem value="under-5k">Under ₹5,000</SelectItem>
                      <SelectItem value="5k-15k">₹5,000 - ₹15,000</SelectItem>
                      <SelectItem value="15k-50k">₹15,000 - ₹50,000</SelectItem>
                      <SelectItem value="above-50k">Above ₹50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium">Experience Level</h3>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Level</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {isLoading ? "Loading..." : `${jobs.length} jobs found`}
              </p>
              <Button onClick={() => navigate('/post-job')} className="bg-primary hover:bg-primary/90">
                Post a Job
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-full"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setBudgetRange('all');
                      setExperienceLevel('all');
                    }}>
                      Clear Filters
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;