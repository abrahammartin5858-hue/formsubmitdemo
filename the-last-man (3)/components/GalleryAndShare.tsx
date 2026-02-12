import React, { useState } from 'react';
import { Share2, Upload, Camera, Mail, Send, PenTool, Sparkles } from 'lucide-react';

const GalleryAndShare: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [testimony, setTestimony] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (!testimony.trim()) return;

    const recipient = "abrahammartin5858@gmail.com";
    const subject = encodeURIComponent("My Rhapsody Testimony - How It Changed My Life");
    const bodyContent = `Here is my testimony about how Rhapsody of Realities changed my life:\n\n${testimony}\n\n(Note: If you uploaded a photo, please attach it to this email manually before sending.)`;
    const body = encodeURIComponent(bodyContent);
    
    // Construct mailto link
    const emailLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Visual feedback before action
    if (confirm("This will open your email client to send the testimony to " + recipient + ". Continue?")) {
        window.location.href = emailLink;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-4 border-gold-500 mt-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sparkles size={100} />
      </div>

      <div className="text-center mb-10">
        <h3 className="text-3xl font-serif font-bold text-royal-900 mb-3 flex items-center justify-center gap-3">
          <Share2 className="text-gold-500" size={32} />
          Share Your Testimony
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto italic text-lg">
          "They overcame him by the blood of the Lamb, and by the word of their testimony."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side: Text Testimony */}
        <div className="flex flex-col h-full space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-royal-100 rounded-lg text-royal-700">
               <PenTool size={20} />
            </div>
            <h4 className="text-xl font-bold text-royal-900 font-serif">How Rhapsody Changed My Life</h4>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Write your personal story here. Let the world know about the impact of the Word in your life.
          </p>
          
          <div className="flex-grow relative">
            <textarea
              value={testimony}
              onChange={(e) => setTestimony(e.target.value)}
              placeholder="I started reading Rhapsody of Realities and..."
              className="w-full h-full min-h-[250px] p-5 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-100 outline-none resize-none bg-gray-50 text-gray-800 text-base leading-relaxed shadow-inner transition-all"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 pointer-events-none bg-white/80 px-2 rounded">
              {testimony.length} characters
            </div>
          </div>
        </div>

        {/* Right Side: Image Upload */}
        <div className="flex flex-col h-full space-y-3">
          <div className="flex items-center gap-2 mb-1">
             <div className="p-2 bg-gold-100 rounded-lg text-gold-700">
               <Camera size={20} />
             </div>
             <h4 className="text-xl font-bold text-royal-900 font-serif">Add a Photo</h4>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
             A picture speaks a thousand words. Add a photo of yourself or a memorable moment.
          </p>

          <label className="block w-full cursor-pointer group flex-grow">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
            <div className={`
              relative h-full min-h-[250px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300
              ${selectedImage ? 'border-royal-500 bg-white shadow-md' : 'border-gray-300 hover:border-gold-500 bg-gray-50 hover:bg-gold-50/30'}
            `}>
              {selectedImage ? (
                <>
                  <img 
                    src={selectedImage} 
                    alt="Upload preview" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold flex items-center gap-2 border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                      <Camera size={20} /> Change Photo
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 transition-transform group-hover:scale-105">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-6 group-hover:shadow-lg border border-gray-100">
                    <Upload size={36} className="text-gold-500" />
                  </div>
                  <span className="text-royal-900 font-bold text-lg block mb-2">
                    Click to Upload
                  </span>
                  <span className="text-sm text-gray-400">
                    JPG, PNG supported
                  </span>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-100 pt-8">
        <button
          onClick={handleShare}
          disabled={!testimony.trim()}
          className={`w-full py-5 rounded-xl flex items-center justify-center gap-3 font-bold text-xl shadow-xl transform transition-all duration-300
            ${!testimony.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
              : 'bg-gradient-to-r from-royal-800 via-royal-700 to-royal-900 text-white hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] ring-offset-2 focus:ring-2 ring-royal-500'}
          `}
        >
          <Send size={24} className={testimony.trim() ? "animate-pulse" : ""} />
          Submit My Testimony
        </button>
        <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1.5 bg-gray-50 py-2 rounded-full max-w-md mx-auto">
          <Mail size={12} />
          Opens your email client. Remember to attach your photo if you added one.
        </p>
      </div>
    </div>
  );
};

export default GalleryAndShare;