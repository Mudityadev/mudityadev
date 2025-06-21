'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Twitter, Github, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactForm from './ContactForm';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-xl font-bold text-foreground hover:text-primary transition-colors"
            onClick={closeMenu}
          >
            <div className="relative">
              <Avatar className="w-9 h-9">
                <AvatarImage src="/profile.jpg" alt="Muditya Raghav" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <span className="font-semibold">Muditya Raghav</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" asChild size="sm">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
            <Dialog open={isContactModalOpen} onOpenChange={setContactModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Message Me
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Me</DialogTitle>
                  <DialogDescription>
                    I'll get back to you as soon as possible.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm onSuccess={() => setContactModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="px-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-3 bg-background border-t border-border flex justify-center items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Dialog open={isContactModalOpen} onOpenChange={setContactModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Message Me
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Me</DialogTitle>
                    <DialogDescription>
                      I'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm onSuccess={() => setContactModalOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 