let reviewCards = [];
let currentPage = 0;
let cardsPerPage = 3;

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

// Функция определения количества карточек на странице
function getCardsPerPage() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

// ЗАГРУЗКА ОТЗЫВОВ ИЗ FIREBASE
async function loadReviews() {
    const slider = document.getElementById("reviewTrack");
    if (!slider) {
        console.error('reviewTrack не найден');
        return;
    }

    try {
        const snap = await db
            .collection("reviews")
            .orderBy("date", "desc")
            .limit(20)
            .get();

        slider.innerHTML = "";
        reviewCards = [];

        if (snap.empty) {
            slider.innerHTML = '<div class="review-card" style="text-align:center;padding:40px;">Пока нет отзывов</div>';
            document.getElementById("reviewPrev").classList.add("hidden");
            document.getElementById("reviewNext").classList.add("hidden");
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
            card.dataset.index = reviewCards.length;

            // Обрезаем текст
            const shortMessage = r.message && r.message.length > 140 
                ? r.message.substring(0, 140) + "..." 
                : r.message || '';

            // Экранируем данные для JSON
            const reviewData = {
                name: r.name || 'Аноним',
                rating: r.rating || 5,
                date: date.toISOString(),
                message: r.message || ''
            };

            card.innerHTML = `
                <div class="review-avatar">
                    ${(r.name || 'А').charAt(0).toUpperCase()}
                </div>
                <h3>${r.name || 'Аноним'}</h3>
                <div class="review-stars">
                    ${"★".repeat(r.rating || 5)}
                    ${"☆".repeat(5 - (r.rating || 5))}
                </div>
                <small>${date.toLocaleDateString("ru-RU")}</small>
                <p>${shortMessage}</p>
                <button class="review-more-btn" onclick='openReviewModal(${JSON.stringify(reviewData).replace(/'/g, "&#39;")})'>
                    Читать полностью →
                </button>
            `;

            slider.appendChild(card);
            reviewCards.push(card);
        });

        // Инициализируем слайдер после загрузки
        initReviewSlider();

    } catch(error) {
        console.error("Ошибка загрузки отзывов:", error);
        slider.innerHTML = '<div class="review-card" style="text-align:center;padding:40px;color:red;">Ошибка загрузки отзывов</div>';
    }
}

// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА
function initReviewSlider() {
    cardsPerPage = getCardsPerPage();
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

// ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ
function updateReviewView() {
    cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(reviewCards.length / cardsPerPage);

    // Скрываем все карточки
    reviewCards.forEach(card => {
        card.style.display = "none";
    });

    // Показываем нужные
    const start = currentPage * cardsPerPage;
    const end = Math.min(start + cardsPerPage, reviewCards.length);
    for (let i = start; i < end; i++) {
        if (reviewCards[i]) {
            reviewCards[i].style.display = "flex";
        }
    }

    // Обновляем кнопки
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

    // Визуальное отключение кнопок
    prev.style.opacity = currentPage === 0 ? '0.5' : '1';
    next.style.opacity = currentPage >= totalPages - 1 ? '0.5' : '1';
}

// СЛЕДУЮЩАЯ СТРАНИЦА
function nextReview() {
    const totalPages = Math.ceil(reviewCards.length / cardsPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateReviewView();
    }
}

// ПРЕДЫДУЩАЯ СТРАНИЦА
function prevReview() {
    if (currentPage > 0) {
        currentPage--;
        updateReviewView();
    }
}

// ОТКРЫТИЕ МОДАЛКИ ОТЗЫВА
window.openReviewModal = function(review) {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;

    // Обработка даты
    let date = new Date(review.date);
    if (isNaN(date.getTime())) {
        date = new Date();
    }

    document.getElementById("modalReviewName").textContent = review.name || 'Аноним';
    
    const stars = document.getElementById("modalReviewStars");
    if (stars) {
        const rating = review.rating || 5;
        stars.innerHTML = "★".repeat(rating) + "☆".repeat(5 - rating);
    }
    
    document.getElementById("modalReviewDate").textContent = date.toLocaleDateString("ru-RU");
    document.getElementById("modalReviewText").textContent = review.message || '';

    modal.classList.add("open");
    document.body.style.overflow = 'hidden';
};

// ЗАКРЫТИЕ МОДАЛКИ ОТЗЫВА
window.closeReviewModal = function() {
    const modal = document.getElementById("reviewModal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = '';
    }
};

// Закрытие модалки по клику вне контента
document.addEventListener('click', function(e) {
    const modal = document.getElementById("reviewModal");
    if (modal && modal.classList.contains('open')) {
        const content = modal.querySelector('.review-modal-content');
        if (content && !content.contains(e.target)) {
            closeReviewModal();
        }
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById("reviewModal");
        if (modal && modal.classList.contains('open')) {
            closeReviewModal();
        }
    }
});

// Обновление при изменении размера окна
window.addEventListener("resize", function() {
    if (reviewCards.length > 0) {
        updateReviewView();
    }
});

// ЗАГРУЗКА ПРИ ГОТОВНОСТИ DOM
document.addEventListener("DOMContentLoaded", loadReviews);
