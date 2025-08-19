import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, CreditCard, MessageSquare, CheckCircle, Shield } from "lucide-react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("hiring");

  const hiringSteps = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Post a Job",
      description: "Describe your need in Hindi/English",
      detail: "Share your project requirements, budget, and timeline. Our platform supports both Hindi and English to ensure clear communication."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Choose Talent",
      description: "Browse Aadhaar-verified profiles",
      detail: "Review portfolios of verified talents from across India. Each profile shows skills, ratings, and location-specific expertise."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Pay Securely",
      description: "UPI/Cash | Money released only after approval",
      detail: "Make secure payments through UPI or other Indian payment methods. Funds are held in escrow until you approve the completed work."
    }
  ];

  const talentSteps = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Create Profile",
      description: "Showcase your skills and experience",
      detail: "Build a compelling profile highlighting your expertise, portfolio, and client testimonials. Get verified with Aadhaar for increased trust."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Find Projects",
      description: "Browse and apply to relevant jobs",
      detail: "Discover projects that match your skills across India. Send personalized proposals and stand out from the competition."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Get Paid",
      description: "Receive payments securely and on time",
      detail: "Get paid through UPI or bank transfer with our secure payment system. Track your earnings and manage invoices easily."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How WorkSpark Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            3 simple steps to hire safely or find work - designed for the Indian market
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="hiring" className="text-lg py-3">
              For Hiring
            </TabsTrigger>
            <TabsTrigger value="talent" className="text-lg py-3">
              For Talent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hiring" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              {hiringSteps.map((step, index) => (
                <Card key={index} className="card-hover bg-gradient-to-br from-saffron/5 to-indian-green/5 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-saffron to-indian-green rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-saffron text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-indian-green font-medium mb-4">
                      {step.description}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {step.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="hero" size="lg">
                Post Your First Job
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="talent" className="mt-0">
            <div className="grid md:grid-cols-3 gap-8">
              {talentSteps.map((step, index) => (
                <Card key={index} className="card-hover bg-gradient-to-br from-indian-green/5 to-saffron/5 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-indian-green to-saffron rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-indian-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-saffron font-medium mb-4">
                      {step.description}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {step.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="success" size="lg">
                Find Indian Talent
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;