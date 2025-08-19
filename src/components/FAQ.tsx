import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Users, Briefcase } from "lucide-react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const clientFAQs = [
    {
      question: "How do I post a job on WorkSpark India?",
      answer: "Simply click 'Post Your Job', describe your project requirements in Hindi or English, set your budget, and publish. It's completely free to post jobs."
    },
    {
      question: "How are talents verified on the platform?",
      answer: "All talents undergo Aadhaar verification, skill assessments, and background checks. We also verify their previous work experience and client reviews."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support UPI, net banking, credit/debit cards, and wallet payments. All payments are processed securely through Indian payment gateways."
    },
    {
      question: "Is there any commission or hidden fees?",
      answer: "No! We charge 0% commission on platform transactions. You only pay the agreed amount to your talent, with no additional platform fees."
    },
    {
      question: "How does the escrow system work?",
      answer: "Your payment is held securely until you approve the completed work. This protects both clients and talents, ensuring fair transactions."
    },
    {
      question: "Can I communicate with talents in Hindi?",
      answer: "Yes! Our platform supports both Hindi and English communication. Many of our talents are fluent in both languages."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We have a robust dispute resolution system. Our team mediates any issues and ensures fair outcomes for both parties."
    },
    {
      question: "How quickly can I find talents for urgent projects?",
      answer: "Most job posts receive proposals within 24 hours. For urgent projects, you can mark them as 'Urgent' to get faster responses."
    }
  ];

  const talentFAQs = [
    {
      question: "How do I create a profile on WorkSpark India?",
      answer: "Sign up with your mobile number, complete Aadhaar verification, add your skills and portfolio, and take skill assessments to get verified."
    },
    {
      question: "How much does it cost to apply for jobs?",
      answer: "Each job application costs a small fee (₹10-50 depending on job value). This ensures serious applications and reduces spam for clients."
    },
    {
      question: "How do I get paid for completed work?",
      answer: "Payments are released instantly via UPI once the client approves your work. You can also set up milestone-based payments for larger projects."
    },
    {
      question: "Can I set my own rates?",
      answer: "Absolutely! You have full control over your hourly rates and project prices. We provide market insights to help you price competitively."
    },
    {
      question: "How can I improve my profile ranking?",
      answer: "Complete your profile 100%, take skill assessments, maintain high ratings, respond quickly to messages, and deliver quality work on time."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support in Hindi and English via chat, email, and phone. Our team helps with technical issues, disputes, and account management."
    },
    {
      question: "Can I work with international clients?",
      answer: "Yes! While we focus on the Indian market, international clients looking for Indian talent can also post jobs on our platform."
    },
    {
      question: "How do I handle difficult clients?",
      answer: "Our support team helps mediate any disputes. We also provide guidelines for professional communication and project management."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using WorkSpark India for hiring talent or finding work.
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

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "clients" && (
            <Accordion type="single" collapsible className="space-y-4">
              {clientFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`client-${index}`}
                  className="bg-gray-50 rounded-lg px-6 border-0"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-saffron transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {activeTab === "talents" && (
            <Accordion type="single" collapsible className="space-y-4">
              {talentFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`talent-${index}`}
                  className="bg-gray-50 rounded-lg px-6 border-0"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-indian-green transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-saffron/5 to-indian-green/5 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 in Hindi and English to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Contact Support
            </Button>
            <Button variant="outline-saffron">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;