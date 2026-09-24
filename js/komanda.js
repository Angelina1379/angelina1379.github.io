// Меню бургер
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) nav.classList.toggle('show');
}

// Подсветка активной ссылки
function setActiveLink() {
    const links = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

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
            { src: 'image/car1.jpg', caption: 'Просторный и комфортабельный минивэн на 6 мест' },
            { src: 'image/car2.jpg', caption: 'Чистый салон с климат-контролем' },
            { src: 'image/car3.jpg', caption: 'Удобство и безопасность в каждой поездке' }
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
            { src: 'image/cert1.jpg', caption: 'Аттестат государственного образца экскурсовода' },
            { src: 'image/cert2.jpg', caption: 'Удостоверение о повышении квалификации' },
            { src: 'image/cert3.jpg', caption: 'Официальный бейдж гида по Калининградской области' }
        ]
    }
};

// ================= УНИВЕРСАЛЬНАЯ ЛОГИКА КАРУСЕЛЕЙ =================
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
        // Слайд
        const slide = document.createElement('div');
        slide.className = 'carousel-item';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = 'lazy';
        img.onerror = function() {
            // Если фото еще не загружено, показываем симпатичную заглушку
            this.src = 'https://via.placeholder.com/600x450/e0e7ee/002244?text=' + encodeURIComponent(photo.caption);
        };

        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = photo.caption;

        slide.appendChild(img);
        slide.appendChild(caption);
        inner.appendChild(slide);

        // Индикатор (кружочек)
        const dot = document.createElement('div');
        dot.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(key, index);
        indicators.appendChild(dot);
    });

    updateCarouselView(key);
    startCarouselAutoSlide(key);

    if (container) {
        container.addEventListener('mouseenter', () => stopCarouselAutoSlide(key));
        container.addEventListener('mouseleave', () => startCarouselAutoSlide(key));
        container.addEventListener('touchstart', () => stopCarouselAutoSlide(key));
        container.addEventListener('touchend', () => startCarouselAutoSlide(key));
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

// Запуск при готовности страницы
document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
    initAllCarousels();
});

// Экспорт для инлайн-атрибутов onclick в HTML
window.toggleMenu = toggleMenu;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;
