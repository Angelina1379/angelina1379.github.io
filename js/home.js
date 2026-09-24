// ============================================================
// FIREBASE КОНФИГУРАЦИЯ
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyCmYw5h3YE0DhiD_2o2BpsqoA9EzktqIKk",
  authDomain: "kaliningrad-tour2025.firebaseapp.com",
  projectId: "kaliningrad-tour2025",
  storageBucket: "kaliningrad-tour2025.appspot.com",
  messagingSenderId: "733180646321",
  appId: "1:733180646321:web:f7e0106357edc327162390"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ============================================================
// ПЕРЕМЕННЫЕ ДЛЯ ОТЗЫВОВ
// ============================================================

let reviewCards = [];
let currentPage = 0;
let cardsPerPage = 3;

// ============================================================
// ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА КАРТОЧЕК
// ============================================================

function getCardsPerPage() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

// ============================================================
// ЗАГРУЗКА ОТЗЫВОВ ИЗ FIREBASE
// ============================================================

async function loadReviews() {
    const track = document.getElementById("reviewTrack");
    if (!track) return;

    try {
        const snap = await db
            .collection("reviews")
            .orderBy("date", "desc")
            .limit(20)
            .get();

        track.innerHTML = "";
        reviewCards = [];

        if (snap.empty) {
            track.innerHTML = '<div class="review-card" style="text-align:center;padding:40px;width:100%;">Пока нет отзывов</div>';
            const prev = document.getElementById("reviewPrev");
            const next = document.getElementById("reviewNext");
            if (prev) prev.classList.add("hidden");
            if (next) next.classList.add("hidden");
            return;
        }

        snap.forEach(doc => {
            const r = doc.data();
            
            // Обработка даты
            let date = r.date;
            if (date && typeof date.toDate === 'function') {
                date = date.toDate();
            } else if (date && typeof date === 'string') {
                date = new Date(date);
            } else {
                date = new Date();
            }

            const card = document.createElement("div");
            card.className = "review-card";

            const messageText = r.message || '';
            const isLong = messageText.length > 140;
            const shortMessage = isLong ? messageText.substring(0, 140) + "..." : messageText;
            const authorName = r.name || 'Аноним';
            const authorInitial = authorName.charAt(0).toUpperCase();
            const ratingValue = Number(r.rating) || 5;

            card.innerHTML = `
                <div class="review-avatar">${authorInitial}</div>
                <h3>${escapeHtml(authorName)}</h3>
                <div class="review-stars">
                    ${"★".repeat(ratingValue)}${"☆".repeat(Math.max(0, 5 - ratingValue))}
                </div>
                <small>${date.toLocaleDateString("ru-RU")}</small>
                <p>${escapeHtml(shortMessage)}</p>
                <button type="button" class="review-more-btn">
                    Читать полностью →
                </button>
            `;

            // Безопасное открытие модального окна без синтаксических ошибок кавычек
            const moreBtn = card.querySelector(".review-more-btn");
            moreBtn.addEventListener("click", () => {
                openReviewModal({
                    name: authorName,
                    rating: ratingValue,
                    date: date,
                    message: messageText
                });
            });

            track.appendChild(card);
            reviewCards.push(card);
        });

        initReviewSlider();

    } catch(error) {
        console.error("Ошибка загрузки отзывов:", error);
        track.innerHTML = '<div class="review-card" style="text-align:center;padding:40px;color:red;width:100%;">Ошибка загрузки отзывов</div>';
    }
}

// Защита от XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================
// ИНИЦИАЛИЗАЦИЯ И УПРАВЛЕНИЕ СЛАЙДЕРОМ
// ============================================================

function initReviewSlider() {
    currentPage = 0;
    updateReviewView();

    const prev = document.getElementById("reviewPrev");
    const next = document.getElementById("reviewNext");

    if (prev) {
        prev.onclick = prevReview;
        prev.classList.remove("hidden");
    }
    if (next) {
        next.onclick = nextReview;
        next.classList.remove("hidden");
    }
}

function updateReviewView() {
    cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(reviewCards.length / cardsPerPage);

    // Скрываем все и показываем нужные
    reviewCards.forEach((card, index) => {
        const start = currentPage * cardsPerPage;
        const end = start + cardsPerPage;
        if (index >= start && index < end) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    const prev = document.getElementById("reviewPrev");
    const next = document.getElementById("reviewNext");

    if (!prev || !next) return;

    if (totalPages <= 1 || reviewCards.length === 0) {
        prev.classList.add("hidden");
        next.classList.add("hidden");
        return;
    }

    prev.classList.remove("hidden");
    next.classList.remove("hidden");

    prev.disabled = currentPage === 0;
    next.disabled = currentPage >= totalPages - 1;

    prev.style.opacity = currentPage === 0 ? '0.35' : '1';
    prev.style.cursor = currentPage === 0 ? 'not-allowed' : 'pointer';
    next.style.opacity = currentPage >= totalPages - 1 ? '0.35' : '1';
    next.style.cursor = currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer';
}

function nextReview() {
    const totalPages = Math.ceil(reviewCards.length / cardsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateReviewView();
    }
}

function prevReview() {
    if (currentPage > 0) {
        currentPage--;
        updateReviewView();
    }
}

// ============================================================
// МОДАЛЬНОЕ ОКНО ОТЗЫВА
// ============================================================

window.openReviewModal = function(review) {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;

    let date = review.date instanceof Date ? review.date : new Date(review.date);
    if (isNaN(date.getTime())) date = new Date();

    const nameEl = document.getElementById("modalReviewName");
    const starsEl = document.getElementById("modalReviewStars");
    const dateEl = document.getElementById("modalReviewDate");
    const textEl = document.getElementById("modalReviewText");

    if (nameEl) nameEl.textContent = review.name || 'Аноним';
    if (starsEl) {
        const rating = Number(review.rating) || 5;
        starsEl.innerHTML = "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
    }
    if (dateEl) dateEl.textContent = date.toLocaleDateString("ru-RU");
    if (textEl) textEl.textContent = review.message || '';

    modal.classList.add("open");
    document.body.style.overflow = 'hidden';
};

window.closeReviewModal = function() {
    const modal = document.getElementById("reviewModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = '';
    }
};

// ============================================================
// МОДАЛКИ ТУРОВ
// ============================================================

window.showDetails = function(index) {
    const modal = document.getElementById("tourModal");
    if (!modal) return;
    
    const tours = [
      {
        title: "Куршская коса + Зеленоградск",
        description: [
          "На узкой полосе суши между соленой Балтикой и пресноводным Куршским заливом расположился настоящий \"туристический магнит\" Калининградской области — уникальный нацпарк «Куршская коса».",
          "Аутентичности местным пейзажам придает тот факт, что весь национальный парк, по сути, представляет собой крупнейшую песчаную пересыпь на планете.",
          "Обратная дорога пройдет через курортный Зеленоградск, впечатляющий старинной архитектурой и атмосферой.",
          "• Королевский бор: прогулка по живописному сосновому лесу",
          "• Танцующий лес: уникальный участок с искривленными деревьями",
          "• Высота Эфа: захватывающий панорамный вид на море и залив"
        ],
        images: Array(6).fill().map((_, i) => `image/kurshskaya${i + 1}.jpg`),
        max: "https://max.ru/+79052484096"
      },
      {
        title: "Обзорная экскурсия по Калининграду",
        description: [
          "Предлагаю начать наше знакомство с Калининградом с увлекательной обзорной экскурсии.",
          "Мы пройдемся по историческому центру, заглянем на остров Канта, где возвышается Кафедральный собор.",
          "Обязательно посетим живописную Рыбную деревню — любимое место гостей города.",
          "В завершение экскурсии мы отправимся в самые колоритные районы Калининграда — Амалиенау и Марауненхоф."
        ],
        images: Array(6).fill().map((_, i) => `image/obzornaya${i + 1}.jpg`),
        max: "https://max.ru/+79052484096"
      },
      {
        title: "Все красоты области за 3 дня",
        description: [
          "Если у вас есть пара-тройка свободных дней в Калининграде, этот тур идеально подойдет.",
          "1 день: Обзорная экскурсия по Калининграду",
          "2 день: Янтарное побережье — Светлогорск и Янтарный",
          "3 день: Зеленоградск и Куршская коса"
        ],
        images: Array(6).fill().map((_, i) => `image/3days${i + 1}.jpg`),
        max: "https://max.ru/+79052484096"
      }
    ];
    
    const tour = tours[index];
    if (!tour) return;
    
    document.body.style.overflow = 'hidden';
    document.getElementById("modal-title").textContent = tour.title;
    document.getElementById("max-link").href = tour.max;
    
    const descContainer = document.getElementById("modal-description");
    descContainer.innerHTML = "";
    tour.description.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      descContainer.appendChild(p);
    });
    
    const carouselInner = document.getElementById("carousel-inner");
    const indicators = document.getElementById("carousel-indicators");
    carouselInner.innerHTML = "";
    indicators.innerHTML = "";
    
    tour.images.forEach((src, i) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${i === 0 ? "active" : ""}`;
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Фото ${i + 1}`;
      img.onerror = function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QpNC+0YLQviDQvdC1INC90LDQudC00LXQvQ</text+></svg>';
      };
      item.appendChild(img);
      carouselInner.appendChild(item);
      
      const dot = document.createElement("button");
      dot.className = `carousel-indicator ${i === 0 ? "active" : ""}`;
      dot.onclick = () => showSlide(i);
      indicators.appendChild(dot);
    });
    
    window.currentSlide = 0;
    showSlide(0);
    modal.classList.add("open");
    startAutoSlide();
};

window.closeModal = function() {
    const modal = document.getElementById("tourModal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = '';
    stopAutoSlide();
};

// ============================================================
// СЛАЙДЕР КАРУСЕЛИ ТУРОВ
// ============================================================

window.showSlide = function(index) {
    const items = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".carousel-indicator");
    if (items.length === 0) return;
    if (index >= items.length) index = 0;
    if (index < 0) index = items.length - 1;
    
    const inner = document.getElementById("carousel-inner");
    if (inner) inner.style.transform = `translateX(-${index * 100}%)`;
    
    items.forEach((el, i) => el.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    window.currentSlide = index;
};

window.nextSlide = function() {
    const items = document.querySelectorAll(".carousel-item");
    showSlide(window.currentSlide + 1);
};

window.prevSlide = function() {
    const items = document.querySelectorAll(".carousel-item");
    showSlide(window.currentSlide - 1);
};

let autoSlideTimer;
function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
        const items = document.querySelectorAll(".carousel-item");
        if (items.length > 0) {
            showSlide(window.currentSlide + 1);
        }
    }, 4000);
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

// ============================================================
// БУРГЕР И НАВИГАЦИЯ
// ============================================================

window.toggleMenu = function() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("show");
};

// ============================================================
// SCROLL-REVEAL
// ============================================================

function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Если раскрывается контейнер why-us, анимируем его карточки
                const subItems = entry.target.querySelectorAll("li");
                subItems.forEach((li, idx) => {
                    setTimeout(() => li.classList.add("show"), idx * 100);
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => obs.observe(el));
}

// ============================================================
// COOKIE-СОГЛАСИЕ
// ============================================================

const cookieBanner = document.getElementById("cookieBanner");
if (cookieBanner && document.cookie.indexOf("cookieConsent=1") === -1) {
    cookieBanner.classList.add("show");
}

window.acceptCookies = function() {
    document.cookie = "cookieConsent=1; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.classList.remove("show");
};

// ============================================================
// ОБРАБОТКА КЛИКОВ И КЛАВИАТУРЫ
// ============================================================

document.addEventListener('click', function(e) {
    // Закрытие модалки тура по фону
    const tourModal = document.getElementById("tourModal");
    if (tourModal && e.target === tourModal) {
        closeModal();
    }

    // Закрытие модалки отзыва по клику вне контента
    const revModal = document.getElementById("reviewModal");
    if (revModal && revModal.classList.contains('open')) {
        const content = revModal.querySelector('.review-modal-content');
        if (content && !content.contains(e.target) && !e.target.closest('.review-more-btn')) {
            closeReviewModal();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeReviewModal();
    }
});

window.addEventListener("resize", function() {
    if (reviewCards.length > 0) {
        updateReviewView();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    initReveal();
    loadReviews();
});
