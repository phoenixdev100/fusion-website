import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ApplyGuidelines() {
  const [hasRead, setHasRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const viewCounted = useRef(false);

  useEffect(() => {
    if (!viewCounted.current) {
      viewCounted.current = true;
      const currentViews = parseInt(localStorage.getItem('apply_guidelines_views') || '0');
      localStorage.setItem('apply_guidelines_views', (currentViews + 1).toString());
    }

    const guidelinesRead = localStorage.getItem('guidelines_read_timestamp');
    if (guidelinesRead) {
      const readTime = parseInt(guidelinesRead);
      const hoursSinceRead = (Date.now() - readTime) / (1000 * 60 * 60);
      if (hoursSinceRead < 24) {
        setHasRead(true);
        setScrollProgress(100);
      }
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setScrollProgress(scrollPercent);
      
      if (scrollPercent >= 85 && !hasRead) {
        setHasRead(true);
        localStorage.setItem('guidelines_read', 'true');
        localStorage.setItem('guidelines_read_timestamp', Date.now().toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasRead]);

  const guidelinesContent = `
# Application Guidelines

Welcome to the Fusion Network application process. Please read these guidelines carefully before submitting your application.

## General Requirements

### Age Requirement
- You must be **at least 15 years old** to apply for any position
- Age verification may be required during the application process

### Account Requirements
- Valid Minecraft account (Premium or Cracked, depending on position)
- Active Discord account
- Valid email address

### Language Requirements
- Fluent in English (written and spoken)
- Additional languages are a plus but not required

---

## Position-Specific Requirements

### 🛡️ Staff Position
- Minimum age: 15 years
- At least 10 hours per week availability
- Knowledge of server rules and regulations
- Experience with screensharing is preferred
- Must not be currently banned from the server

### 🎥 Media/YouTuber Position
- Active content creation (YouTube, Twitch, TikTok, etc.)
- Minimum subscriber/follower count varies by platform
- Regular upload schedule
- Family-friendly content

### 🏗️ Builder Position
- Portfolio of previous builds required
- Experience with Minecraft building
- Understanding of various building styles
- Available for project deadlines

### 💻 Developer Position
- Experience with Java/Plugin development or Web development
- Portfolio or GitHub repository required
- Understanding of Minecraft server architecture (for plugin devs)
- Available for ongoing development work

### 🤝 Partner Position
- Active community or server
- Minimum member count requirements
- Similar values and target audience
- Mutual benefit potential

---

## Application Process

### 1. Preparation
- Gather all required information before starting
- Prepare links to portfolios, channels, or previous work
- Have your timezone information ready

### 2. Submission
- Fill out all required fields completely
- Provide detailed, thoughtful answers
- Double-check for spelling and grammar
- Be honest and authentic

### 3. Review Period
- Applications are reviewed within 3-5 business days
- You may be contacted for additional information
- An interview may be scheduled for qualified candidates

### 4. Decision
- You will be notified via email and/or Discord
- Successful applicants will receive next steps
- Unsuccessful applicants may reapply after 30 days

---

## Important Notes

### ⚠️ Zero Tolerance Policy
We have a **zero tolerance policy** for:
- AI-generated applications
- Copied or plagiarized content
- False information
- Multiple applications for the same position

Any violation will result in immediate disqualification and potential blacklist from future applications.

### ✅ What We Look For
- **Authenticity**: Be yourself, show your personality
- **Dedication**: Demonstrate commitment to the role
- **Experience**: Relevant background and skills
- **Communication**: Clear, professional responses
- **Passion**: Genuine interest in Fusion Network

### 📧 Contact
If you have questions about the application process:
- Join our Discord server
- Open a support ticket
- Email: support@fusion-network.xyz

---

## Ready to Apply?

Make sure you've read and understood all guidelines above. Once you're ready, click the button below to start your application.

**Good luck!** 🍀
`;

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6 pb-48 bg-black">
      <div className="max-w-4xl mx-auto bg-black">
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#1A1D24] z-50">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        <Link to="/apply" className="inline-flex items-center gap-2 text-white/70 hover:text-purple-400 transition-colors mb-6 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Applications</span>
        </Link>

        <div className="mb-8 bg-black">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-3">
            Read Before Applying
          </h1>
          <p className="text-white/60 text-lg">Application Guidelines & Requirements</p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3"></div>
        </div>

        {!hasRead && (
          <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-lg shadow-sm mb-6 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-300 font-semibold mb-1">Keep Reading</h3>
                <p className="text-white/80 text-sm">
                  Scroll to the bottom of this page to unlock the application form. Progress: {Math.round(scrollProgress)}%
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none mb-8 bg-black">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold text-white mb-6 mt-10 first:mt-0 pb-3 border-b-2 border-purple-500/30" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-bold text-white mb-4 mt-8 pb-2 border-b border-white/20" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-semibold text-purple-300 mb-3 mt-6" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-white/80 mb-5 leading-relaxed text-lg" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-white/80" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-white/80" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-lg leading-relaxed" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="text-white font-bold" {...props} />
              ),
              hr: ({ node, ...props }) => (
                <hr className="border-white/20 my-8" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-purple-500 pl-6 italic text-white/70 my-6 py-2" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-black/40 px-2 py-1 rounded text-purple-300 text-base font-mono" {...props} />
              ),
            }}
          >
            {guidelinesContent}
          </ReactMarkdown>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[#0F1218] backdrop-blur-md border-t-2 border-white/10 p-4 sm:p-6 z-40">
          <div className="max-w-4xl mx-auto">
            <div className={`
              border-2 transition-all duration-300 rounded-lg shadow-sm p-4 sm:p-5
              ${hasRead 
                ? 'bg-green-900/20 border-green-500/60 shadow-lg shadow-green-500/20' 
                : 'bg-[#1A1D24] border-white/20'
              }
            `}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${hasRead 
                      ? 'bg-green-500/20 text-green-400 scale-110' 
                      : 'bg-purple-500/20 text-purple-400'
                    }
                  `}>
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold transition-colors ${hasRead ? 'text-green-400' : 'text-white'}`}>
                      {hasRead ? 'Guidelines Read ✓' : 'Please Read the Guidelines'}
                    </h3>
                    <p className="text-sm text-white/60">
                      {hasRead 
                        ? 'You may now proceed to the application' 
                        : `${Math.round(scrollProgress)}% complete`
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to="/apply">
                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                      Go Back
                    </Button>
                  </Link>
                  <Link to="/apply/form">
                    <Button 
                      className={`
                        font-semibold transition-all duration-300
                        ${hasRead 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 text-white' 
                          : 'bg-[#23272f] cursor-not-allowed opacity-50 text-white/50'
                        }
                      `}
                      disabled={!hasRead}
                    >
                      Proceed to Application →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}