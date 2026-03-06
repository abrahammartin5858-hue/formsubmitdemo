document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTestimonyForm();
  initPrayerFeatures();
  initDailyDevotional();
  initVideoChallenge();
  initSocialSharing();
  intiSearchform();
});

/**
 * Initializes the real-time clock in the header.
 * Optimized to update only at minute boundaries for better performance.
 */
function initClock() {
  const timeDisplay = document.querySelector('.time-display');
  if (!timeDisplay) {
    console.warn('Time display element not found');
    return;
  }

  let updateTimer = null;

  const updateTime = () => {
    try {
      const now = new Date();
      timeDisplay.textContent = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      // Calculate precise delay until next minute starts
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      const delay = (60 - seconds) * 1000 - milliseconds;
      
      // Clear any existing timer and set new one
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(updateTime, Math.max(1000, delay)); // Minimum 1 second delay
    } catch (error) {
      console.error('Error updating clock:', error);
      // Fallback: try again in 1 second
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(updateTime, 1000);
    }
  };

  // Initial call to display time immediately
  updateTime();
}

/**
 * Handles the testimony textarea character count and submit button state.
 * Modified to send testimony via email instead of showing UI.
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
        const testimony = textarea.value.trim();
        if (testimony) {
          sendTestimonyEmail(testimony);
        }
      }
    });
  }
}

/**
 * Sends testimony via email using the mailto protocol.
 * @param {string} testimony - The testimony text to send
 */
function sendTestimonyEmail(testimony) {
  try {
    // Get current devotional information
    const title = document.getElementById('clean_title')?.textContent || 'Unknown Devotional';
    const date = document.getElementById('devo_date')?.textContent || 'Unknown Date';
    
    // Create email content
    const subject = encodeURIComponent(`Testimony - ${title} (${date})`);
    const body = encodeURIComponent(`Testimony Submission\n\nDate: ${date}\nDevotional: ${title}\n\nTestimony:\n${testimony}\n\n---\nSent via THE LAST MAN Website`);
    
    // Create mailto link
    const mailtoLink = `mailto:abrahammartin5858@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after sending
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = '';
      textarea.dispatchEvent(new Event('input')); // Reset state
    }
    
    alert('Testimony will be sent via email. Please complete the email in your email client.');
  } catch (error) {
    console.error('Error sending testimony email:', error);
    alert('Failed to send testimony. Please try again or contact support.');
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
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body}\n\nBible Reading: ${bibleReading}\n\n${window.location.href}`;
    
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
    const bibleReading = document.getElementById('ba')?.textContent || '';
    
    // Create share message with devotional content
    const shareMessage = `Rhapsody of Realities - ${title}\n\n${body}\n\nBible Reading: ${bibleReading}\n\n${window.location.href}`;
    
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
      try {
        if ('speechSynthesis' in window) {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            listenBtn.innerHTML = 'Listen to Prayer';
            return;
          }

          const utterance = new SpeechSynthesisUtterance(prayerText.textContent);
          utterance.rate = 0.9; // Slightly slower for better comprehension
          utterance.pitch = 1;
          
          utterance.onstart = () => {
            listenBtn.innerHTML = 'Stop Listening';
            listenBtn.classList.add('bg-red-600', 'text-white');
            listenBtn.classList.remove('bg-gold-500', 'text-royal-950');
          };
          
          utterance.onend = () => {
            listenBtn.innerHTML = 'Listen to Prayer';
            listenBtn.classList.remove('bg-red-600', 'text-white');
            listenBtn.classList.add('bg-gold-500', 'text-royal-950');
          };

          utterance.onerror = (error) => {
            console.error('Speech synthesis error:', error);
            alert('Sorry, there was an error with the text-to-speech feature.');
            listenBtn.innerHTML = 'Listen to Prayer';
          };
          
          window.speechSynthesis.speak(utterance);
        } else {
          alert('Text-to-speech is not supported in your browser.');
        }
      } catch (error) {
        console.error('Error in prayer audio feature:', error);
        alert('An error occurred while trying to play the prayer audio.');
      }
    });
  }

  // "I Prayed" Confirmation Logic
  if (prayedBtn) {
    prayedBtn.addEventListener('click', () => {
      try {
        const originalText = prayedBtn.innerHTML;
        const originalClasses = prayedBtn.className;
        
        prayedBtn.textContent = 'Amen! Prayer Recorded.';
        prayedBtn.classList.replace('bg-gold-500', 'bg-green-600');
        
        setTimeout(() => {
          prayedBtn.innerHTML = originalText;
          prayedBtn.className = originalClasses;
        }, 3000);
      } catch (error) {
        console.error('Error in prayer confirmation:', error);
      }
    });
  }
}


function initVideoChallenge() {
    // Select elements with correct IDs
    const videoPlayer = document.getElementById('challenge-video');
    const recordBtn = document.getElementById('record-btn');
    const shareBtn = document.getElementById('share-btn');
    const downloadBtn = document.getElementById('download-btn');
    const statusText = document.getElementById('status-text');
    const recordIcon = document.getElementById('record-icon');
    const recordText = document.getElementById('record-text');

    if (!videoPlayer || !recordBtn || !shareBtn || !downloadBtn || !statusText) {
        console.warn('Video challenge elements not found, skipping initialization');
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

    // Cleanup function to prevent memory leaks
    const cleanup = () => {
        try {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            if (videoBlobUrl) {
                URL.revokeObjectURL(videoBlobUrl);
                videoBlobUrl = null;
            }
            videoBlob = null;
            recordedChunks = [];
            videoPlayer.src = '';
            videoPlayer.srcObject = null;
            videoPlayer.controls = false;
            videoPlayer.muted = true;
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    };

    const updateUI = (state) => {
        recordingState = state;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        if (state === 'idle') {
            cleanup();
            recordIcon.textContent = '🔴';
            recordText.textContent = 'Start Recording';
            recordBtn.className = 'video-button record-btn';
            shareBtn.classList.add('hidden');
            downloadBtn.classList.add('hidden');
            statusText.textContent = 'Ready to record';
            statusText.className = 'video-status';
        } else if (state === 'recording') {
            const startTime = Date.now();
            const updateTimer = () => {
                const elapsed = Date.now() - startTime;
                const mins = Math.floor(elapsed / 60000).toString().padStart(2, '0');
                const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
                recordText.textContent = `${mins}:${secs}`;
            };
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            recordIcon.textContent = '⏹️';
            recordBtn.className = 'video-button record-btn recording-pulse';
            shareBtn.classList.add('hidden');
            downloadBtn.classList.add('hidden');
            statusText.textContent = 'Recording... Click stop when done';
            statusText.className = 'video-status recording-pulse';
        } else if (state === 'recorded') {
            recordIcon.textContent = '🔄';
            recordText.textContent = 'Retake';
            recordBtn.className = 'video-button record-btn';
            shareBtn.classList.remove('hidden');
            downloadBtn.classList.remove('hidden');
            statusText.textContent = 'Video recorded successfully!';
            statusText.className = 'video-status';
        }
    };

    const startRecording = async () => {
        try {
            // Check if browser supports media recording
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Media recording is not supported in this browser.');
            }

            // Request camera and microphone access with portrait aspect ratio
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 300, height: 533 }, // Portrait aspect ratio
                audio: true 
            });
            
            videoPlayer.srcObject = stream;
            videoPlayer.play();
            updateUI('recording');

            // Initialize MediaRecorder with optimal settings
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(stream, { 
                mimeType: 'video/webm;codecs=vp9,opus' 
            });
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                try {
                    videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
                    videoBlobUrl = URL.createObjectURL(videoBlob);
                    videoPlayer.srcObject = null;
                    videoPlayer.src = videoBlobUrl;
                    videoPlayer.muted = false;
                    videoPlayer.controls = true;
                    updateUI('recorded');
                } catch (error) {
                    console.error('Error processing recorded video:', error);
                    alert('There was an error processing your video. Please try recording again.');
                    updateUI('idle');
                }
            };

            mediaRecorder.onerror = (error) => {
                console.error('MediaRecorder error:', error);
                alert('There was an error recording your video. Please try again.');
                updateUI('idle');
            };

            mediaRecorder.start(1000); // Collect data every second
        } catch (err) {
            console.error("Error accessing media devices.", err);
            if (err.name === 'NotAllowedError') {
                alert("Camera and microphone access was denied. Please allow access and try again.");
            } else if (err.name === 'NotFoundError') {
                alert("No camera or microphone found on this device.");
            } else {
                alert("Could not access camera or microphone. Please check permissions and try again.");
            }
            updateUI('idle');
        }
    };

    const stopRecording = () => {
        try {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    const resetRecording = () => {
        cleanup();
        updateUI('idle');
    };

    // Event Listeners
    recordBtn.addEventListener('click', () => {
        try {
            if (recordingState === 'idle') {
                startRecording();
            } else if (recordingState === 'recording') {
                stopRecording();
            } else if (recordingState === 'recorded') {
                resetRecording();
            }
        } catch (error) {
            console.error('Error in record button handler:', error);
            alert('An error occurred. Please try again.');
        }
    });

    downloadBtn.addEventListener('click', () => {
        try {
            if (!videoBlobUrl) {
                alert('No video to download. Please record a video first.');
                return;
            }
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = videoBlobUrl;
            a.download = 'rhapsody-video-challenge.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading video:', error);
            alert('There was an error downloading your video.');
        }
    });

    shareBtn.addEventListener('click', async () => {
        try {
            if (!videoBlob) {
                alert('No video to share. Please record a video first.');
                return;
            }

            if (videoBlob && navigator.share && navigator.canShare) {
                const file = new File([videoBlob], 'rhapsody-video-challenge.webm', { type: 'video/webm' });
                
                if (navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'My Rhapsody Video Challenge',
                            text: 'Check out my video reading today\'s Rhapsody of Realities!',
                        });
                    } catch (err) {
                        if (err.name !== 'AbortError') {
                            console.error('Error sharing:', err);
                            alert('An error occurred while trying to share.');
                        }
                    }
                } else {
                    alert('Sharing this file type is not supported on your device.');
                }
            } else {
                alert('Web Share API is not available on your browser, or there is no video to share.');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
                alert('An error occurred while trying to share.');
            }
        }
    });

    // Handle page unload to cleanup resources
    window.addEventListener('beforeunload', cleanup);

    // Handle visibility change to stop recording if page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && recordingState === 'recording') {
            stopRecording();
        }
    });

    // Initialize UI
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
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://read.rhapsodyofrealities.org/';

    
    // Add timeout for fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.contents) throw new Error('No content received from proxy');

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    // Attempt to scrape content using generic selectors common to the site structure
    // Note: Selectors may need adjustment if the external site structure changes
    const title = doc.querySelector('h1')?.textContent.trim() || 
                  doc.querySelector('.entry-title')?.textContent.trim() ||
                  doc.querySelector('h2')?.textContent.trim();
    
    const date = doc.querySelector('.date')?.textContent.trim() || 
                  doc.querySelector('time')?.textContent.trim() ||
                  doc.querySelector('.published')?.textContent.trim();
    
    // Find the main content container
    const contentContainer = doc.querySelector('.entry-content') || 
                            doc.querySelector('article') || 
                            doc.querySelector('.content') ||
                            doc.body;
    
    // Extract paragraphs
    let paragraphs = Array.from(contentContainer.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .filter(text => text.length > 0);

    // Heuristic: First paragraph is often scripture, Last section is often confession
    let scripture = paragraphs.length > 0 ? paragraphs[0] : "";
    let confession = "";
    
    // Look for confession keyword
    const confessionIndex = paragraphs.findIndex(p => 
      p.toUpperCase().includes('CONFESSION') || 
      p.toUpperCase().includes('PRAYER') ||
      p.toUpperCase().includes('DECLARATION')
    );

    if (confessionIndex !== -1) {
      confession = paragraphs.slice(confessionIndex).join(' ');
      // The body is everything between scripture (index 0) and confession
      paragraphs = paragraphs.slice(1, confessionIndex);
    } else {
      paragraphs = paragraphs.slice(1); // Just remove scripture
    }

    if (title && title.length > 10) { // Basic validation for title length
      return { title, date, scripture, body: paragraphs, confession };
    }
    
    throw new Error('Could not parse site content - title too short or missing');

  } catch (err) {
    console.warn('Fetching failed or blocked, falling back to offline content:', err);
    return {
        title: "RIGHTEOUSNESS CONSCIOUSNESS",
        scripture: "\"For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him \"  (2 Corinthians 5:21).",
        body: [
          "The Apostle Paul, by the Spirit, unveils one of the most extraordinary revelations in Scripture: God made Jesus, who knew no sin, to be sin for us so that we might be made the righteousness of God in Him. ",
          " Remarkable! Jesus wasn’t made a sin offering or a sin sacrifice in a figurative sense; rather, He was made sin itself. On the cross, He became the very embodiment of sin.",
          "This is much more than He being declared sinless by God; it conveys something deeper: Jesus had a consciousness of His own sinlessness. He was sinlessness-conscious............  "
          
        ],
        
    };
  }
}
