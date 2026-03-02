document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTestimonyForm();
  initPrayerFeatures();
  initDailyDevotional();
  initVideoChallenge();
  initSocialSharing();
});

/**
 * Initializes the real-time clock in the header.
 */
function initClock() {
  const timeDisplay = document.querySelector('.time-display');
  if (!timeDisplay) {
    return; // Exit if the clock element isn't found
  }

  const updateTime = () => {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // More efficient: calculate delay until the next minute starts
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const delay = (60 - seconds) * 1000 - milliseconds;
    setTimeout(updateTime, delay > 0 ? delay : 60000); // Schedule next update
  };
  updateTime(); // Initial call to display time immediately
}

/**
 * Handles the testimony textarea character count and submit button state.
 */
function initTestimonyForm() {
  const textarea = document.querySelector('textarea');
  const charCount = document.getElementById('char-count'); // More robust selector
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
 * Initializes social sharing functionality for all platforms.
 * This function adds sharing functions to the global scope
 * so they can be called from HTML onclick attributes.
 */
function initSocialSharing() {
  // Add shareToFacebook function to global scope
  window.shareToFacebook = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body}\n\nFurther Study: ${furtherStudy}\n\nBible Reading: ${bibleReading}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    
    // Create Facebook share URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedMessage}`;
    
    // Open Facebook share dialog in a new window
    window.open(facebookShareUrl, 'facebook-share-dialog', 'width=626,height=436');
  };

  // Add shareToWhatsApp function to global scope
  window.shareToWhatsApp = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body}\n\nFurther Study: ${furtherStudy}\n\nBible Reading: ${bibleReading}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    
    // Create WhatsApp share URL
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    
    // Open WhatsApp share dialog in a new window
    window.open(whatsappShareUrl, '_blank');
  };

  // Add shareToTwitter function to global scope
  window.shareToTwitter = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content (shorter for Twitter)
    const shareMessage = `Rhapsody of Realities - ${title}\n${body.substring(0, 150)}...\nFurther Study: ${furtherStudy}\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedHashtags = encodeURIComponent('#RhapsodyOfRealities #DailyDevotional #Faith');
    
    // Create Twitter share URL
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&hashtags=${encodedHashtags}`;
    
    // Open Twitter share dialog in a new window
    window.open(twitterShareUrl, 'twitter-share-dialog', 'width=550,height=420');
  };

  // Add shareToYouTube function to global scope (for video challenge)
  window.shareToYouTube = function(event) {
    event.preventDefault();
    // YouTube sharing would require uploading the video first
    // For now, just open YouTube
    window.open('https://www.youtube.com/upload', '_blank');
  };

  // Add shareToInstagram function to global scope
  window.shareToInstagram = function(event) {
    event.preventDefault();
    // Instagram sharing from web is limited, open Instagram app/website
    window.open('https://www.instagram.com/accounts/login/', '_blank');
  };

  // Add shareToEmail function to global scope
  window.shareToEmail = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create email content
    const subject = encodeURIComponent(`Rhapsody of Realities - ${title}`);
    const bodyContent = encodeURIComponent(`Check out today's Rhapsody of Realities devotional:\n\n${title}\n\n${body}\n\nFurther Study: ${furtherStudy}\nBible Reading: ${bibleReading}\n\nRead more: ${window.location.href}`);
    
    // Create mailto link
    const mailtoLink = `mailto:?subject=${subject}&body=${bodyContent}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  // Add shareToLinkedIn function to global scope
  window.shareToLinkedIn = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body.substring(0, 200)}...\n\nFurther Study: ${furtherStudy}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedTitle = encodeURIComponent(`Rhapsody of Realities - ${title}`);
    const encodedSource = encodeURIComponent('THE LAST MAN');
    
    // Create LinkedIn share URL
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodedTitle}&summary=${encodedMessage}&source=${encodedSource}`;
    
    // Open LinkedIn share dialog in a new window
    window.open(linkedinShareUrl, 'linkedin-share-dialog', 'width=600,height=400');
  };

  // Add shareToTelegram function to global scope
  window.shareToTelegram = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body}\n\nFurther Study: ${furtherStudy}\n\nBible Reading: ${bibleReading}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    
    // Create Telegram share URL
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedMessage}`;
    
    // Open Telegram share dialog in a new window
    window.open(telegramShareUrl, '_blank');
  };

  // Add shareToPinterest function to global scope
  window.shareToPinterest = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body.substring(0, 200)}...\n\nFurther Study: ${furtherStudy}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedMedia = encodeURIComponent('https://rhapsodyofrealities.b-cdn.net/give.rhapsodyofrealities.org/new_lingual_banner.png');
    
    // Create Pinterest share URL
    const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodedMedia}&description=${encodedMessage}`;
    
    // Open Pinterest share dialog in a new window
    window.open(pinterestShareUrl, 'pinterest-share-dialog', 'width=750,height=320');
  };

  // Add shareToReddit function to global scope
  window.shareToReddit = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body.substring(0, 300)}...\n\nFurther Study: ${furtherStudy}\n\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedTitle = encodeURIComponent(`Rhapsody of Realities - ${title}`);
    
    // Create Reddit share URL
    const redditShareUrl = `https://www.reddit.com/submit?title=${encodedTitle}&url=${encodeURIComponent(window.location.href)}&selftext=${encodedMessage}`;
    
    // Open Reddit share dialog in a new window
    window.open(redditShareUrl, 'reddit-share-dialog', 'width=900,height=600');
  };

  // Add shareToCopyLink function to global scope
  window.shareToCopyLink = function(event) {
    event.preventDefault();
    
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link. Please manually copy the URL.');
    });
  };

  // Add shareToPrint function to global scope
  window.shareToPrint = function(event) {
    event.preventDefault();
    window.print();
  };

  // Add shareToSMS function to global scope
  window.shareToSMS = function(event) {
    event.preventDefault();
    
    // Get current devotional content from the page
    const title = document.getElementById('clean_title')?.textContent || '';
    const body = document.getElementById('body')?.textContent || '';
    const date = document.getElementById('devo_date')?.textContent || '';
    const furtherStudy = document.getElementById('further_study')?.textContent || '';
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content (shorter for SMS)
    const shareMessage = `Rhapsody of Realities - ${title}\n${body.substring(0, 100)}...\n${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(shareMessage);
    
    // Create SMS share URL
    const smsShareUrl = `sms:&body=${encodedMessage}`;
    
    // Open SMS app
    window.location.href = smsShareUrl;
  };
}


/**
 * Initializes audio and interaction for the prayer section.
 */
function initPrayerFeatures() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const listenBtn = buttons.find(b => b.textContent.includes('Listen to Prayer'));
  const prayedBtn = buttons.find(b => b.textContent.includes('I Prayed This Prayer'));
  
  // The prayer text is the last paragraph inside the royal-50 container
  const prayerCard = document.getElementById('salvation-prayer-card'); // More robust selector
  const prayerText = prayerCard ? prayerCard.querySelector('p:last-of-type') : null;

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


function initVideoChallenge() {
    const videoChallengeContainer = document.getElementById('video-challenge'); // More robust selector
    if (!videoChallengeContainer) {
        return; // Section not found, do nothing.
    }

    // Select elements
    const videoPlayer = document.getElementById('challenge-video');
    const recordBtn = document.getElementById('record-btn');
    const shareBtn = document.getElementById('share-btn');
    const downloadBtn = document.getElementById('download-btn');
    const postRecordContainer = document.getElementById('post-record-actions');

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
    let timerInterval;

    // SVG Icons for buttons
    const startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg> Start Recording`;
    const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg> Stop Recording`;
    const retakeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Retake`;

    const updateUI = (state) => {
        recordingState = state;
        if (timerInterval) clearInterval(timerInterval);

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
            const startTime = Date.now();
            const updateTimer = () => {
                const elapsed = Date.now() - startTime;
                const mins = Math.floor(elapsed / 60000).toString().padStart(2, '0');
                const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
                recordBtn.innerHTML = stopIcon.replace('Stop Recording', `${mins}:${secs}`);
            };
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
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
  
/**
 * Updates the devotional content based on the current day.
 * It attempts to fetch live data via a CORS proxy and falls back to
 * simulated data on failure. This function is updated to use the specific
 * IDs found in the HTML for better stability.
 */
function initDailyDevotional() {
  const dateDisplay = document.getElementById('devo_date');
  const titleDisplay = document.getElementById('clean_title');
  const bodyDisplay = document.getElementById('body');
  const confessionDisplay = document.getElementById('confessions');

  // 1. Update Date to Today
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  if (dateDisplay) {
    dateDisplay.textContent = today.toLocaleDateString('en-US', options);
  }

  // 2. Fetch and Update Content
  fetchDailyContent().then(data => {
    if (!data) return;

    if (titleDisplay && data.title) {
      titleDisplay.textContent = data.title;
    }
    
    // The fetched data is cleaner than the hardcoded HTML.
    // We will replace the hardcoded content with the fetched content.
    if (bodyDisplay && data.scripture && data.body) {
        const scriptureHtml = `<p><strong>${data.scripture}</strong></p>`;
        const bodyHtml = data.body.map(text => `<p>${text}</p>`).join('');
        
        // Replace the entire inner content of the #body element
        bodyDisplay.innerHTML = scriptureHtml + bodyHtml;
    }

    if (confessionDisplay && data.confession) {
      confessionDisplay.textContent = data.confession;
    }

    // Note: The fetch function doesn't return further study or bible plans,
    // so those sections will remain as they are in the static HTML.

  }).catch(err => console.error('Error updating devotional:', err));
}

/**
 * Fetches daily content.
 * In a real application, this would call a backend API. Here, it uses a
 * public CORS proxy which may be unreliable. It includes a fallback to
 * offline content.
 */
async function fetchDailyContent() {
  try {
    // Use a CORS proxy to fetch the content from the Rhapsody website
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://read.rhapsodyofrealities.org/');
    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (!data.contents) throw new Error('No content received from proxy');

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    // Attempt to scrape content using generic selectors common to the site structure
    // Note: Selectors may need adjustment if the external site structure changes
    const title = doc.querySelector('h1')?.textContent.trim() || doc.querySelector('.entry-title')?.textContent.trim();
    const date = doc.querySelector('.date')?.textContent.trim() || doc.querySelector('time')?.textContent.trim();
    
    // Find the main content container
    const contentContainer = doc.querySelector('.entry-content') || doc.querySelector('article') || doc.body;
    
    // Extract paragraphs
    let paragraphs = Array.from(contentContainer.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .filter(text => text.length > 0);

    // Heuristic: First paragraph is often scripture, Last section is often confession
    let scripture = paragraphs.length > 0 ? paragraphs[0] : "";
    let confession = "";
    
    // Look for confession keyword
    const confessionIndex = paragraphs.findIndex(p => 
      p.toUpperCase().includes('CONFESSION') || p.toUpperCase().includes('PRAYER')
    );

    if (confessionIndex !== -1) {
      confession = paragraphs.slice(confessionIndex).join(' ');
      // The body is everything between scripture (index 0) and confession
      paragraphs = paragraphs.slice(1, confessionIndex);
    } else {
      paragraphs = paragraphs.slice(1); // Just remove scripture
    }

    if (title) {
      return { title, date, scripture, body: paragraphs, confession };
    }
    
    throw new Error('Could not parse site content');

  } catch (err) {
    console.warn('Fetching failed or blocked, falling back to offline content:', err);
    return {
        title: "Living In His Authority",
        scripture: "\"And these signs shall follow them that believe; In my name shall they cast out devils...\" (Mark 16:17)",
        body: [
          "The authority given to us in the Name of Jesus is absolute. It covers everything in heaven, on earth, and under the earth.",
          "You don't need to struggle to make things happen. When you speak in His Name, power is released.",
          "Today, exercise that authority over your circumstances. Don't beg; command results in the Name of Jesus. The world is waiting for your manifestation."
        ],
        confession: "I walk in the authority of Christ. Circumstances align with my words because I speak in the Name of Jesus. I am victorious in all things. Hallelujah!"
    };
  }
}
