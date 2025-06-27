'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Twitter, Github, Download, Send, LogIn, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 apple-glass border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Visit Counter */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-3 text-xl font-bold text-foreground hover:text-primary transition-all duration-300"
              onClick={closeMenu}
            >
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-border/20">
                  <AvatarImage src="/profile.jpg" alt="Muditya Raghav" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">M</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-sm" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <span className="font-semibold tracking-tight">Muditya Raghav</span>
              </div>
            </Link>
            
            {/* Total Visits Counter - Desktop */}
            <div className="hidden md:flex items-center">
              <Badge variant="secondary" className="flex items-center gap-1.5 px-4 py-2 bg-blue-500/10 text-blue-700 border-blue-200/50 hover:bg-blue-500/20 transition-all duration-200 rounded-full">
                <Twitter className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">10k users</span>
              </Badge>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="apple-button hover:bg-muted/50" asChild>
              <a href="https://twitter.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="apple-button hover:bg-muted/50" asChild>
              <a href="https://github.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" asChild size="sm" className="apple-button border-border/50 hover:bg-muted/50">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </Button>
            <Button variant="outline" asChild size="sm" className="apple-button border-border/50 hover:bg-green-100 text-green-700 hover:text-green-900">
              <a href="https://cal.com/mudityadev/15min" target="_blank" rel="noopener noreferrer">
                <Clock className="w-4 h-4 mr-2" />
                Book 15min Meeting
              </a>
            </Button>
            <Dialog open={isContactModalOpen} onOpenChange={setContactModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="apple-button bg-primary hover:bg-primary/90 shadow-sm">
                  <Send className="w-4 h-4 mr-2" />
                  Message Me
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] apple-card">
                <DialogHeader>
                  <DialogTitle>Contact Me</DialogTitle>
                  <DialogDescription>
                    I'll get back to you as soon as possible.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm onSuccess={() => setContactModalOpen(false)} />
              </DialogContent>
            </Dialog>
            <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="apple-button border-border/50 hover:bg-muted/50">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] apple-card">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-full">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl">Coming Soon</DialogTitle>
                      <DialogDescription className="text-sm">
                        We're working hard on this feature
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    Our login system is currently under development. Soon you'll be able to create an account and interact with the community!
                  </p>
                  <div className="p-4 bg-muted/30 rounded-xl border border-border/20">
                    <p className="text-sm text-muted-foreground">
                      Stay tuned for updates on social media
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Total Visits Counter - Mobile */}
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-700 border-blue-200/50 rounded-full">
              <Twitter className="w-3 h-3" />
              <span className="text-xs font-medium">10k</span>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="apple-button px-2 hover:bg-muted/50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-3 apple-glass border-t border-border/20 flex flex-wrap justify-center items-center gap-2">
              <Button variant="ghost" size="icon" className="apple-button hover:bg-muted/50" asChild>
                <a href="https://twitter.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="apple-button hover:bg-muted/50" asChild>
                <a href="https://github.com/Mudityadev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" asChild className="apple-button border-border/50 hover:bg-muted/50">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Button variant="outline" asChild className="apple-button border-border/50 hover:bg-green-100 text-green-700 hover:text-green-900">
                <a href="https://cal.com/mudityadev/15min" target="_blank" rel="noopener noreferrer">
                  <Clock className="w-4 h-4 mr-2" />
                  Book 15min Meeting
                </a>
              </Button>
              <Dialog open={isContactModalOpen} onOpenChange={setContactModalOpen}>
                <DialogTrigger asChild>
                  <Button className="apple-button bg-primary hover:bg-primary/90 shadow-sm">
                    <Send className="w-4 h-4 mr-2" />
                    Message Me
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] apple-card">
                  <DialogHeader>
                    <DialogTitle>Contact Me</DialogTitle>
                    <DialogDescription>
                      I'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm onSuccess={() => setContactModalOpen(false)} />
                </DialogContent>
              </Dialog>
              <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="apple-button border-border/50 hover:bg-muted/50">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] apple-card">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-orange-500/10 rounded-full">
                        <Clock className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl">Coming Soon</DialogTitle>
                        <DialogDescription className="text-sm">
                          We're working hard on this feature
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      Our login system is currently under development. Soon you'll be able to create an account and interact with the community!
                    </p>
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/20">
                      <p className="text-sm text-muted-foreground">
                        Stay tuned for updates on social media
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 