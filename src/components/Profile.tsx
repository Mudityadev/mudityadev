'use client';

import { useState, useEffect } from "react";
import { Briefcase, Code, Heart, MessageCircle, ThumbsUp, User, Send, AlertCircle } from "lucide-react";
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

const projects = [
  {
    id: 1,
    title: "QQPayment Gateway",
    github: "Github/QQPay",
    description: "Engineered a payment gateway, leveraging Solana Network and Web3, bridging fiat and cryptocurrency for SMEs. Integrated a double-spending deterrent via Solana's Proof of History (PoH) consensus. Enabled frictionless conversions between cryptocurrencies and fiat, democratizing payment choices for businesses.",
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
  {
    id: 2,
    title: "Contactless Payment and Checkout System",
    github: "Github/Justwalkout",
    description: "Semi-Finalist, Microsoft Imagine Cup Hackathon 2021. Designed high-performance web applications harnessing Django Rest Framework. Amplified store security by 40% with a virtual cart system, integrating cameras and weight sensors, deterring shoplifting. Slashed checkout queues by 60% with a Face ID-based contactless payment system, elevating shopping experiences.",
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
    location: "Hyderabad, Telangana",
    duration: "Aug 2019– May 2023",
    points: [
      "Automated feature and functional testing using advanced LLM in Automator AI",
      "Enhanced REST API testing for improved application reliability",
      "Developed and executed comprehensive test cases (800+), scenarios, and user story validations",
      "Conducted functionality, regression, integration, UAT, smoke, and performance testing for robust software validation"
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
    location: "Remote",
    duration: "April 2022– June 2022",
    points: [
      "Revolutionized testing tools in Excel, automating intricate data analyses and manipulations",
      "Achieved a significant 90% reduction in testing durations, streamlining a 3-hour process to just 30 min",
      "Employed Python3, complemented by Pandas, for adept data handling and script optimization"
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
    location: "Remote",
    duration: "April 2021– July 2021",
    points: [
      "Conducted meticulous security evaluations on E-com websites, utilizing expert tools like Burp Suite and Nmap",
      "Stepped into the realm of bug bounty, contributing to Paypal's vulnerability identification program via HackerOne"
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

  const handleLike = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
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

  // Auto-close timer for login alert
  useEffect(() => {
    if (showLoginAlert && loginAlertTimer > 0) {
      const timer = setTimeout(() => {
        setLoginAlertTimer(loginAlertTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showLoginAlert && loginAlertTimer === 0) {
      setShowLoginAlert(false);
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
          <ProfileInfo />

          {/* Right Side - Content */}
          <div className="lg:w-2/3 space-y-6">
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
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/60 to-primary/20 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground text-lg">{exp.role}</h3>
                        <Badge variant="secondary" className="text-xs bg-muted/50 border-border/30 rounded-full px-3 py-1">{exp.duration}</Badge>
                      </div>
                      <p className="text-sm text-primary font-medium mb-3">{exp.company} – {exp.location}</p>
                      <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                        {exp.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{point}</span>
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
                ))}
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
                {projects.map((project, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/60 to-primary/20 rounded-full"></div>
                    <div className="pl-6">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-foreground text-lg">{project.title}</h3>
                        <Badge variant="outline" className="text-xs border-border/50 bg-background/50 rounded-full px-3 py-1">{project.github}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                      
                      {/* Video Embed */}
                      <div className="relative w-full overflow-hidden rounded-2xl border border-border/20 shadow-lg mb-4">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={project.videoEmbed}
                            title={`${project.title} Demo`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
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
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Alert Dialog with Auto-close Timer */}
      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
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
              You need to be logged in to post comments. Our login system is coming soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowLoginAlert(false)}
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