import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import digitalMarketingIcon from "@/assets/digital-marketing-icon.jpg";
import webDevelopmentIcon from "@/assets/web-development-icon.jpg";
import contentWritingIcon from "@/assets/content-writing-icon.jpg";

const categories = [
  {
    title: "Digital Marketing",
    icon: digitalMarketingIcon,
    description: "SEO, Social Media, PPC, Content Marketing",
    jobs: "2,500+ jobs",
  },
  {
    title: "Web Development",
    icon: webDevelopmentIcon,
    description: "React, Node.js, WordPress, E-commerce",
    jobs: "1,800+ jobs",
  },
  {
    title: "Content Writing",
    icon: contentWritingIcon,
    description: "Blog Writing, Copywriting, Technical Writing",
    jobs: "3,200+ jobs",
  },
  {
    title: "Mobile App Development",
    icon: webDevelopmentIcon,
    description: "iOS, Android, React Native, Flutter",
    jobs: "1,200+ jobs",
  },
  {
    title: "Graphic Design",
    icon: digitalMarketingIcon,
    description: "Logo Design, UI/UX, Brand Identity",
    jobs: "2,100+ jobs",
  },
  {
    title: "Video Production",
    icon: contentWritingIcon,
    description: "Video Editing, Animation, Production",
    jobs: "950+ jobs",
  },
];

const JobCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities across various industries and find the perfect project that matches your skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="card-hover cursor-pointer group bg-white border-0"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={category.icon}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-saffron transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <p className="text-indian-green font-medium text-sm">
                      {category.jobs}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline-saffron" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;