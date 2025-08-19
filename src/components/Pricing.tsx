import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, Briefcase } from "lucide-react";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const clientFeatures = [
    "Post a job for free",
    "Only one-time pay when a contract is initiated", 
    "0% commission on the platform transactions",
    "Aadhaar verified talent pool",
    "UPI & instant payments",
    "24/7 Hindi & English support",
    "Milestone-based payments",
    "Dispute resolution system"
  ];

  const talentFeatures = [
    "0% commission on the platform transactions",
    "UPI & instant payments",
    "No fixed monthly subscription charge, only pay when you apply for a job",
    "Profile verification & badge system",
    "Direct client communication",
    "Skill assessments & certifications",
    "Portfolio showcase",
    "Rating & review system"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No hidden fees, no surprises. Pay only when you hire or get hired.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === "clients" ? "hero" : "ghost"}
              onClick={() => setActiveTab("clients")}
              className="px-8 py-3 rounded-md transition-all duration-300"
            >
              <Users className="h-4 w-4 mr-2" />
              For Clients
            </Button>
            <Button
              variant={activeTab === "talents" ? "success" : "ghost"}
              onClick={() => setActiveTab("talents")}
              className="px-8 py-3 rounded-md transition-all duration-300"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              For Talents
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "clients" && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-saffron/20 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron to-saffron-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">For Clients</CardTitle>
                  <p className="text-gray-600">Hire the best talent without any upfront costs</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clientFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-saffron" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-6">
                    <Button variant="hero" className="w-full" size="lg">
                      Start Hiring Today
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-lg">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-lg font-bold">🏢</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                  <p className="text-gray-600">Custom solutions for large organizations</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Custom pricing for teams with 50+ members</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Dedicated account manager</li>
                      <li>• Custom integration support</li>
                      <li>• Volume discounts</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <Button variant="outline-saffron" className="w-full" size="lg">
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "talents" && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-indian-green/20 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indian-green to-indian-green-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">For Talents</CardTitle>
                  <p className="text-gray-600">Keep 100% of what you earn with transparent pricing</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {talentFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-indian-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-indian-green" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-6">
                    <Button variant="success" className="w-full" size="lg">
                      Join as Talent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-lg">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-lg font-bold">⭐</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Premium Talent</CardTitle>
                  <p className="text-gray-600">Enhanced visibility and priority support</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">₹99/month for verified professionals</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Premium badge on profile</li>
                      <li>• Higher search ranking</li>
                      <li>• Priority customer support</li>
                      <li>• Advanced analytics</li>
                    </ul>
                  </div>
                  <div className="pt-6">
                    <Button variant="outline-green" className="w-full" size="lg">
                      Upgrade to Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Trust Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-saffron/5 to-indian-green/5 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted by 50,000+ Indian Professionals
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful clients and talents who have built their businesses on WorkSpark India. 
            Start your journey today with our transparent, commission-free platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;