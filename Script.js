
// ===== Invitee name from URL =====
(function setInviteeName(){
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('name');
  const inviteeEl = document.getElementById('inviteeName');

  if (inviteeEl && guestName){
    inviteeEl.textContent = 'Dear ' + guestName;
  }
})();
// ===== Invitee name from URL =====
(function setInviteeName(){
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('name');
  const inviteeEl = document.getElementById('inviteeName');

  if (inviteeEl && guestName){
    inviteeEl.textContent = 'Dear ' + guestName;
  }
})();

// ===== Curtain Intro =====
const curtainOverlay = document.getElementById('curtainOverlay');
const openInvitationBtn = document.getElementById('openInvitationBtn');

document.documentElement.classList.add('curtain-lock');

function openCurtains(){
  if (curtainOverlay.classList.contains('open')) return;

  curtainOverlay.classList.add('open');
  document.documentElement.classList.remove('curtain-lock');

  startPetals();

  const bgMusic = document.getElementById('bgMusic');
  const targetVolume = 0.6;
  const fadeDuration = 5500; // ms, adjust to taste
  const fadeSteps = 40;
  const fadeStepTime = fadeDuration / fadeSteps;
  const volumeStep = targetVolume / fadeSteps;

  bgMusic.volume = 0;
  bgMusic.play().catch(() => {});

  let currentStep = 0;
  const fadeInterval = setInterval(() => {
    currentStep++;
    bgMusic.volume = Math.min(targetVolume, volumeStep * currentStep);
    if (currentStep >= fadeSteps){
      clearInterval(fadeInterval);
    }
  }, fadeStepTime);


  const scrimEl = curtainOverlay.querySelector('.curtain-scrim');
  let cleaned = false;

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    curtainOverlay.classList.add('hidden');
  };

  scrimEl.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 2300); // fallback: matches 1.35s curtain + 0.8s scrim + buffer
}

openInvitationBtn.addEventListener('click', openCurtains);




// ===== Countdown =====
const weddingDate = new Date('2026-08-25T00:00:00');

function animateValue(el, newValue){
  if (el.textContent !== newValue){
    el.textContent = newValue;
    el.classList.remove('ticking');
    void el.offsetWidth; // restart animation
    el.classList.add('ticking');
  }
}

function updateCountdown(){
  const now = new Date();
  const diff = weddingDate - now;

  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');

  if (diff <= 0){
    animateValue(daysEl, '00');
    animateValue(hoursEl, '00');
    animateValue(minsEl, '00');
    animateValue(secsEl, '00');
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins  = Math.floor((diff / (1000 * 60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);

  animateValue(daysEl, String(days).padStart(2, '0'));
  animateValue(hoursEl, String(hours).padStart(2, '0'));
  animateValue(minsEl, String(mins).padStart(2, '0'));
  animateValue(secsEl, String(secs).padStart(2, '0'));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Save Our Date toggle =====
const saveDateBtn = document.getElementById('saveDateBtn');
const saveDatePanel = document.getElementById('saveDatePanel');
const saveDateChevron = document.getElementById('saveDateChevron');

saveDateBtn.addEventListener('click', () => {
  saveDatePanel.classList.toggle('open');
  saveDateChevron.classList.toggle('open');
});

// ===== Apple/Outlook .ics file builder =====
const eventStart = '20260825T103000';
const eventEnd   = '20260825T230000';
const eventTitle = 'Janitha & Tonisha\'s Wedding';
const eventLoc   = 'Asliya Golden Cassandra, Katupitiya Road, Dambokka, Kurunegala, Sri Lanka';

const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${eventStart}
DTEND:${eventEnd}
LOCATION:${eventLoc}
END:VEVENT
END:VCALENDAR`;

const icsBlob = new Blob([icsContent], { type: 'text/calendar' });
document.getElementById('link-ics').href = URL.createObjectURL(icsBlob);

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Music mute toggle =====
const muteBtn = document.getElementById('muteBtn');

muteBtn.addEventListener('click', () => {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.muted = !bgMusic.muted;
  muteBtn.setAttribute('aria-pressed', String(bgMusic.muted));
  muteBtn.classList.toggle('is-muted', bgMusic.muted);
  muteBtn.setAttribute('aria-label', bgMusic.muted ? 'Unmute music' : 'Mute music');
});


// ===== Falling petal particles =====
function startPetals(){
  const container = document.getElementById('petalsContainer');
  if (!container) return;

  function spawnPetal(){
    const petal = document.createElement('span');
    petal.className = 'petal';

    const size = 6 + Math.random() * 8;          // 6px - 14px
    const startLeft = Math.random() * 100;        // 0% - 100% across width
    const duration = 8 + Math.random() * 7;       // 8s - 15s fall time
    const drift = (Math.random() * 80 - 40) + 'px'; // sideways drift -40px to 40px

    petal.style.width = size + 'px';
    petal.style.height = (size * 1.2) + 'px';
    petal.style.left = startLeft + '%';
    petal.style.animationDuration = duration + 's';
    petal.style.setProperty('--drift', drift);

    container.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }

  // spawn one petal every ~600ms, continuously
  setInterval(spawnPetal, 1300);
}

// ===== This is a comment im adding to see whether git works or not ====//
//hiii//