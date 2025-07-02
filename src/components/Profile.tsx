'use client';

import { useState, useEffect } from "react";
import { Briefcase, Code, Heart, MessageCircle, ThumbsUp, User, Send, AlertCircle, ExternalLink, Trophy, ShoppingCart, Camera, Timer, Banknote, Link2, ShieldCheck, Zap, Puzzle, Search, Lock, Monitor, FileUp, Trash2, FlaskConical, CloudCog, ListChecks } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileInfo } from "./ProfileInfo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { DeFiAlert } from "@/components/ui/DeFiAlert";
// import { supabase } from '@/lib/supabaseClient';

const projects = [
  // QQShare
  {
    id: 4,
    title: "QQShare",
    github: "https://github.com/Mudityadev/QQShare-OneTime-Secure-File-Sharing",
    description: (
      <ul className="list-none space-y-2">
        <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-600" /> <b>Secure, one-time file sharing service</b></li>
        <li className="flex items-center gap-2"><FileUp className="w-4 h-4 text-blue-600" /> Upload a file (≤ 100 MB), get a link, and share for a single download within 60 minutes</li>
        <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-gray-700" /> <b>100% client-side encryption</b> (AES-GCM-256, optional password)</li>
        <li className="flex items-center gap-2"><Trash2 className="w-4 h-4 text-red-600" /> <b>One-time file sharing</b> (file deleted after first download)</li>
      </ul>
    ),
    videoEmbed: "", // No YouTube video provided
    likes: 53,
    comments: []
  },
  // PainPain Ransomware PoC
  {
    id: 3,
    title: "PainPain Ransomware PoC",
    github: "https://github.com/Mudityadev/PainPain-Ransomware-PoC",
    description: (
      <ul className="list-none space-y-2">
        <li className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-pink-600" /> <b>Modular, educational PoC ransomware</b></li>
        <li className="flex items-center gap-2"><Search className="w-4 h-4 text-blue-600" /> <b>Recursive file discovery</b> (configurable)</li>
        <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-gray-700" /> <b>AES encryption/decryption</b> (Fernet)</li>
        <li className="flex items-center gap-2"><Monitor className="w-4 h-4 text-indigo-600" /> <b>Tkinter GUI</b> (ransom note, timer, payment instructions)</li>
      </ul>
    ),
    videoEmbed: "https://www.youtube.com/embed/0KRUst9dbDk?si=Z8sisrBeoLvEV00t",
    likes: 23,
    comments: []
  },
  // QQPayment Gateway
  {
    id: 1,
    title: "QQPayment Gateway",
    github: "https://github.com/Mudityadev/QQ-Payment-Gateway",
    description: (
      <ul className="list-none space-y-2">
        <li className="flex items-center gap-2"><Banknote className="w-4 h-4 text-green-600" /> <b>Solana + Web3 payment gateway</b> for SMEs</li>
        <li className="flex items-center gap-2"><Link2 className="w-4 h-4 text-blue-600" /> <b>Fiat & crypto bridging</b> with seamless conversion</li>
        <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-yellow-600" /> <b>Double-spending deterrent</b> via Solana PoH</li>
        <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-600" /> <b>Frictionless payments</b> for businesses</li>
      </ul>
    ),
    videoEmbed: "https://www.youtube.com/embed/aW69AcN6NV4?si=GwIsM3W6EWPrPD44",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "Sarah Chen",
        content: "This is absolutely brilliant! The Solana integration is game-changing for small businesses.",
        timestamp: "2 hours ago",
        avatar: "SC",
        replies: [
          {
            id: 2,
            author: "Mike Johnson",
            content: "Agreed! The PoH consensus implementation is really innovative.",
            timestamp: "1 hour ago",
            avatar: "MJ"
          }
        ]
      },
      {
        id: 3,
        author: "Alex Rodriguez",
        content: "Would love to see more details about the fiat-crypto conversion process.",
        timestamp: "5 hours ago",
        avatar: "AR"
      }
    ]
  },
  // Contactless Payment and Checkout System
  {
    id: 2,
    title: "Contactless Payment and Checkout System",
    github: "https://github.com/Mudityadev/Justwalkout-Cashierless-checkout-system",
    description: (
      <ul className="list-none space-y-2">
        <li className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> <b>Microsoft Imagine Cup Hackathon Semi-Finalist</b></li>
        <li className="flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-blue-500" /> Contactless checkout with Face ID</li>
        <li className="flex items-center gap-2"><Camera className="w-4 h-4 text-green-500" /> Camera & weight sensor integration for security</li>
        <li className="flex items-center gap-2"><Timer className="w-4 h-4 text-purple-500" /> 60% reduction in checkout queues</li>
      </ul>
    ),
    videoEmbed: "https://www.youtube.com/embed/3PC0bQzyaNA?si=zx1QjtD0n7BBP4zh",
    likes: 38,
    comments: [
      {
        id: 4,
        author: "Emma Wilson",
        content: "The 60% reduction in checkout queues is impressive! This could revolutionize retail.",
        timestamp: "1 day ago",
        avatar: "EW"
      },
      {
        id: 5,
        author: "David Kim",
        content: "How does the Face ID system handle edge cases? Great work on the security aspect!",
        timestamp: "2 days ago",
        avatar: "DK",
        replies: [
          {
            id: 6,
            author: "Lisa Park",
            content: "I'm curious about the camera integration too. Very innovative approach!",
            timestamp: "1 day ago",
            avatar: "LP"
          }
        ]
      }
    ]
  }
];

const experience = [
  {
    id: 1,
    role: "QA Associate Engineer",
    company: "Reliance Jio Platforms",
    logo: "/jio.png",
    location: "Hyderabad, Telangana",
    duration: "Nov 2023 – May 2025",
    points: [
      { icon: <FlaskConical className="w-4 h-4 text-blue-600" />, text: "Automated feature and functional testing using advanced LLM in Automator AI" },
      { icon: <CloudCog className="w-4 h-4 text-green-600" />, text: "Enhanced REST API testing for improved application reliability" },
      { icon: <ListChecks className="w-4 h-4 text-purple-600" />, text: "Developed and executed comprehensive test cases (800+), scenarios, and user story validations" },
      { icon: <ShieldCheck className="w-4 h-4 text-yellow-600" />, text: "Conducted functionality, regression, integration, UAT, smoke, and performance testing for robust software validation" }
    ],
    likes: 56,
    comments: [
      {
        id: 7,
        author: "Tom Anderson",
        content: "800+ test cases is impressive! The LLM integration in testing is fascinating.",
        timestamp: "3 hours ago",
        avatar: "TA"
      },
      {
        id: 8,
        author: "Rachel Green",
        content: "Great experience with Jio! The automation work you did must have been challenging.",
        timestamp: "1 day ago",
        avatar: "RG"
      }
    ]
  },
  {
    id: 2,
    role: "Software Engineer Intern",
    company: "Persistent Systems",
    logo: "/persistentsys.png",
    location: "Remote",
    duration: "April 2022– June 2022",
    points: [
      { icon: <ListChecks className="w-4 h-4 text-blue-600" />, text: "Revolutionized testing tools in Excel, automating intricate data analyses and manipulations" },
      { icon: <Timer className="w-4 h-4 text-green-600" />, text: "Achieved a significant 90% reduction in testing durations, streamlining a 3-hour process to just 30 min" },
      { icon: <CloudCog className="w-4 h-4 text-purple-600" />, text: "Employed Python3, complemented by Pandas, for adept data handling and script optimization" }
    ],
    likes: 34,
    comments: [
      {
        id: 9,
        author: "Chris Lee",
        content: "90% reduction in testing time is incredible! Python + Pandas is a powerful combo.",
        timestamp: "4 hours ago",
        avatar: "CL"
      }
    ]
  },
  {
    id: 3,
    role: "Cyber Security Intern",
    company: "Cisco Network",
    logo: "/cisco.png",
    location: "Remote",
    duration: "April 2021– July 2021",
    points: [
      { icon: <ShieldCheck className="w-4 h-4 text-blue-600" />, text: "Conducted meticulous security evaluations on E-com websites, utilizing expert tools like Burp Suite and Nmap" },
      { icon: <Zap className="w-4 h-4 text-yellow-600" />, text: "Stepped into the realm of bug bounty, contributing to Paypal's vulnerability identification program via HackerOne" }
    ],
    likes: 47,
    comments: [
      {
        id: 10,
        author: "Zoe Martinez",
        content: "Bug bounty work is so exciting! Burp Suite and Nmap are essential tools.",
        timestamp: "6 hours ago",
        avatar: "ZM"
      },
      {
        id: 11,
        author: "Kevin Zhang",
        content: "PayPal's program is quite competitive. Great experience!",
        timestamp: "1 day ago",
        avatar: "KZ"
      }
    ]
  }
];

export function Profile() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [commentTexts, setCommentTexts] = useState<{ [key: string]: string }>({});
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loginAlertTimer, setLoginAlertTimer] = useState(4);
  // Skeleton loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = async (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    
    // Show login alert and start timer
    setShowLoginAlert(true);
    setLoginAlertTimer(4);
    
    // Optimistic update (will be reverted when modal closes)
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (!newSet.has(key)) {
        newSet.add(key);
      }
      return newSet;
    });
    // setLikeCounts(prev => ({
    //   ...prev,
    //   [key]: (prev[key] || 0) + 1,
    // }));
  };

  const toggleComments = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setShowComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const getLikesCount = (itemType: string, itemId: number, baseLikes: number) => {
    const key = `${itemType}-${itemId}`;
    return likedItems.has(key) ? baseLikes + 1 : baseLikes;
  };

  const handleCommentChange = (itemType: string, itemId: number, value: string) => {
    const key = `${itemType}-${itemId}`;
    setCommentTexts(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePostComment = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    const commentText = commentTexts[key]?.trim();
    
    if (!commentText) return;
    
    // Show login alert and start timer
    setShowLoginAlert(true);
    setLoginAlertTimer(4);
    
    // Clear the comment text
    setCommentTexts(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  const handleCloseLoginAlert = () => {
    setShowLoginAlert(false);
    // Revert optimistic like updates when modal closes
    setLikedItems(new Set());
    // setLikeCounts({});
  };

  // Auto-close timer for login alert
  useEffect(() => {
    if (showLoginAlert && loginAlertTimer > 0) {
      const timer = setTimeout(() => {
        setLoginAlertTimer(loginAlertTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showLoginAlert && loginAlertTimer === 0) {
      handleCloseLoginAlert();
    }
  }, [showLoginAlert, loginAlertTimer]);

  const CommentSection = ({ comments }: { comments: any[] }) => (
    <div className="mt-4 space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-primary">{comment.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-foreground">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
            </div>
          </div>
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-11 space-y-2">
              {comment.replies.map((reply: any) => (
                <div key={reply.id} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-muted/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">{reply.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{reply.author}</span>
                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const CommentField = ({ itemType, itemId }: { itemType: string; itemId: number }) => {
    const key = `${itemType}-${itemId}`;
    const commentText = commentTexts[key] || '';

    return (
      <div className="mt-4 p-4 bg-muted/20 rounded-xl border border-border/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => handleCommentChange(itemType, itemId, e.target.value)}
              className="min-h-[80px] resize-none apple-input border-border/30 focus:border-primary/50"
            />
            <div className="flex justify-end">
              <Button
                onClick={() => handlePostComment(itemType, itemId)}
                disabled={!commentText.trim()}
                className="apple-button bg-primary hover:bg-primary/90 shadow-sm"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/10 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Profile Info Component */}
          {loading ? (
            <div className="lg:w-1/3 space-y-6">
              <Skeleton className="h-10 w-48 mb-6" />
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="mb-6">
                  <Skeleton className="h-40 w-full mb-3 rounded-xl" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              ))}
              <Skeleton className="h-8 w-full rounded-full" />
            </div>
          ) : (
            <ProfileInfo loading={loading} />
          )}

          {/* Right Side - Content */}
          <div className="lg:w-2/3 space-y-6">
            <DeFiAlert />
            {/* Experience Section */}
            <Card className="apple-card border-border/30 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3 font-semibold tracking-tight">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="relative">
                      <div className="pl-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Skeleton className="h-6 w-40 mb-2" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <div className="flex items-center gap-4 pt-3">
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-20 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/60 to-primary/20 rounded-full"></div>
                      <div className="pl-6">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{exp.role}</h3>
                          <Badge variant="secondary" className="text-xs bg-muted/50 border-border/30 rounded-full px-3 py-1">{exp.duration}</Badge>
                        </div>
                        <p className="text-sm text-primary font-medium mb-3 flex items-center gap-2">
                          <img src={exp.logo} alt={exp.company + ' logo'} className="w-6 h-6 rounded-full object-contain bg-white border border-border/30" />
                          {exp.company} – {exp.location}
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                          {exp.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3">
                              {point.icon}
                              <span className="leading-relaxed">{point.text}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Like and Comment Buttons */}
                        <div className="flex items-center gap-4 pt-3 border-t border-border/20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike('experience', exp.id)}
                            className={`flex items-center gap-2 h-8 px-3 rounded-full transition-all duration-200 ${
                              likedItems.has(`experience-${exp.id}`)
                                ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(`experience-${exp.id}`) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{getLikesCount('experience', exp.id, exp.likes)}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleComments('experience', exp.id)}
                            className="flex items-center gap-2 h-8 px-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{exp.comments.length}</span>
                          </Button>
                        </div>

                        {/* Comments Section */}
                        {showComments.has(`experience-${exp.id}`) && (
                          <>
                            <CommentSection comments={exp.comments} />
                            <CommentField itemType="experience" itemId={exp.id} />
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="apple-card border-border/30 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3 font-semibold tracking-tight">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {loading ? (
                  // Skeletons for loading state
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="relative">
                      <div className="pl-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Skeleton className="h-6 w-40 mb-2" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <Skeleton className="h-48 w-full rounded-2xl mb-4" />
                        <div className="flex items-center gap-4 pt-3">
                          <Skeleton className="h-8 w-20 rounded-full" />
                          <Skeleton className="h-8 w-20 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  projects.map((project, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/60 to-primary/20 rounded-full"></div>
                      <div className="pl-6">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-foreground text-lg">{project.title}</h3>
                          <Link 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs border border-border/50 bg-background/50 hover:bg-primary/10 hover:border-primary/30 text-muted-foreground hover:text-primary rounded-full px-3 py-1 transition-all duration-200"
                          >
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          {project.title === "QQShare" && (
                            <Link
                              href="https://qq-share.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs border border-border/50 bg-background/50 hover:bg-green-100 hover:border-green-400 text-green-700 hover:text-green-900 rounded-full px-3 py-1 transition-all duration-200"
                            >
                              <span>Web Demo</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                          {project.title === "PainPain Ransomware PoC" && (
                            <Link
                              href="https://pain-pain-web.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs border border-border/50 bg-background/50 hover:bg-green-100 hover:border-green-400 text-green-700 hover:text-green-900 rounded-full px-3 py-1 transition-all duration-200"
                            >
                              <span>Web Demo</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                        
                        {/* Video/Image Preview */}
                        <div className="relative w-full overflow-hidden rounded-2xl border border-border/20 shadow-lg mb-4">
                          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            {project.title === "QQShare" ? (
                              <img
                                src="/QQShare_Demo.jpg"
                                alt="QQShare Demo"
                                className="absolute top-0 left-0 w-full h-full object-cover"
                              />
                            ) : (
                              <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={project.videoEmbed}
                                title={`${project.title} Demo`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            )}
                          </div>
                        </div>

                        {/* Like and Comment Buttons */}
                        <div className="flex items-center gap-4 pt-3 border-t border-border/20">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike('project', project.id)}
                            className={`flex items-center gap-2 h-8 px-3 rounded-full transition-all duration-200 ${
                              likedItems.has(`project-${project.id}`)
                                ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(`project-${project.id}`) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{getLikesCount('project', project.id, project.likes)}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleComments('project', project.id)}
                            className="flex items-center gap-2 h-8 px-3 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{project.comments.length}</span>
                          </Button>
                        </div>

                        {/* Comments Section */}
                        {showComments.has(`project-${project.id}`) && (
                          <>
                            <CommentSection comments={project.comments} />
                            <CommentField itemType="project" itemId={project.id} />
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Alert Dialog with Auto-close Timer */}
      <AlertDialog open={showLoginAlert} onOpenChange={(open) => !open && handleCloseLoginAlert()}>
        <AlertDialogContent className="apple-card">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/10 rounded-full">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <AlertDialogTitle className="flex items-center justify-between">
                  Login Required
                  {loginAlertTimer > 0 && (
                    <span className="text-sm font-normal text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                      Auto-close in {loginAlertTimer}s
                    </span>
                  )}
                </AlertDialogTitle>
              </div>
            </div>
            <AlertDialogDescription>
              You need to be logged in to like posts and post comments. Our login system is coming soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleCloseLoginAlert}
              className="apple-button bg-primary hover:bg-primary/90"
            >
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 