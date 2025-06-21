'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Mail, 
  Users, 
  Settings, 
  BarChart3, 
  LogOut,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Reply,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Footer } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContactMessage {
  id: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied?: boolean;
}

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dashboard states
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'replied' | 'not-replied'>('all');
  const [activeTab, setActiveTab] = useState('messages');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (key === 'admin2025' && password === 'muditya123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid key or password. Please try again.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      } else {
        setMessagesError('Failed to load messages.');
      }
    } catch (error) {
      setMessagesError('Failed to load messages.');
    }
    setLoadingMessages(false);
  };

  const markAsReplied = async (messageId: string) => {
    try {
      console.log('Marking message as replied:', messageId);
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId, replied: true }),
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (res.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, replied: true } : msg
        ));
        console.log('Message marked as replied successfully');
      } else {
        console.error('Failed to mark as replied:', data.error);
      }
    } catch (error) {
      console.error('Failed to mark as replied:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId }),
      });
      if (res.ok) {
        setMessages(messages.filter(msg => msg.id !== messageId));
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'replied' && msg.replied) ||
                         (filterStatus === 'not-replied' && !msg.replied);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: messages.length,
    replied: messages.filter(m => m.replied).length,
    notReplied: messages.filter(m => !m.replied).length,
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-muted/50 border-r border-border">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/profile.jpg" alt="Muditya Raghav" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                    M
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'messages' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Messages
                </Button>
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Separator className="my-4" />
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIsAuthenticated(false)}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold">Contact Messages</h1>
                      <p className="text-muted-foreground">Manage incoming messages from your portfolio</p>
                    </div>
                    <Button onClick={fetchMessages} disabled={loadingMessages}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${loadingMessages ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Total Messages</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{stats.total}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Replied</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{stats.replied}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{stats.notReplied}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search messages..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={filterStatus === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                          >
                            All
                          </Button>
                          <Button
                            variant={filterStatus === 'replied' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('replied')}
                          >
                            Replied
                          </Button>
                          <Button
                            variant={filterStatus === 'not-replied' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('not-replied')}
                          >
                            Pending
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Messages List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Messages ({filteredMessages.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingMessages ? (
                        <div className="text-center py-8">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                          <p className="text-muted-foreground">Loading messages...</p>
                        </div>
                      ) : messagesError ? (
                        <div className="text-center py-8">
                          <p className="text-destructive">{messagesError}</p>
                        </div>
                      ) : filteredMessages.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No messages found.</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Message</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredMessages.map((message, index) => (
                                <tr 
                                  key={message.id} 
                                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                                  }`}
                                >
                                  <td className="py-4 px-4">
                                    <div className="font-medium text-primary">{message.email}</div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="max-w-xs">
                                      <p className="text-sm text-foreground line-clamp-2">
                                        {message.message}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    {message.replied ? (
                                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Marked
                                      </Badge>
                                    ) : (
                                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                                        <Clock className="w-3 h-3 mr-1" />
                                        Pending
                                      </Badge>
                                    )}
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-sm text-muted-foreground">
                                      {new Date(message.createdAt).toLocaleDateString()}
                                      <br />
                                      <span className="text-xs">
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex space-x-2">
                                      {!message.replied && (
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => markAsReplied(message.id)}
                                          className="h-8 w-8 p-0"
                                          title="Mark as replied"
                                        >
                                          <Reply className="w-3 h-3" />
                                        </Button>
                                      )}
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => deleteMessage(message.id)}
                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                        title="Delete message"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <p className="text-muted-foreground">
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key">Admin Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="key"
                    type="text"
                    placeholder="Enter admin key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Contact the administrator if you need access
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
} 