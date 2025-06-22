import { Briefcase, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileInfo } from "./ProfileInfo";

const projects = [
  {
    title: "QQPayment Gateway",
    github: "Github/QQPay",
    description: "Engineered a payment gateway, leveraging Solana Network and Web3, bridging fiat and cryptocurrency for SMEs. Integrated a double-spending deterrent via Solana's Proof of History (PoH) consensus. Enabled frictionless conversions between cryptocurrencies and fiat, democratizing payment choices for businesses.",
    videoEmbed: "https://www.youtube.com/embed/aW69AcN6NV4?si=GwIsM3W6EWPrPD44"
  },
  {
    title: "Contactless Payment and Checkout System",
    github: "Github/Justwalkout",
    description: "Semi-Finalist, Microsoft Imagine Cup Hackathon 2021. Designed high-performance web applications harnessing Django Rest Framework. Amplified store security by 40% with a virtual cart system, integrating cameras and weight sensors, deterring shoplifting. Slashed checkout queues by 60% with a Face ID-based contactless payment system, elevating shopping experiences.",
    videoEmbed: "https://www.youtube.com/embed/3PC0bQzyaNA?si=zx1QjtD0n7BBP4zh"
  }
];

const experience = [
  {
    role: "QA Associate Engineer",
    company: "Reliance Jio Platforms",
    location: "Hyderabad, Telangana",
    duration: "Aug 2019– May 2023",
    points: [
      "Automated feature and functional testing using advanced LLM in Automator AI",
      "Enhanced REST API testing for improved application reliability",
      "Developed and executed comprehensive test cases (800+), scenarios, and user story validations",
      "Conducted functionality, regression, integration, UAT, smoke, and performance testing for robust software validation"
    ]
  },
  {
    role: "Software Engineer Intern",
    company: "Persistent Systems",
    location: "Remote",
    duration: "April 2022– June 2022",
    points: [
      "Revolutionized testing tools in Excel, automating intricate data analyses and manipulations",
      "Achieved a significant 90% reduction in testing durations, streamlining a 3-hour process to just 30 min",
      "Employed Python3, complemented by Pandas, for adept data handling and script optimization"
    ]
  },
  {
    role: "Cyber Security Intern",
    company: "Cisco Network",
    location: "Remote",
    duration: "April 2021– July 2021",
    points: [
      "Conducted meticulous security evaluations on E-com websites, utilizing expert tools like Burp Suite and Nmap",
      "Stepped into the realm of bug bounty, contributing to Paypal's vulnerability identification program via HackerOne"
    ]
  }
];

export function Profile() {
  return (
    <div className="bg-gradient-to-br from-background to-muted/20 p-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Profile Info Component */}
          <ProfileInfo />

          {/* Right Side - Content */}
          <div className="lg:w-2/3 space-y-4">
            {/* Experience Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <Badge variant="secondary" className="text-xs">{exp.duration}</Badge>
                    </div>
                    <p className="text-sm text-primary mb-2">{exp.company} – {exp.location}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {exp.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <Badge variant="outline" className="text-xs">{project.github}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    
                    {/* Video Embed */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={project.videoEmbed}
                        title={`${project.title} Demo`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 