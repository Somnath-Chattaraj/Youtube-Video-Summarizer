"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { YoutubeIcon, Loader2, Send } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function YouTubeSummarizer() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: `Summarize this YouTube video: ${youtubeUrl}` }]);

    try {
      const response = await axios.post(BACKEND_URL!, {
        youtubeUrl
      });
      // @ts-ignore
      const summary = response.data[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: summary }]);
      
      toast({
        title: "Success",
        description: "Summary generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I couldn't generate a summary for that video. Please try again or try a different video." }]);
    } finally {
      setLoading(false);
      setYoutubeUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-secondary/10 transition-colors duration-500 flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex-grow justify-center flex flex-col">
        <div className="space-y-8 flex-grow flex flex-col">
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2">
              <YoutubeIcon className="h-12 w-12 text-red-600" />
              <h1 className="text-4xl font-bold">YouTube Summarizer</h1>
            </div>
            <p className="text-muted-foreground">
              Get quick summaries of YouTube videos in seconds
            </p>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            
          </motion.div>

          {/* Chat Interface */}
          <Card className="flex-grow flex flex-col">
            <CardHeader>
              <CardTitle>Video Summaries</CardTitle>
              <CardDescription>
                Your conversation with the YouTube Summarizer
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.role === 'assistant' ? (
                          <ReactMarkdown className="prose dark:prose-invert">
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  type="submit" 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}