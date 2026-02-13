import React, { useState } from 'react';
import { Share2, Mail, Send, PenTool, Sparkles, CheckCircle } from 'lucide-react';

const GalleryAndShare: React.FC = () => {
  const [testimony, setTestimony] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleShare = () => {
    if (!testimony.trim()) return;

    setIsSubmitting(true);
    
    const recipient = "abrahammartin5858@gmail.com";
    const subject = encodeURIComponent("My Rhapsody Testimony - THE LAST MAN");
    const bodyContent = `Here is my testimony about how Rhapsody of Realities changed my life:\n\n${testimony}`;
    const body = encodeURIComponent(bodyContent);
    
    const emailLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Brief delay to show active feedback before opening the mail client
    setTimeout(() => {
        window.location.href = emailLink;
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset the visual success state after a few seconds
        setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border-t-4 border-gold-500 mt-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sparkles size={120} />
      </div>

      <div className="text-center mb-10">
        <h3 className="text-3xl font-serif font-bold text-royal-900 mb-3 flex items-center justify-center gap-3">
          <Share2 className="text-gold-500" size={32} />
          Share Your Testimony
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto italic text-lg leading-relaxed">
          "The life-changing truths in this place, share your testimony and let the world see how Rhapsody of Realities changes lives."
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-royal-100 rounded-lg text-royal-700">
               <PenTool size={20} />
            </div>
            <h4 className="text-xl font-bold text-royal-900 font-serif">Your Story Matters</h4>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Write down how the Word through Rhapsody has transformed your situation. Every story is a seed of faith for someone else.
          </p>
          
          <div className="relative">
            <textarea
              value={testimony}
              onChange={(e) => {
                  setTestimony(e.target.value);
                  if (submitted) setSubmitted(false);
              }}
              placeholder="I started reading Rhapsody of Realities and my life began to change..."
              className="w-full min-h-[300px] p-6 rounded-2xl border border-gray-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 outline-none resize-none bg-gray-50 text-gray-800 text-lg leading-relaxed shadow-inner transition-all"
            />
            <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-400 pointer-events-none bg-white/90 px-3 py-1 rounded-full border border-gray-100">
              {testimony.length} characters
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleShare}
            disabled={!testimony.trim() || isSubmitting}
            className={`w-full py-5 rounded-xl flex items-center justify-center gap-3 font-bold text-xl shadow-xl transform transition-all duration-300
              ${!testimony.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : submitted 
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-royal-800 via-royal-700 to-royal-900 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] ring-offset-2 focus:ring-2 ring-royal-500'}
            `}
          >
            {isSubmitting ? (
               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : submitted ? (
               <>
                 <CheckCircle size={24} />
                 Ready to Send!
               </>
            ) : (
               <>
                 <Send size={24} className={testimony.trim() ? "animate-pulse" : ""} />
                 Submit My Testimony
               </>
            )}
          </button>
          
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-xs text-gray-400 flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <Mail size={12} className="text-gold-500" />
              Directly sent to: <span className="font-semibold text-royal-700">abrahammartin5858@gmail.com</span>
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Powered by THE LAST MAN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryAndShare;