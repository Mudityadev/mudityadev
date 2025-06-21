'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && message) {
      console.log("Form submitted:", { email, message });
      setIsSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
        // Reset form after a delay to allow modal to close
        setTimeout(() => {
          setIsSuccess(false);
          setEmail('');
          setMessage('');
        }, 500);
      }, 2000); // Close modal after 2 seconds
    } else {
      setError('Please fill out all fields.');
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-[240px]">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold">Message Sent</h3>
        <p className="text-muted-foreground mt-1">I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="text-center p-3 bg-muted/30 rounded-lg border">
        <p className="text-sm text-muted-foreground">
          You can also email me directly at: <br />
          <span className="font-medium text-foreground text-base">mudityadev@gmail.com</span>
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Hi, I'd like to connect with you..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isSubmitting}
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
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
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
} 