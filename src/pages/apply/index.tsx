import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Pin, Eye, ChevronRight } from 'lucide-react';

export default function ApplyCategory() {
  const [views, setViews] = useState({
    guidelines: 0,
    form: 0
  });
  const viewCounted = useRef(false);

  useEffect(() => {
    if (!viewCounted.current) {
      viewCounted.current = true;
      
      const guidelinesViews = parseInt(localStorage.getItem('apply_guidelines_views') || '0');
      const formViews = parseInt(localStorage.getItem('apply_form_views') || '0');
      
      setViews({
        guidelines: guidelinesViews,
        form: formViews
      });
    }
  }, []);

  const threads = [
    {
      id: 1,
      title: 'Read Before Applying',
      description: 'Important guidelines and requirements for all applicants. Please read carefully before submitting your application.',
      isPinned: true,
      views: views.guidelines,
      link: '/apply/guidelines',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-600',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60'
    },
    {
      id: 2,
      title: 'Apply Here',
      description: 'Ready to join our team? Submit your application here for Staff, Media, Builder, Developer, or Partnership positions.',
      isPinned: true,
      views: views.form,
      link: '/apply/form',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-600',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60'
    }
  ];

  return (
    <div className="min-h-[70vh] py-8 px-4 sm:py-12 sm:px-6 bg-black">
      <div className="max-w-5xl mx-auto bg-black">
        <div className="mb-8 bg-black">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-3">
            Applications
          </h1>
          <p className="text-white/60 text-lg">Join the Fusion Network team</p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3"></div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-purple-900/30 border-2 border-purple-500/50 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-purple-300 text-xl font-bold mb-2">Before You Apply</h3>
              <p className="text-white/90 leading-relaxed">
                All applications must be written personally by you. Applications created using AI tools or copied content will be <span className="text-red-400 font-semibold">automatically rejected</span>. 
                We value authenticity and are looking for genuine individuals who want to contribute to our community.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8 bg-black">
          {threads.map((thread) => {
            return (
              <Link key={thread.id} to={thread.link} className="block group">
                <div className={`
                  bg-gradient-to-br from-[#1A1D24] to-[#151821] border-2 ${thread.borderColor} ${thread.hoverBorder}
                  transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10
                  hover:-translate-y-1 overflow-hidden rounded-lg shadow-sm p-6
                `}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        {thread.isPinned && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                            <Pin className="h-3.5 w-3.5 text-amber-400" />
                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Pinned</span>
                          </div>
                        )}
                      </div>
                      
                      <h2 className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${thread.gradientFrom} ${thread.gradientTo} mb-3 group-hover:scale-[1.02] transition-transform origin-left`}>
                        {thread.title}
                      </h2>
                      
                      <p className="text-white/70 text-base leading-relaxed mb-4">
                        {thread.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">{thread.views.toLocaleString()} views</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 group-hover:scale-110 transition-all duration-300">
                        <ChevronRight className="h-6 w-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#1A1D24] to-[#151821] border border-white/10 rounded-lg shadow-sm p-6 sm:p-8">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Quick Tips for Applicants
          </h3>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-purple-400 font-bold text-lg">1.</span>
              <span className="text-white/80">Read all guidelines thoroughly before starting your application</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-purple-400 font-bold text-lg">2.</span>
              <span className="text-white/80">Ensure you meet the minimum requirements for your desired position</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-purple-400 font-bold text-lg">3.</span>
              <span className="text-white/80">Take your time to write thoughtful, detailed, and honest responses</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-purple-400 font-bold text-lg">4.</span>
              <span className="text-white/80">Applications are typically reviewed within 3-5 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}