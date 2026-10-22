const PASSECODE_CORRECT = "1010";
let pinEntered = "";

const lockScreen = document.getElementById('lockScreen');
const passcodeScreen = document.getElementById('passcodeScreen');
const dots = document.querySelectorAll('.dot');
const waNotification = document.getElementById('waNotification');

// 1. JAM & TANGGAL REAL-TIME
function runClock() {
    const timeNow = new Date();
    let hours = String(timeNow.getHours()).padStart(2, '0');
    let minutes = String(timeNow.getMinutes()).padStart(2, '0');
    document.getElementById('iosClock').innerText = `${hours}:${minutes}`;

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    document.getElementById('iosDate').innerText = `${days[timeNow.getDay()]}, ${timeNow.getDate()} ${months[timeNow.getMonth()]}`;
}
runClock();
setInterval(runClock, 1000);

// 2. DETEKSI LOGIKA SWIPE UP (GESER KE ATAS)
let touchStartY = 0;
let touchEndY = 0;

// Aksi jika notifikasi WhatsApp diklik langsung
waNotification.addEventListener('click', (e) => {
    e.stopPropagation();
    openPasscodeScreen();
});

// Deteksi Sentuhan Jari (Mobile) & Tarikan Mouse (Desktop)
lockScreen.addEventListener('touchstart', e => touchStartY = e.changedTouches[0].screenY);
lockScreen.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});
lockScreen.addEventListener('mousedown', e => touchStartY = e.screenY);
lockScreen.addEventListener('mouseup', e => {
    touchEndY = e.screenY;
    handleSwipe();
});

function handleSwipe() {
    // Jika ditarik ke atas sejauh minimal 50 pixel, buka layar password
    if (touchStartY - touchEndY > 50) {
        openPasscodeScreen();
    }
}

function openPasscodeScreen() {
    lockScreen.classList.add('swiped-up');
    passcodeScreen.classList.add('show');
}

function cancelPasscode() {
    lockScreen.classList.remove('swiped-up');
    passcodeScreen.classList.remove('show');
    resetPinState();
}

// 3. VALIDASI KATA SANDI
function pressNum(digit) {
    if (pinEntered.length < 4) {
        pinEntered += digit;
        refreshDots();
        if (pinEntered.length === 4) {
            setTimeout(validatePin, 250);
        }
    }
}
function refreshDots() {
    dots.forEach((dot, idx) => {
        if (idx < pinEntered.length) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}
 oblivion
function deleteNum() {
    pinEntered = pinEntered.slice(0, -1);
    refreshDots();
}
function resetPinState() {
    pinEntered = "";
    refreshDots();
}
function validatePin() {
    if (pinEntered === PASSECODE_CORRECT) {
        alert("🔓 Sandi Benar! Layar kunci sukses terbuka.");
        // Tahap berikutnya: memunculkan halaman beranda utama di sini
    } else {
        alert("Sandi Salah! Silakan coba lagi.");
        resetPinState();
    }
      }
      
