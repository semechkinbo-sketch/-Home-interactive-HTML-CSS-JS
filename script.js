window.onload = () => {
  const card = document.getElementById('card');
  const celestial = document.getElementById('celestial');
  const windowEl = document.getElementById('window');
  const doorEl = document.getElementById('door');
  const doorFrame = document.getElementById('doorFrame');
  const chimneyEl = document.getElementById('chimney');
  const smokeEl = document.getElementById('smoke');
  const birdEl = document.getElementById('bird');
  const birdFx = document.getElementById('birdFx');
  const starsContainer = document.getElementById('stars');

  let audioCtx = null;
  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  };

  const playChirp = (isNight) => {
    initAudio();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    if (isNight) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.08);
      osc.frequency.setValueAtTime(2000, now + 0.11);
      osc.frequency.exponentialRampToValueAtTime(3400, now + 0.22);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.02, now + 0.09);
      gain.gain.setValueAtTime(0.14, now + 0.11);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.24);
    }
  };

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
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.start(now);
    osc.stop(now + 0.04);
  };

  const playDoor = (isOpen) => {
    initAudio();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(isOpen ? 130 : 210, now);
    osc.frequency.linearRampToValueAtTime(isOpen ? 230 : 110, now + 0.26);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc.start(now);
    osc.stop(now + 0.26);
  };

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

  const toggleLight = () => {
    windowEl.classList.toggle('lit');
    doorFrame.classList.toggle('dimmed', !windowEl.classList.contains('lit'));
    playSwitch();
  };

  celestial.addEventListener('click', () => {
    document.body.classList.toggle('night');
    const isNight = document.body.classList.contains('night');
    playChime(isNight);
    if (isNight) {
      windowEl.classList.remove('lit');
      doorFrame.classList.add('dimmed');
    } else {
      windowEl.classList.add('lit');
      doorFrame.classList.remove('dimmed');
    }
  });

  windowEl.addEventListener('click', toggleLight);

  doorEl.addEventListener('click', () => {
    doorEl.classList.toggle('open');
    playDoor(doorEl.classList.contains('open'));
  });

  chimneyEl.addEventListener('click', () => {
    smokeEl.classList.toggle('off');
    playPuff();
  });

  birdEl.addEventListener('click', () => {
    birdEl.classList.remove('jump');
    birdFx.classList.remove('animate');
    void birdEl.offsetWidth;
    const isNight = document.body.classList.contains('night');
    const notes = ['♪', '♫', '♬', '✨'];
    birdFx.textContent = isNight ? 'Zzz' : notes[Math.floor(Math.random() * notes.length)];
    birdEl.classList.add('jump');
    birdFx.classList.add('animate');
    playChirp(isNight);
  });

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  const handleMove = (x, y) => {
    targetX = (window.innerWidth / 2 - x) / 30;
    targetY = (window.innerHeight / 2 - y) / 30;
  };
  document.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
  document.addEventListener('touchend', () => { targetX = 0; targetY = 0; });

  const smoothTilt = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    card.style.transform = `rotateY(${-currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
    requestAnimationFrame(smoothTilt);
  };
  smoothTilt();
};
