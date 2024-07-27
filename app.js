document.addEventListener('DOMContentLoaded', () => {
    const progressBlock = document.getElementById('progressBlock');
    const progressCircle = document.getElementById('progressCircle');
    const valueInput = document.getElementById('valueInput');
    const animateToggle = document.getElementById('animateToggle');
    const hideToggle = document.getElementById('hideToggle');

    let animationInterval;
    let rotation = -90; // Начинаем с 12 часов

    function updateProgress(value) {
        const clampedValue = Math.min(value, 100); // Ограничиваем значение до 100
        const circumference = 565.48; // 2 * π * r (r = 90)
        const offset = circumference - (clampedValue / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    function startAnimation() {
        animationInterval = setInterval(() => {
            rotation = (rotation + 1) % 360;
            progressCircle.style.transform = `rotate(${rotation}deg)`;
        }, 10);
    }

    function stopAnimation() {
        clearInterval(animationInterval);
        progressCircle.style.transform = 'rotate(-90deg)'; // Сброс к 12 часам
        rotation = -90;
    }

    valueInput.addEventListener('input', () => {
        const value = parseInt(valueInput.value, 10) || 0; // Преобразуем в число, если не число, то 0
        updateProgress(value);
    });

    animateToggle.addEventListener('change', () => {
        if (animateToggle.checked) {
            startAnimation();
        } else {
            stopAnimation();
        }
    });

    hideToggle.addEventListener('change', () => {
        progressBlock.style.display = hideToggle.checked ? 'none' : 'block';
    });

    // Начальная настройка
    updateProgress(0);
    progressCircle.style.transform = 'rotate(-90deg)'; // Устанавливаем начальный поворот к 12 часам
});