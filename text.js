document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTestimonyForm();
  initPrayerFeatures();
});

/**
 * Initializes the real-time clock in the header.
 */
function initClock() {
  const timeDisplay = document.querySelector('.font-mono.text-sm');
  if (timeDisplay) {
    const updateTime = () => {
      const now = new Date();
      // Format: 12:00 or 24:00 depending on locale, matching the 0:00 placeholder style
      timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
}

/**
 * Handles the testimony textarea character count and submit button state.
 */
function initTestimonyForm() {
  const textarea = document.querySelector('textarea');
  const charCount = document.querySelector('.absolute.bottom-4.right-4');
  // Find the submit button specifically within the testimony section
  const submitBtn = Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.includes('Submit My Testimony'));

  if (textarea && charCount && submitBtn) {
    textarea.addEventListener('input', function() {
      const length = this.value.length;
      charCount.textContent = `${length} characters`;

      if (length > 0) {
        // Enable button styling
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('bg-gray-100', 'text-gray-400', 'cursor-not-allowed');
        submitBtn.classList.add('bg-gold-500', 'text-white', 'hover:bg-gold-600', 'cursor-pointer');
      } else {
        // Disable button styling
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.classList.add('bg-gray-100', 'text-gray-400', 'cursor-not-allowed');
        submitBtn.classList.remove('bg-gold-500', 'text-white', 'hover:bg-gold-600', 'cursor-pointer');
      }
    });

    submitBtn.addEventListener('click', () => {
      if (!submitBtn.disabled) {
        alert('Testimony submitted successfully!');
        textarea.value = '';
        textarea.dispatchEvent(new Event('input')); // Reset state
      }
    });
  }
}

/**
 * Initializes audio and interaction for the prayer section.
 */
function initPrayerFeatures() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const listenBtn = buttons.find(b => b.textContent.includes('Listen to Prayer'));
  const prayedBtn = buttons.find(b => b.textContent.includes('I Prayed This Prayer'));
  
  // The prayer text is the last paragraph inside the royal-50 container
  const prayerContainer = document.querySelector('.bg-royal-50.shadow-inner');
  const prayerText = prayerContainer ? prayerContainer.querySelector('p:last-of-type') : null;

  // Text-to-Speech Logic
  if (listenBtn && prayerText) {
    listenBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(prayerText.textContent);
        utterance.onstart = () => listenBtn.innerHTML = 'Stop Listening';
        utterance.onend = () => listenBtn.innerHTML = 'Listen to Prayer'; // Simplified for brevity, ideally restores SVG
        
        window.speechSynthesis.speak(utterance);
      } else {
        alert('Text-to-speech is not supported in your browser.');
      }
    });
  }

  // "I Prayed" Confirmation Logic
  if (prayedBtn) {
    prayedBtn.addEventListener('click', () => {
      const originalText = prayedBtn.innerHTML;
      prayedBtn.textContent = 'Amen! Prayer Recorded.';
      prayedBtn.classList.replace('bg-gold-500', 'bg-green-600');
      setTimeout(() => {
        prayedBtn.innerHTML = originalText;
        prayedBtn.classList.replace('bg-green-600', 'bg-gold-500');
      }, 3000);
    });
  }
}

  initClock();
  initTestimonyForm();
  initPrayerFeatures();
  initDailyDevotional();
;

/**

/**
    });
  }
}

/**
 * Updates the devotional content based on the current day.
 * Note: Direct scraping from rhapsodyofrealities.org is restricted by CORS in browsers.
 * This function demonstrates the DOM update logic with simulated data.
 */
function initDailyDevotional() {
  const dateDisplay = document.querySelector('.text-gray-500.font-serif.italic');
  const titleDisplay = document.querySelector('h2.text-3xl');
  const scriptureDisplay = document.querySelector('.bg-royal-50.border-l-4');
  const bodyDisplay = document.querySelector('.prose');
  const confessionContainer = document.querySelector('.mt-8.pt-8.border-t');
  const confessionDisplay = confessionContainer ? confessionContainer.querySelector('p') : null;

  // 1. Update Date to Today
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  if (dateDisplay) {
    dateDisplay.textContent = today.toLocaleDateString('en-US', options);
  }

  // 2. Fetch and Update Content
  // To use real data, you would need a backend proxy to fetch from:
  // https://rhapsodyofrealities.org
  fetchDailyContent().then(data => {
    if (!data) return;

    if (titleDisplay) titleDisplay.textContent = data.title;
    if (scriptureDisplay) scriptureDisplay.textContent = data.scripture;
    
    if (bodyDisplay) {
      bodyDisplay.innerHTML = ''; // Clear placeholder text
      data.body.forEach(paragraph => {
        const p = document.createElement('p');
        p.className = 'mb-4';
        p.textContent = paragraph;
        bodyDisplay.appendChild(p);
      });
    }

    if (confessionDisplay) confessionDisplay.textContent = data.confession;
  }).catch(err => console.error('Error updating devotional:', err));
}

/**
 * Simulates fetching data. In a real app, this would call your backend API.
 */
async function fetchDailyContent() {
  // Simulating a network request delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        title: "Living In His Authority",
        scripture: "\"And these signs shall follow them that believe; In my name shall they cast out devils...\" (Mark 16:17)",
        body: [
          "The authority given to us in the Name of Jesus is absolute. It covers everything in heaven, on earth, and under the earth.",
          "You don't need to struggle to make things happen. When you speak in His Name, power is released.",
          "Today, exercise that authority over your circumstances. Don't beg; command results in the Name of Jesus."
        ],
        confession: "I walk in the authority of Christ. Circumstances align with my words because I speak in the Name of Jesus. I am victorious in all things. Hallelujah!"
      });
    }, 1000);
  });
}


 

/**
 * Initializes the Rhapsody Video Challenge functionality.
 */
function initVideoChallenge() {
    const videoChallengeContainer = document.querySelector('.bg-royal-950.rounded-2xl.shadow-2xl');
    if (!videoChallengeContainer) {
        return; // Section not found, do nothing.
    }

    // Select elements
    const videoPlayer = videoChallengeContainer.querySelector('video');
    const allButtons = Array.from(videoChallengeContainer.querySelectorAll('button'));
    const recordBtn = allButtons.find(b => b.textContent.includes('Retake'));
    const shareBtn = allButtons.find(b => b.textContent.includes('Share via App'));
    const downloadBtn = videoChallengeContainer.querySelector('button[title="Download Only"]');
    const postRecordContainer = videoChallengeContainer.querySelector('.bg-royal-900\\/50');

    if (!videoPlayer || !recordBtn || !shareBtn || !downloadBtn || !postRecordContainer) {
        console.error('One or more video challenge elements are missing.');
        return;
    }

    // State variables
    let mediaRecorder;
    let recordedChunks = [];
    let stream;
    let videoBlobUrl = null;
    let videoBlob = null;
    let recordingState = 'idle'; // 'idle', 'recording', 'recorded'

    // SVG Icons for buttons
    const startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg> Start Recording`;
    const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg> Stop Recording`;
    const retakeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Retake`;

    const updateUI = (state) => {
        recordingState = state;
        if (state === 'idle') {
            recordBtn.innerHTML = startIcon;
            recordBtn.className = 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-royal-950 px-8 py-3 rounded-xl font-black text-lg flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all';
            shareBtn.style.display = 'none';
            downloadBtn.style.display = 'none';
            postRecordContainer.style.display = 'none';
            videoPlayer.src = '';
            videoPlayer.srcObject = null;
            videoPlayer.controls = false;
            videoPlayer.muted = true; // Mute preview to prevent feedback
        } else if (state === 'recording') {
            recordBtn.innerHTML = stopIcon;
            recordBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black text-lg flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all';
            shareBtn.style.display = 'none';
            downloadBtn.style.display = 'none';
            postRecordContainer.style.display = 'none';
        } else if (state === 'recorded') {
            recordBtn.innerHTML = retakeIcon;
            recordBtn.className = 'bg-royal-800 hover:bg-royal-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all';
            shareBtn.style.display = 'flex';
            downloadBtn.style.display = 'flex';
            postRecordContainer.style.display = 'block';
        }
    };

    const startRecording = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoPlayer.srcObject = stream;
            videoPlayer.play();
            updateUI('recording');

            recordedChunks = [];
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) recordedChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
                videoBlobUrl = URL.createObjectURL(videoBlob);
                videoPlayer.srcObject = null;
                videoPlayer.src = videoBlobUrl;
                videoPlayer.muted = false;
                videoPlayer.controls = true;
                updateUI('recorded');
            };

            mediaRecorder.start();
        } catch (err) {
            console.error("Error accessing media devices.", err);
            alert("Could not access camera or microphone. Please check permissions and try again.");
            updateUI('idle');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
        if (stream) stream.getTracks().forEach(track => track.stop());
    };

    recordBtn.addEventListener('click', () => {
        if (recordingState === 'idle') startRecording();
        else if (recordingState === 'recording') stopRecording();
        else if (recordingState === 'recorded') updateUI('idle');
    });

    downloadBtn.addEventListener('click', () => {
        if (!videoBlobUrl) return;
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = videoBlobUrl;
        a.download = 'rhapsody-video-challenge.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    shareBtn.addEventListener('click', async () => {
        if (videoBlob && navigator.share && navigator.canShare) {
            const file = new File([videoBlob], 'rhapsody-video-challenge.webm', { type: 'video/webm' });
            try {
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'My Rhapsody Video Challenge',
                        text: 'Check out my video reading today\'s Rhapsody of Realities!',
                    });
                } else {
                    alert('Sharing this file type is not supported on your device.');
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                    alert('An error occurred while trying to share.');
                }
            }
        } else {
            alert('Web Share API is not available on your browser, or there is no video to share.');
        }
    });

    // Initialize UI for the video challenge section
    updateUI('idle');
}
