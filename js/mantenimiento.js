let inactivityTimer;
let countdownTimer;
let countdownSeconds = 30;
const INACTIVITY_TIME = 3 * 60 * 1000; // 3 minutos

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showInactivityWarning, INACTIVITY_TIME);
}

function showInactivityWarning() {
    const modal = document.getElementById('inactivityModal');
    const overlay = document.getElementById('overlay');
    const supportPanel = document.getElementById('supportPanel');
    const timerDisplay = document.getElementById('timerDisplay');
    
    // Cerrar el panel de soporte si está abierto
    supportPanel.classList.remove('active');
    
    countdownSeconds = 30;
    timerDisplay.textContent = countdownSeconds;
    
    modal.classList.add('active');
    overlay.classList.add('active');
    
    countdownTimer = setInterval(() => {
        countdownSeconds--;
        timerDisplay.textContent = countdownSeconds;
        
        if (countdownSeconds <= 0) {
            clearInterval(countdownTimer);
            leavePage();
        }
    }, 1000);
}

function stayOnPage() {
    const modal = document.getElementById('inactivityModal');
    const overlay = document.getElementById('overlay');
    
    clearInterval(countdownTimer);
    modal.classList.remove('active');
    overlay.classList.remove('active');
    
    resetInactivityTimer();
}

function leavePage() {
    window.location.href = '../index.html';
}

function toggleSupport() {
    const panel = document.getElementById('supportPanel');
    const overlay = document.getElementById('overlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    
    resetInactivityTimer();
}

function closeSupport() {
    const panel = document.getElementById('supportPanel');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('inactivityModal');
    
    // Solo cerrar si no está el modal de inactividad activo
    if (!modal.classList.contains('active')) {
        panel.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    resetInactivityTimer();
}

// Eventos para detectar actividad
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);

// Iniciar el timer cuando carga la página
resetInactivityTimer();