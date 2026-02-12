import React, { useEffect, useState, useRef } from 'react';
import { X, Volume2, CheckCircle, Mail } from 'lucide-react';

interface PrayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminNotify: () => void;
}

const PrayerOverlay: React.FC<PrayerOverlayProps> = ({ isOpen, onClose, onAdminNotify }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPrayed, setHasPrayed] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const introText = "I trust you have been blessed by this devotional. I would ask you to give your life to the Lord Jesus Christ by Praying this prayer after me and believe from all your heart in the words:";
  
  const prayerText = `O Lord God, I believe with all my heart in Jesus Christ, Son of the living God. I believe He died for me and God raised Him from the dead. I believe He's alive today. I confess with my mouth that Jesus Christ is the Lord of my life from this day. Through Him and in His Name, I have eternal life; I'm born again. Thank you Lord for saving my soul! I'm now a child of God. Hallelujah!`;

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      return;
    }

    // Configure the voice
    const fullText = `${introText} ... ${prayerText}`;
    utteranceRef.current = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current.rate = 0.9; // Slightly slower for solemnity
    utteranceRef.current.pitch = 1.0;
    
    // Try to find a male English voice
    const voices = synthRef.current.getVoices();
    const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('guy'));
    if (maleVoice) utteranceRef.current.voice = maleVoice;

    utteranceRef.current.onend = () => setIsPlaying(false);
    
    synthRef.current.speak(utteranceRef.current);
    setIsPlaying(true);
  };

  const handleConfirmPrayer = () => {
    setHasPrayed(true);
    onAdminNotify();
    
    // Simulate notification sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
    audio.play().catch(() => {});

    // Open email client
    const email = "abrahammartin5858@gmail.com";
    const subject = encodeURIComponent("I have prayed the Prayer of Salvation - THE LAST MAN");
    const body = encodeURIComponent("Glory to God!\n\nI have just prayed the Prayer of Salvation.\n\nI discovered the Rhapsody of Realities through THE LAST MAN platform and my life is being transformed.\n\nThank you.");
    
    // Use a slight timeout to allow UI update before navigating away/opening mail client
    setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border-4 border-gold-500">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-royal-100 text-royal-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Volume2 size={32} />
          </div>

          <h2 className="text-3xl font-serif font-bold text-royal-900 mb-4">Prayer of Salvation</h2>
          
          <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
            "{introText}"
          </p>

          <div className="bg-royal-50 p-6 rounded-xl border border-royal-200 mb-8 shadow-inner">
            <p className="text-xl md:text-2xl font-serif font-medium text-royal-900 leading-relaxed">
              "{prayerText}"
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleSpeak}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all transform hover:scale-105 ${
                isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-royal-600 hover:bg-royal-700'
              }`}
            >
              <Volume2 size={20} />
              {isPlaying ? 'Stop Voice' : 'Listen to Prayer'}
            </button>

            {!hasPrayed ? (
              <button
                onClick={handleConfirmPrayer}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gold-500 hover:bg-gold-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <CheckCircle size={20} />
                I Prayed This Prayer
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600 font-bold text-lg bg-green-50 px-6 py-3 rounded-full border border-green-200">
                <CheckCircle size={24} />
                <span>Amen! Welcome to the Family.</span>
              </div>
            )}
          </div>

          {hasPrayed && (
             <div className="mt-6 text-sm text-gray-500 animate-in slide-in-from-bottom duration-500">
               <p className="flex items-center justify-center gap-2">
                 <Mail size={16} />
                 Opening email to notify Admin...
               </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerOverlay;