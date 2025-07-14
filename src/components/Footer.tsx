import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const currentYear = new Date().getFullYear();

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:mudityadev@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+918770428132', label: 'Phone' },
];

export default function Footer() {
  return (
    <footer className="relative apple-glass border-t border-border/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:20px_20px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright section */}
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground text-sm font-medium tracking-tight">
              © {currentYear} <span className="text-foreground font-semibold">Muditya Raghav</span>. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2 tracking-wide">
            I am a AI Researcher. interested in Autonomous Weapons | Diplomacy.
           </p>
          </div>

          {/* Contact links */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((social, index) => (
              <div key={social.label} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="apple-button h-11 w-11 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                  asChild
                >
                  <a
                    href={social.href}
                    target={social.label === 'Phone' ? undefined : '_blank'}
                    rel={social.label === 'Phone' ? undefined : 'noopener noreferrer'}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  </a>
                </Button>
                {/* Subtle indicator for phone */}
                {social.label === 'Phone' && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 