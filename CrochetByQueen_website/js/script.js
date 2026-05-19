// Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
  });
  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Background music
  const music = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  music.volume = 0.35;
  let playing = false;

  function startMusic() {
    music.play().then(() => {
      musicBtn.textContent = '🔊';
      playing = true;
    }).catch(e => console.log('Music blocked:', e));
  }

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (playing) {
      music.pause();
      musicBtn.textContent = '🔇';
      playing = false;
    } else {
      startMusic();
    }
  });

  // Try autoplay immediately
  startMusic();

  // Fallback: start on first user interaction anywhere
  const startOnInteraction = () => {
    if (!playing) startMusic();
    document.removeEventListener('touchstart', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
  };
  document.addEventListener('touchstart', startOnInteraction);
  document.addEventListener('keydown', startOnInteraction);

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // Form submit — reveal payment details
  document.getElementById('submitBtn').addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const type = document.getElementById('ftype').value;
    if (!name || !phone || !type) {
      alert('Please fill in your name, phone number and piece type to continue.');
      return;
    }
    document.getElementById('paymentReveal').classList.add('show');
    document.getElementById('submitBtn').textContent = '✦ Request Sent!';
    document.getElementById('submitBtn').style.background = '#1A5C2E';
    document.getElementById('paymentReveal').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });