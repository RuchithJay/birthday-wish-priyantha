const music = document.getElementById('birthdayMusic');
const btn = document.getElementById('musicBtn');
const loadingScreen = document.getElementById('loadingScreen');
let playing = false;
let hasTriedAutoplay = false;

// Loading screen functionality
window.addEventListener('load', () => {
  // Hide loading screen after 3.5 seconds
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    
    // Remove loading screen completely after fade animation
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
    
    // Try to start music after loading screen is gone
    setTimeout(() => {
      hasTriedAutoplay = true;
      console.log('Attempting to start music after loading screen...');
      
      if (music) {
        startMusic().then((success) => {
          if (!success) {
            // If autoplay failed, make the button pulse to draw attention
            btn.style.animation = "pulse 1.5s infinite";
            btn.title = "Click to play birthday music! 🎵";
            console.log('Music autoplay blocked - button pulsing');
          } else {
            console.log('Music started successfully!');
          }
        });
      } else {
        console.log('Music element not found!');
      }
    }, 600);
  }, 3500);
});

// Function to start music
function startMusic() {
  if (!music) {
    console.log('Music element not found in startMusic function');
    return Promise.resolve(false);
  }
  
  // Set volume to a reasonable level
  music.volume = 0.7;
  
  return music.play().then(() => {
    console.log('Music play() succeeded');
    btn.textContent = "🔊";
    playing = true;
    btn.style.background = "#28a745"; // Green when playing
    return true;
  }).catch((error) => {
    console.log('Music play() failed:', error);
    btn.textContent = "🔇";
    playing = false;
    btn.style.background = "#dc3545"; // Red when blocked
    return false;
  });
}

// Try to autoplay the music when page loads - removed since it's now handled in loading screen

// Also try when user first interacts with the page
document.addEventListener('click', function startOnFirstClick() {
  if (!playing && hasTriedAutoplay) {
    startMusic().then((success) => {
      if (success) {
        btn.style.animation = "none"; // Stop pulsing
        btn.title = "Music controls";
      }
    });
  }
  // Remove this listener after first click
  document.removeEventListener('click', startOnFirstClick);
}, { once: true });

// Also try on any user interaction
document.addEventListener('touchstart', function startOnFirstTouch() {
  if (!playing && hasTriedAutoplay) {
    startMusic().then((success) => {
      if (success) {
        btn.style.animation = "none"; // Stop pulsing
        btn.title = "Music controls";
      }
    });
  }
  document.removeEventListener('touchstart', startOnFirstTouch);
}, { once: true });

const card = document.getElementById("popupCard");
const closeBtn = document.getElementById("closeCard");
const cakeGif = document.querySelector(".cake");

// Show popup when cake is clicked
cakeGif.addEventListener("click", () => {
  card.style.display = "flex";
});

// Hide popup when close button is clicked
closeBtn.addEventListener("click", () => {
  card.style.display = "none";
});

// Hide popup when clicking outside the card content
card.addEventListener("click", (e) => {
  if (e.target === card) {
    card.style.display = "none";
  }
});


btn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent triggering the first click listener
  if (playing) {
    music.pause();
    btn.textContent = "🔇";
    btn.style.background = "#ff7eb9";
  } else {
    music.play().then(() => {
      btn.textContent = "🔊";
      btn.style.background = "#28a745";
      btn.style.animation = "none"; // Stop pulsing when manually started
    });
  }
  playing = !playing;
});
