// Меню бургер
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) nav.classList.toggle('show');
}

// Подсветка активной ссылки
function setActiveLink() {
    const links = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'komanda.html';

    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ================= ДАННЫЕ ДЛЯ КАРУСЕЛЕЙ =================
const carouselsData = {
    // 1. Фотографии гида
    guide: {
        currentSlide: 0,
        interval: null,
        innerId: 'guideCarouselInner',
        indicatorsId: 'guideIndicators',
        containerId: 'carousel-guide-container',
        photos: [
            { src: 'image/irina1.jpg', caption: 'Ирина Пеунова — ваш гид по Калининграду' },
            { src: 'image/irina2.jpg', caption: 'Профессиональный подход к каждой экскурсии' },
            { src: 'image/irina3.jpg', caption: 'Знакомство с историей города' },
            { src: 'image/irina4.jpg', caption: 'Индивидуальные экскурсии для вас' },
            { src: 'image/irina5.jpg', caption: 'Опытный гид с 10-летним стажем' },
            { src: 'image/irina6.jpg', caption: 'Экскурсии на любой вкус' },
            { src: 'image/irina7.jpg', caption: 'Познавательные маршруты' },
            { src: 'image/irina8.jpg', caption: 'Увлекательные рассказы о городе' },
            { src: 'image/irina9.jpg', caption: 'Профессионализм и внимание к деталям' },
            { src: 'image/irina10.jpg', caption: 'Ваш персональный гид по Калининграду' }
        ]
    },
    // 2. Фотографии автомобиля
    car: {
        currentSlide: 0,
        interval: null,
        innerId: 'carCarouselInner',
        indicatorsId: 'carIndicators',
        containerId: 'carousel-car-container',
        photos: [
            { src: 'image/car1.jpg', caption: 'Шестиместный салон повышенного комфорта' },
            { src: 'image/car2.jpg', caption: 'Панорамный обзор и климат-контроль' },
            { src: 'image/car3.jpg', caption: 'Всегда чистый и удобный автомобиль' }
        ]
    },
    // 3. Фотографии документов и сертификатов
    docs: {
        currentSlide: 0,
        interval: null,
        innerId: 'docsCarouselInner',
        indicatorsId: 'docsIndicators',
        containerId: 'carousel-docs-container',
        photos: [
            { src: 'image/cert1.jpg', caption: 'Государственный аттестат экскурсовода' },
            { src: 'image/cert2.jpg', caption: 'Удостоверение о повышении квалификации' },
            { src: 'image/cert3.jpg', caption: 'Бейдж федерального реестра гидов' }
        ]
    }
};

// ================= ИНТЕРАКТИВ АККОРДЕОНОВ =================
function toggleAccordion(itemId, carouselKey) {
    const item = document.getElementById(itemId);
    if (!item) return;

    const isActive = item.classList.contains('active');
    
    // Переключаем класс
    item.classList.toggle('active');

    // Если открыли аккордеон — обновляем карусель и запускаем автослайд
    if (!isActive) {
        setTimeout(() => {
            updateCarouselView(carouselKey);
            startCarouselAutoSlide(carouselKey);
        }, 150);
    } else {
        stopCarouselAutoSlide(carouselKey);
    }
}

// ================= ЛОГИКА КАРУСЕЛЕЙ =================
function initAllCarousels() {
    Object.keys(carouselsData).forEach(key => {
        buildCarousel(key);
    });
}

function buildCarousel(key) {
    const config = carouselsData[key];
    const inner = document.getElementById(config.innerId);
    const indicators = document.getElementById(config.indicatorsId);
    const container = document.getElementById(config.containerId);

    if (!inner || !indicators || !config.photos.length) return;

    inner.innerHTML = '';
    indicators.innerHTML = '';

    config.photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/600x450/002244/ffffff?text=' + encodeURIComponent(photo.caption);
        };

        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = photo.caption;

        slide.appendChild(img);
        slide.appendChild(caption);
        inner.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(key, index);
        indicators.appendChild(dot);
    });

    updateCarouselView(key);

    // Автопрокрутку на старте запускаем только для открытого первого экрана (гида)
    if (key === 'guide') {
        startCarouselAutoSlide(key);
    }

    if (container) {
        container.addEventListener('mouseenter', () => stopCarouselAutoSlide(key));
        container.addEventListener('mouseleave', () => {
            const accItem = container.closest('.acc-item');
            if (!accItem || accItem.classList.contains('active')) {
                startCarouselAutoSlide(key);
            }
        });
    }
}

function updateCarouselView(key) {
    const config = carouselsData[key];
    const inner = document.getElementById(config.innerId);
    const indicators = document.getElementById(config.indicatorsId);
    if (!inner) return;

    inner.style.transform = `translateX(-${config.currentSlide * 100}%)`;

    if (indicators) {
        const dots = indicators.querySelectorAll('.carousel-indicator');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === config.currentSlide);
        });
    }
}

function goToSlide(key, index) {
    const config = carouselsData[key];
    config.currentSlide = index;
    updateCarouselView(key);
    restartCarouselAutoSlide(key);
}

function nextSlide(key) {
    const config = carouselsData[key];
    if (!config) return;
    config.currentSlide = (config.currentSlide + 1) % config.photos.length;
    updateCarouselView(key);
}

function prevSlide(key) {
    const config = carouselsData[key];
    if (!config) return;
    config.currentSlide = (config.currentSlide - 1 + config.photos.length) % config.photos.length;
    updateCarouselView(key);
}

function startCarouselAutoSlide(key) {
    const config = carouselsData[key];
    if (!config) return;
    stopCarouselAutoSlide(key);
    config.interval = setInterval(() => nextSlide(key), 5000);
}

function stopCarouselAutoSlide(key) {
    const config = carouselsData[key];
    if (config && config.interval) {
        clearInterval(config.interval);
        config.interval = null;
    }
}

function restartCarouselAutoSlide(key) {
    stopCarouselAutoSlide(key);
    startCarouselAutoSlide(key);
}

// Запуск при старте
document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
    initAllCarousels();
});

// Экспорт в глобальную область
window.toggleMenu = toggleMenu;
window.toggleAccordion = toggleAccordion;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;
