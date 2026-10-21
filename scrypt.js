// Wait for DOM to load in Sololearn Code Playground
window.onload = () => {
    const card = document.getElementById('card');
    const celestial = document.getElementById('celestial');
    const windowEl = document.getElementById('window');
    const doorEl = document.getElementById('door');
    const chimneyEl = document.getElementById('chimney');
    const smokeEl = document.getElementById('smoke');
    const birdEl = document.getElementById('bird');
    const birdFx = document.getElementById('birdFx');
    const starsContainer = document.getElementById('stars');
  
    // --- WEB AUDIO API SOUND SYNTHESIZER ---
    let audioCtx = null;
  
    const initAudio = () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    };
  
    // 1. Bird chirp (bright chirp by day, soft sleepy sigh at night)
    const playChirp = (isNight) => {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
  
      if (isNight) {
        // Soft sleepy whistle
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        // Happy double chirp
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(2800, now + 0.08);
        osc.frequency.setValueAtTime(2000, now + 0.11);
        osc.frequency.exponentialRampToValueAtTime(3400, now + 0.22);
  
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.02, now + 0.09);
        gain.gain.setValueAtTime(0.15, now + 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
  
        osc.start(now);
        osc.stop(now + 0.24);
      }
    };
  
    // 2. Light switch click
    const playSwitch = () => {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(audioCtx.destination);
  
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);
  
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  
      osc.start(now);
      osc.stop(now + 0.04);
    };
  
    // 3. Door creak
    const playDoor = (isOpen) => {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.connect(gain);
      gain.connect(audioCtx.destination);
  
      const startFreq = isOpen ? 130 : 210;
      const endFreq = isOpen ? 230 : 110;
  
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.linearRampToValueAtTime(endFreq, now + 0.28);
  
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
  
      osc.start(now);
      osc.stop(now + 0.28);
    };
  
    // 4. Chimney smoke puff
    const playPuff = () => {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(audioCtx.destination);
  
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
  
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  
      osc.start(now);
      osc.stop(now + 0.18);
    };
  
    // 5. Day / Night magical chime
    const playChime = (isNight) => {
      initAudio();
      const now = audioCtx.currentTime;
      const notes = isNight ? [659.25, 523.25, 392.00] : [392.00, 523.25, 659.25];
  
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
  
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
  
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    };
  
    // --- SCENE LOGIC & INTERACTIONS ---
  
    // 1. Generate stars for the night sky
    for (let i = 0; i < 35; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 65}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starsContainer.appendChild(star);
    }
  
    // 2. Toggle Day and Night on Sun/Moon click
    celestial.addEventListener('click', () => {
      document.body.classList.toggle('night');
      const isNight = document.body.classList.contains('night');
      playChime(isNight);
  
      if (isNight) {
        windowEl.classList.add('lit');
      } else {
        windowEl.classList.remove('lit');
      }
    });
  
    // 3. Toggle window light
    windowEl.addEventListener('click', () => {
      windowEl.classList.toggle('lit');
      playSwitch();
    });
  
    // 4. Open/close door
    doorEl.addEventListener('click', () => {
      doorEl.classList.toggle('open');
      const isOpen = doorEl.classList.contains('open');
      playDoor(isOpen);
    });
  
    // 5. Toggle chimney smoke
    chimneyEl.addEventListener('click', () => {
      smokeEl.classList.toggle('off');
      playPuff();
    });
  
    // 6. Bird interaction (jump + musical notes + sound)
    birdEl.addEventListener('click', () => {
      birdEl.classList.remove('jump');
      birdFx.classList.remove('animate');
      void birdEl.offsetWidth; // Restart CSS animation
  
      const isNight = document.body.classList.contains('night');
      const notes = ['♪', '♫', '♬', '✨'];
      birdFx.textContent = isNight ? 'Zzz' : notes[Math.floor(Math.random() * notes.length)];
  
      birdEl.classList.add('jump');
      birdFx.classList.add('animate');
      playChirp(isNight);
    });
  
    // 7. 3D card tilt effect (Mouse + Mobile Touch support)
    const handleTilt = (clientX, clientY) => {
      const xAxis = (window.innerWidth / 2 - clientX) / 25;
      const yAxis = (window.innerHeight / 2 - clientY) / 25;
      card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
    };
  
    document.addEventListener('mousemove', (e) => handleTilt(e.pageX, e.pageY));
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleTilt(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
  
    const resetTilt = () => {
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };
  
    document.addEventListener('mouseleave', resetTilt);
    document.addEventListener('touchend', resetTilt);
  };
  