'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Clock, Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogTitle: string;
}

export function BlogModal({ isOpen, onClose, blogTitle }: BlogModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds countdown
  const [isVisible, setIsVisible] = useState(false);

  // Handle modal visibility with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeLeft(15);
      setEmail('');
      setError(null);
      setIsSuccess(false);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Auto-close timer
  useEffect(() => {
    if (isOpen && !isSuccess && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isOpen && !isSuccess && timeLeft === 0) {
      onClose();
    }
  }, [isOpen, timeLeft, isSuccess, onClose]);

  // Reset timer when user interacts
  const handleUserInteraction = () => {
    if (timeLeft < 15) {
      setTimeLeft(15);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!email) {
      setError('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Close modal after 3 seconds on success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail('');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with animation */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal with animation */}
      <div 
        className={`relative w-full max-w-md apple-card border-border/30 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onMouseEnter={handleUserInteraction}
        onFocus={handleUserInteraction}
      >
        {/* Auto-close Timer */}
        {!isSuccess && timeLeft > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-200/30 rounded-full">
              <Clock className="w-3 h-3 text-orange-500 flex-shrink-0" />
              <span className="text-xs font-medium text-orange-500 whitespace-nowrap">
                Auto-close in {timeLeft}s
              </span>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/60 transition-all duration-200 hover:scale-110"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="p-4 bg-green-500/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              You're on the list!
            </h3>
            <p className="text-muted-foreground">
              We'll notify you as soon as this blog post is ready.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="text-center">
                <div className="p-3 bg-blue-500/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Coming Soon
                </h2>
                <p className="text-sm text-muted-foreground">
                  This blog post is currently under development and will be published soon.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Get Early Access
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Be the first to know when this blog post goes live. Enter your email below to get notified instantly.
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleUserInteraction();
                      }}
                      onFocus={handleUserInteraction}
                      className="apple-input h-12 pl-10"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-200/50 rounded-xl animate-pulse">
                    <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full apple-button h-12 bg-primary hover:bg-primary/90 shadow-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                  onClick={handleUserInteraction}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 mr-2" />
                      Notify Me
                    </>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border/20">
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 