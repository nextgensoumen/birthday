/* ========================================================
   PHOTOREALISTIC HOGWARTS GRIMOIRE INTERACTION
   Glitch-free 3D page-by-page turning, sound & candle magic
   ======================================================== */

// --- AUDIO SYNTHESIS ENGINE ---
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Realistic Multi-Layer Paper Flip Sound
function playRealisticPaperSound() {
    try {
        const ctx = getAudioContext();
        const bufferSize = ctx.sampleRate * 0.35;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.3);
        filter.Q.setValueAtTime(1.8, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
    } catch (e) {}
}

// Gentle wax break / seal pop sound
function playSealSound() {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
}

// Gentle candle blow out sound
function playCandleBlowSound() {
    try {
        const ctx = getAudioContext();
        const bufferSize = ctx.sampleRate * 0.38;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.22, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
    } catch (e) {}
}

// Celesta / Music Box Harmonic Note
function playCelestaNote(freq, duration, delay = 0) {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime + delay);

    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + delay + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(ctx.currentTime + delay);
    osc2.start(ctx.currentTime + delay);
    osc1.stop(ctx.currentTime + delay + duration);
    osc2.stop(ctx.currentTime + delay + duration);
}

// --- HAPPY BIRTHDAY SONG (music-box style, public-domain melody) ---
const BDAY_BEAT = 0.5; // seconds per beat
const BDAY_NOTES = [
    // Happy birthday to you
    [392.00, 0.75], [392.00, 0.25], [440.00, 1], [392.00, 1], [523.25, 1], [493.88, 2],
    // Happy birthday to you
    [392.00, 0.75], [392.00, 0.25], [440.00, 1], [392.00, 1], [587.33, 1], [523.25, 2],
    // Happy birthday dear Ananya
    [392.00, 0.75], [392.00, 0.25], [783.99, 1], [659.25, 1], [523.25, 1], [493.88, 1], [440.00, 2],
    // Happy birthday to you
    [698.46, 0.75], [698.46, 0.25], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2.5]
];
let isBdayPlaying = false;
let bdayTimer = null;
let bdayStep = 0;

function setBdayButton(playing) {
    const btn = document.getElementById('birthdayBtn');
    const label = document.getElementById('birthdayText');
    if (!btn || !label) return;
    btn.classList.toggle('playing', playing);
    label.textContent = playing ? 'Playing... tap to pause' : 'Happy Birthday Music';
}

function stopBirthdaySong() {
    isBdayPlaying = false;
    if (bdayTimer) clearTimeout(bdayTimer);
    setBdayButton(false);
}

function playBirthdayStep() {
    if (!isBdayPlaying) return;
    if (bdayStep >= BDAY_NOTES.length) {
        bdayStep = 0;
        bdayTimer = setTimeout(playBirthdayStep, 2500); // short pause, then sing again
        return;
    }
    const [freq, beats] = BDAY_NOTES[bdayStep];
    playCelestaNote(freq, beats * BDAY_BEAT * 1.6);
    bdayStep++;
    bdayTimer = setTimeout(playBirthdayStep, beats * BDAY_BEAT * 1000);
}

function startBirthdaySong() {
    if (bdayTimer) clearTimeout(bdayTimer);
    isBdayPlaying = true;
    bdayStep = 0;
    getAudioContext();
    setBdayButton(true);
    playBirthdayStep();
}

function toggleBirthdaySong() {
    if (isBdayPlaying) stopBirthdaySong();
    else startBirthdaySong();
}

// --- FLAWLESS 3D PAGE-TURNING ENGINE ---
let currentLeaf = 0;
const totalLeaves = 8; // p1..p8
let isAnimating = false; // Lock to prevent mid-flip animation glitches

const chapterTitles = [
    "The Cover",
    "Chapter I · Owl Post Dispatch",
    "Chapter II · Marauder's Map",
    "Chapter III · Memory Album",
    "Chapter IV · Potions & Awards",
    "Chapter V · Prophecies & Wishes",
    "Chapter VI · The Heartfelt Scroll",
    "Chapter VII · Words From My Heart",
    "Mischief Managed"
];

// Mathematically perfect stacking z-indices
function applyRestingZIndices() {
    for (let i = 1; i <= totalLeaves; i++) {
        const paper = document.getElementById(`p${i}`);
        if (!paper) continue;

        if (i <= currentLeaf) {
            // Stacked on the LEFT: bottom sheet has lowest z, top visible sheet has highest z
            paper.style.zIndex = i;
        } else {
            // Stacked on the RIGHT: top visible sheet has highest z, bottom sheet has lowest z
            paper.style.zIndex = totalLeaves - i + 1;
        }
    }
}

function updateConsole() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const chapterLabel = document.querySelector('.indicator-chapter');
    const dotsLabel = document.querySelector('.indicator-dots');
    const bookScene = document.getElementById('bookScene');
    const thicknessLeft = document.getElementById('thicknessLeft');
    const thicknessRight = document.getElementById('thicknessRight');

    // Button states
    if (prevBtn) prevBtn.disabled = (currentLeaf === 0);
    if (nextBtn) nextBtn.disabled = (currentLeaf === totalLeaves);

    // Room background scene follows the current spread
    document.body.setAttribute('data-scene', String(currentLeaf));

    // Indicator
    if (chapterLabel) {
        chapterLabel.textContent = chapterTitles[currentLeaf] || `Leaf ${currentLeaf}`;
    }
    if (dotsLabel) {
        let dots = "";
        for (let i = 0; i <= totalLeaves; i++) {
            dots += (i === currentLeaf) ? "● " : "○ ";
        }
        dotsLabel.textContent = dots.trim();
    }

    // Dynamic 2-page spread shift
    if (bookScene) {
        if (currentLeaf > 0 && currentLeaf < totalLeaves) {
            bookScene.classList.add('book-opened');
        } else {
            bookScene.classList.remove('book-opened');
        }
    }

    // Physical paper stack thickness
    if (thicknessLeft && thicknessRight) {
        const leftWidth = currentLeaf * 3.5;
        const rightWidth = (totalLeaves - currentLeaf) * 3.5;
        thicknessLeft.style.width = `${Math.max(2, leftWidth)}px`;
        thicknessRight.style.width = `${Math.max(2, rightWidth)}px`;
    }
}

function turnNextLeaf() {
    if (isAnimating || currentLeaf >= totalLeaves) return;

    isAnimating = true;
    playRealisticPaperSound();

    const leafToTurn = document.getElementById(`p${currentLeaf + 1}`);
    if (leafToTurn) {
        // Elevate turning leaf above all other pages during transit
        leafToTurn.style.zIndex = 100;
        leafToTurn.classList.add('flipped');
    }

    currentLeaf++;
    updateConsole();

    // Settle z-indices once flip animation completes (850ms)
    setTimeout(() => {
        applyRestingZIndices();
        isAnimating = false;
    }, 850);
}

function turnPrevLeaf() {
    if (isAnimating || currentLeaf <= 0) return;

    isAnimating = true;
    playRealisticPaperSound();

    const leafToTurn = document.getElementById(`p${currentLeaf}`);
    if (leafToTurn) {
        // Elevate turning leaf above all other pages during transit
        leafToTurn.style.zIndex = 100;
        leafToTurn.classList.remove('flipped');
    }

    currentLeaf--;
    updateConsole();

    // Settle z-indices once flip animation completes (850ms)
    setTimeout(() => {
        applyRestingZIndices();
        isAnimating = false;
    }, 850);
}

// --- CANDLE RITUAL INTERACTION ---
function setupCandleRitual() {
    const candleRig = document.getElementById('candleRig');
    const blessing = document.getElementById('blessingCard');
    const prompt = document.getElementById('candlePrompt');
    const incendioBtn = document.getElementById('incendioBtn');

    if (!candleRig) return;

    candleRig.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!candleRig.classList.contains('extinguished')) {
            playCandleBlowSound();
            candleRig.classList.add('extinguished');
            if (prompt) prompt.style.display = 'none';
            if (blessing) blessing.style.display = 'block';

            // Shimmer chimes
            playCelestaNote(880.00, 0.8, 0.08);
            playCelestaNote(1046.50, 1.2, 0.22);
            // Birthday song after the wish
            setTimeout(() => { if (!isBdayPlaying) startBirthdaySong(); }, 900);
        }
    });

    if (incendioBtn) {
        incendioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            candleRig.classList.remove('extinguished');
            if (prompt) prompt.style.display = 'block';
            if (blessing) blessing.style.display = 'none';
            playCelestaNote(659.25, 0.6);
        });
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const waxSeal = document.getElementById('frontWaxSeal');

    if (prevBtn) prevBtn.addEventListener('click', turnPrevLeaf);
    if (nextBtn) nextBtn.addEventListener('click', turnNextLeaf);
    const birthdayBtn = document.getElementById('birthdayBtn');
    if (birthdayBtn) birthdayBtn.addEventListener('click', toggleBirthdaySong);

    if (waxSeal) {
        waxSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            playSealSound();
            turnNextLeaf();
        });
    }

    // Direct page click navigation
    for (let i = 1; i <= totalLeaves; i++) {
        const paper = document.getElementById(`p${i}`);
        if (paper) {
            paper.addEventListener('click', (e) => {
                if (e.target.closest('#candleRig') || e.target.closest('#incendioBtn')) {
                    return;
                }

                if (paper.classList.contains('flipped')) {
                    turnPrevLeaf();
                } else {
                    turnNextLeaf();
                }
            });
        }
    }

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            turnNextLeaf();
        } else if (e.key === 'ArrowLeft') {
            turnPrevLeaf();
        }
    });

    setupCandleRitual();
    applyRestingZIndices();
    updateConsole();
});

/* Birthday celebration ambience: golden lights, confetti, floating candles */
(function () {
    const layer = document.getElementById('celebration');
    if (!layer) return;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const colors = ['#e8b64c', '#c0392b', '#f4d58d', '#7b2d26', '#d4a373', '#fff3c4'];
    const add = (cls, styles, text) => {
        const el = document.createElement('span');
        el.className = cls;
        Object.assign(el.style, styles);
        if (text) el.textContent = text;
        layer.appendChild(el);
    };
    for (let i = 0; i < 14; i++) {
        const size = rnd(40, 110);
        add('glow', { left: rnd(0, 100) + '%', top: rnd(30, 100) + '%', width: size + 'px', height: size + 'px',
            animationDuration: rnd(8, 16) + 's', animationDelay: -rnd(0, 16) + 's' });
    }
    for (let i = 0; i < 28; i++) {
        add('confetti', { left: rnd(0, 100) + '%', width: rnd(6, 10) + 'px', height: rnd(10, 16) + 'px',
            background: colors[i % colors.length], borderRadius: i % 3 === 0 ? '50%' : '1px',
            animationDuration: rnd(9, 18) + 's', animationDelay: -rnd(0, 18) + 's' });
    }
    const balloonColors = ['#c0392b', '#e8b64c', '#7b2d26', '#d98880', '#f4d58d'];
    for (let i = 0; i < 7; i++) {
        add('balloon', { left: rnd(2, 94) + '%', background: balloonColors[i % balloonColors.length],
            animationDuration: rnd(16, 26) + 's', animationDelay: -rnd(0, 24) + 's' });
    }
    for (let i = 0; i < 6; i++) {
        add('candle', { left: rnd(3, 95) + '%', animationDuration: rnd(14, 24) + 's', animationDelay: -rnd(0, 20) + 's' }, '🕯️');
    }
})();
