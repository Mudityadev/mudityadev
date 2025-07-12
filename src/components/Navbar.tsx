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
import Gallery from './Gallery';
import UserWeatherBadge from './ui/UserWeatherBadge';

const galleryFiles = [
  '1.png','10.png','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','2.png','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.jpg','28.jpg','29.jpg','3.jpg','30.jpg','31.jpg','32.jpg','33.jpg','34.jpg','35.jpg','36.jpg','37.png','38.png','39.png','4.jpg','40.png','41.png','42.png','43.png','44.png','45.png','46.png','47.mp4','48.mp4','49.jpeg','5.jpg','50.jpeg','51.jpeg','52.jpeg','53.png','54.png','55.jpg','56.gif','57.mp4','58.jpg','59.jpg','6.jpg','60.png','61.mp4','62.png','7.png','8.jpg','9.jpg'
];

export default function Navbar({ onGalleryClick, onLogoClick }: { onGalleryClick?: () => void, onLogoClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  // Remove login modal state
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  // Remove isGalleryOpen

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
              onClick={e => { closeMenu(); if (onLogoClick) onLogoClick(); }}
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
              <UserWeatherBadge />
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
            <Button variant="outline" size="sm" className="apple-button border-border/50 hover:bg-blue-100 text-blue-700 hover:text-blue-900" onClick={onGalleryClick}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 17l6-6 4 4 8-8"/></svg>
              Gallery
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
            {/* Remove Login Dialog */}
          </div>




          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Total Visits Counter - Mobile */}
            <UserWeatherBadge />
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
              <Button variant="outline" className="apple-button border-border/50 hover:bg-blue-100 text-blue-700 hover:text-blue-900" onClick={onGalleryClick}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 17l6-6 4 4 8-8"/></svg>
                Gallery
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
              {/* Remove Login Dialog from mobile menu */}
            </div>
          </div>
        )}
      </div>
      {/* Remove <Dialog open={isGalleryOpen} ...> for Gallery */}
    </nav>
  );
} 