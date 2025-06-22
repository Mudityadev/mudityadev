'use client';

import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { BlogModal } from "./BlogModal";

// Dummy blog data (simulating API response)
const dummyBlogs = [
  {
    id: 1,
    title: "Israel-Iran Tensions: A Deep Dive into Regional Dynamics",
    excerpt: "Analyzing the complex geopolitical landscape between Israel and Iran, examining historical tensions, nuclear concerns, and the impact on Middle East stability...",
    date: "2024-01-15",
    readTime: "7 min read",
    category: "Geopolitics",
    thumbnail: "/israel-war.jpg"
  },
  {
    id: 2,
    title: "Ukraine-Russia Conflict: The Evolution of Modern Warfare",
    excerpt: "Analyzing the technological and strategic developments in the Ukraine-Russia conflict, from drone warfare to cyber attacks and their global implications...",
    date: "2024-01-20",
    readTime: "9 min read",
    category: "War Analysis",
    thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&h=200&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "The Gaza Crisis: Humanitarian Impact and International Response",
    excerpt: "Examining the humanitarian consequences of the Gaza conflict, international aid efforts, and the challenges of providing assistance in conflict zones...",
    date: "2024-01-18",
    readTime: "10 min read",
    category: "Humanitarian",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center"
  }
];

export function ProfileInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string>('');

  const handleBlogClick = (blogTitle: string) => {
    setSelectedBlog(blogTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog('');
  };

  return (
    <>
      <Card className="apple-card border-border/30 shadow-lg lg:w-1/3">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Blog Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">Latest Blog Posts</h2>
            </div>

            {/* Blog Posts */}
            {dummyBlogs.map((blog) => (
              <article key={blog.id} className="group apple-card border-border/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Blog Thumbnail */}
                <div className="relative w-full h-40 bg-muted overflow-hidden">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-5 space-y-3">
                  {/* Blog Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  {/* Blog Title */}
                  <h3 
                    className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
                    onClick={() => handleBlogClick(blog.title)}
                  >
                    {blog.title}
                  </h3>

                  {/* Blog Excerpt */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-3 text-xs text-primary hover:text-primary/80 hover:bg-primary/5 rounded-full transition-all duration-200 p-0"
                    onClick={() => handleBlogClick(blog.title)}
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </article>
            ))}

            {/* View All Posts Button */}
            <div className="pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs apple-button border-border/50 hover:bg-muted/50 rounded-full"
                onClick={() => handleBlogClick("All Blog Posts")}
              >
                View All Blog Posts
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        blogTitle={selectedBlog}
      />
    </>
  );
} 