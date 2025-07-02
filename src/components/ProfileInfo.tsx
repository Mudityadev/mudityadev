'use client';

import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { BlogModal } from "./BlogModal";
import { Skeleton } from "@/components/ui/Skeleton";

// Dummy blog data (simulating API response)
const dummyBlogs = [
  {
    id: 1,
    title: "Why does India matter to the global crypto future?",
    excerpt: "With 1.4 billion people, 650 million internet users, a booming UPI-led digital payments ecosystem, and an entrepreneurial middle class, India isn't just an emerging market — it's the market.",
    date: "2024-06-01",
    readTime: "6 min read",
    category: "Crypto & India",
    thumbnail: "/share_market_india.jpg",
    link: "https://medium.com/@muditya.defi/why-does-india-matter-to-the-global-crypto-future-d475e662659a"
  },
  {
    id: 2,
    title: "How Modern Warfare is Reshaping Crypto Pricing, Policy, Protocols, and the Future of L2/L3 Systems",
    excerpt: "The war became a real-time stress test for decentralized systems, from Bitcoin's mempool congestion during relief campaigns to DeFi protocols handling sudden capital flight. The battleground wasn't just Donbas — it was also smart contracts, Layer-2 rollups, and wallet anonymity guarantees. This is modern warfare. It's asymmetric, hybrid, and increasingly waged not just with tanks and drones, but with block explorers, liquidity pools, and zero-knowledge proofs.",
    date: "2024-05-20",
    readTime: "8 min read",
    category: "Crypto & Warfare",
    thumbnail: "/riyadh_crypto.jpg",
    link: "https://medium.com/@muditya.defi/how-modern-warfare-is-reshaping-crypto-pricing-policy-protocols-and-the-future-of-l2-l3-systems-c0b3999f11a2"
  },
  {
    id: 3,
    title: "Israel-Iran Tensions: A Playbook for Navigating Market Turmoil",
    excerpt: "Israel's shadow war with Iran just went overt — and global markets flinched. For traders, these aren't just headlines; they're alpha signals wrapped in geopolitical noise.",
    date: "2024-04-15",
    readTime: "7 min read",
    category: "Geopolitics",
    thumbnail: "/israel_iran_war.jpg",
    link: "https://medium.com/@muditya.defi/israel-iran-tensions-a-playbook-for-navigating-market-turmoil-872bba816153"
  }
];

export function ProfileInfo({ loading = false }: { loading?: boolean }) {
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

  if (loading) {
    return (
      <Card className="apple-card border-border/30 shadow-lg lg:w-1/3">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-6 w-48" />
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="mb-6">
                <Skeleton className="h-40 w-full mb-3 rounded-xl" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            ))}
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

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
                  >
                    <a href={blog.link} target="_blank" rel="noopener noreferrer">
                      {blog.title}
                    </a>
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
                    asChild
                  >
                    <a href={blog.link} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
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
                asChild
              >
                <a href="https://medium.com/@muditya.defi" target="_blank" rel="noopener noreferrer">
                  View All Blog Posts
                  <ArrowRight className="h-3 w-3 ml-1" />
                </a>
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