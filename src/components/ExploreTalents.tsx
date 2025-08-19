import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Briefcase, Clock } from "lucide-react";

const talents = [
  {
    name: "Rajesh Kumar",
    title: "Full Stack Developer",
    location: "Mumbai",
    avatar: "👨‍💻",
    rating: 4.9,
    jobsCompleted: 127,
    hourlyRate: 1200,
    description: "Expert in React, Node.js, and cloud architecture. 8+ years building scalable web applications for startups and enterprises.",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    badge: "Top Full Stack Developer Mumbai",
    specialization: "Full Stack"
  },
  {
    name: "Priya Sharma",
    title: "Digital Marketing Expert",
    location: "Delhi",
    avatar: "👩‍💼",
    rating: 4.8,
    jobsCompleted: 89,
    hourlyRate: 800,
    description: "SEO specialist with proven track record of increasing organic traffic by 300%+ for Indian businesses.",
    skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
    badge: "Top SEO Expert Delhi",
    specialization: "SEO"
  },
  {
    name: "Arjun Patel",
    title: "UI/UX Designer",
    location: "Bangalore",
    avatar: "🎨",
    rating: 4.9,
    jobsCompleted: 156,
    hourlyRate: 1000,
    description: "Award-winning designer creating beautiful, user-centric interfaces for mobile and web applications.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    badge: "Top Visual Designer Bangalore",
    specialization: "Visual Designer"
  },
  {
    name: "Sneha Das",
    title: "Content Writer",
    location: "Kolkata",
    avatar: "✍️",
    rating: 4.7,
    jobsCompleted: 203,
    hourlyRate: 600,
    description: "Creative content strategist fluent in Hindi and English, specializing in tech and finance content.",
    skills: ["Content Strategy", "Blog Writing", "Copywriting", "SEO Writing"],
    badge: "Top Content Writer Kolkata",
    specialization: "Content Writer"
  },
  {
    name: "Vikram Singh",
    title: "PPC Specialist",
    location: "Mumbai",
    avatar: "📊",
    rating: 4.8,
    jobsCompleted: 94,
    hourlyRate: 900,
    description: "Google Ads certified expert managing ₹50+ lakhs in ad spend with proven ROI improvement.",
    skills: ["Google Ads", "Facebook Ads", "Analytics", "Conversion Optimization"],
    badge: "Top PPC Expert Mumbai",
    specialization: "PPC"
  },
  {
    name: "Anita Reddy",
    title: "Mobile App Developer",
    location: "Hyderabad",
    avatar: "📱",
    rating: 4.9,
    jobsCompleted: 78,
    hourlyRate: 1100,
    description: "React Native and Flutter expert with 50+ published apps on Play Store and App Store.",
    skills: ["React Native", "Flutter", "Firebase", "App Store Optimization"],
    badge: "Top Mobile Developer Hyderabad",
    specialization: "Mobile Developer"
  },
];

const ExploreTalents = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Top Indian Talents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Work with verified professionals who deliver exceptional results. Each talent is Aadhaar verified and has proven expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talents.map((talent, index) => (
            <Card 
              key={index} 
              className="card-hover cursor-pointer group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron/20 to-indian-green/20 flex items-center justify-center text-2xl">
                      {talent.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-saffron transition-colors">
                        {talent.name}
                      </h3>
                      <p className="text-sm text-gray-600">{talent.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{talent.rating}</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-saffron to-saffron-light text-white px-3 py-1 text-xs font-medium"
                  >
                    {talent.badge}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{talent.jobsCompleted} jobs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{talent.location}</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-indian-green" />
                    <span className="text-lg font-bold text-indian-green">₹{talent.hourlyRate}</span>
                    <span className="text-sm text-gray-600">/hour</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {talent.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="text-xs border-saffron/20 text-saffron bg-saffron/5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  variant="outline-saffron" 
                  className="w-full group-hover:bg-saffron group-hover:text-white transition-all duration-300"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="px-8">
            Browse All Talents
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreTalents;