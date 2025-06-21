import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, Download, Code2 } from "lucide-react";
import { Navbar, Footer } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python'];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@muditya.dev', label: 'Email' },
];

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Technologies' },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <Card className="p-8 md:p-12">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="relative">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40">
                      <AvatarImage src="/profile.jpg" alt="Muditya Raghav Profile" />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80">
                        M
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Muditya Raghav
                      </CardTitle>
                    </CardHeader>
                    <p className="text-xl text-primary font-medium mb-4">
                      Full Stack Developer
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl">
                      Passionate developer crafting digital experiences with modern technologies. 
                      I love building scalable applications and exploring new tech stacks. 
                      Currently focused on React, Next.js, and cloud technologies.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                      <Button asChild>
                        <a 
                          href="/resume.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download CV
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="mailto:contact@muditya.dev">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Me
                        </a>
                      </Button>
                    </div>

                    <div className="flex gap-2 justify-center md:justify-start">
                      {socialLinks.map((social) => (
                        <Button
                          key={social.label}
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            <social.icon className="w-4 h-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
