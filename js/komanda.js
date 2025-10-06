// Меню бургер
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
}

// Подсветка активной ссылки
function setActiveLink() {
    const links = document.querySelectorAll('.nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// === КАРУСЕЛЬ ===
const photos = [
    { src: 'image/irina1.jpg', caption: 'Ирина Пеунова - ваш гид по Калининграду' },
    { src: 'image/irina2.jpg', caption: 'Профессиональный подход к каждой экскурсии' },
    { src: 'image/irina3.jpg', caption: 'Знакомство с историей города' },
    { src: 'image/irina4.jpg', caption: 'Индивидуальные экскурсии для вас' },
    { src: 'image/irina5.jpg', caption: 'Опытный гид с 10-летним стажем' },
    { src: 'image/irina6.jpg', caption: 'Экскурсии на любой вкус' },
    { src: 'image/irina7.jpg', caption: 'Познавательные маршруты' },
    { src: 'image/irina8.jpg', caption: 'Увлекательные рассказы о городе' },
    { src: 'image/irina9.jpg', caption: 'Профессионализм и внимание к деталям' },
    { src: 'image/irina10.jpg', caption: 'Ваш персональный гид по Калининграду' },
    { src: 'image/irina11.jpg', caption: 'Экскурсии для всей семьи' },
    { src: 'image/irina12.jpg', caption: 'Знакомство с Балтикой' },
    { src: 'image/irina13.jpg', caption: 'Прогулки по старым улочкам' },
    { src: 'image/irina14.jpg', caption: 'Открываем скрытые уголки' },
    { src: 'image/irina15.jpg', caption: 'Экскурсии в любую погоду' },
    { src: 'image/irina16.jpg', caption: 'Калининград глазами местного' },
    { src: 'image/irina17.jpg', caption: 'Путешествие в историю' },
    { src: 'image/irina18.jpg', caption: 'Авторские экскурсионные маршруты' },
    { src: 'image/irina19.jpg', caption: 'Профессиональный подход к каждой экскурсии' },
    { src: 'image/irina20.jpg', caption: 'Экскурсии на любой вкус' },
    { src: 'image/irina21.jpg', caption: 'Индивидуальные экскурсии для вас' },
    { src: 'image/irina22.jpg', caption: 'Прогулки по старым улочкам' },
    { src: 'image/irina23.jpg', caption: 'Ваш персональный гид по Калининграду' }
];

let currentSlide = 0;
let slideInterval;

function initCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    if (!carouselInner || !carouselIndicators) return;

    // Очищаем карусель
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Создаем слайды
    photos.forEach((photo, index) => {
        // Создаем элемент слайда
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        
        // Создаем изображение
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption;
        
        // Обработка ошибок загрузки
        img.onerror = function() {
            console.warn(`Не удалось загрузить изображение: ${photo.src}`);
            this.style.display = 'none';
        };
        
        // Создаем подпись
        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.textContent = photo.caption;
        
        slide.appendChild(img);
        slide.appendChild(caption);
        carouselInner.appendChild(slide);

        // Создаем индикатор
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        carouselIndicators.appendChild(indicator);
    });

    updateCarousel();
    startAutoSlide();
}

function updateCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (!carouselInner) return;

    // Перемещаем карусель
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем индикаторы
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % photos.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + photos.length) % photos.length;
    updateCarousel();
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Останавливаем автопрокрутку при взаимодействии
function setupCarouselEvents() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        carousel.addEventListener('touchstart', stopAutoSlide);
        carousel.addEventListener('touchend', startAutoSlide);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setActiveLink();
    initCarousel();
    setupCarouselEvents();
});

// Экспортируем функции для HTML
window.toggleMenu = toggleMenu;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
