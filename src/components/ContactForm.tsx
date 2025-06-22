'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Loader2, CheckCircle2, Mail } from 'lucide-react';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!email || !message) {
      setError('Please fill out all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to send message.');
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess?.();
          setTimeout(() => {
            setIsSuccess(false);
            setEmail('');
            setMessage('');
          }, 500);
        }, 2000);
      }
    } catch (err) {
      setError('Failed to send message.');
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-[240px]">
        <div className="p-3 bg-green-500/10 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">Message Sent</h3>
        <p className="text-muted-foreground mt-2">I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="text-center p-4 apple-glass rounded-2xl border border-border/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-primary" />
          <p className="text-sm text-muted-foreground">
            You can also email me directly at:
          </p>
        </div>
        <span className="font-medium text-foreground text-base tracking-tight">mudityadev@gmail.com</span>
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="apple-input h-12 px-4"
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
        <Textarea
          id="message"
          placeholder="Hi, I'd like to connect with you..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isSubmitting}
          className="apple-input min-h-[120px] px-4 py-3 resize-none"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="apple-button h-12 bg-primary hover:bg-primary/90 shadow-sm font-medium"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
      
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-200/50 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
        </div>
      )}
    </form>
  );
} 