const priceRange = document.getElementById('priceRange');
      const selectedPrice = document.getElementById('selectedPrice');

      priceRange.addEventListener('input', function() {
        selectedPrice.textContent = `Выбрано: до ${this.value} ₽`;
      });

      const filterOptions = document.querySelectorAll('.filter-option');
      filterOptions.forEach(option => {
        option.addEventListener('click', function() {
          const optionsInGroup = this.parentElement.querySelectorAll('.filter-option');
          optionsInGroup.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
        });
      });

      document.querySelector('.apply-filters').addEventListener('click', function() {
        alert('Фильтры применены!');
      });

      function toggleMenu() {
        const nav = document.getElementById('navMenu');
        nav.classList.toggle('show');
    };


    // Хранение отзывов в localStorage
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Инициализация звезд рейтинга
let currentRating = 0;

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.dataset.rating);
        
        // Подсветка выбранных звезд
        document.querySelectorAll('.star').forEach((s, index) => {
            if (index < currentRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// Обработка формы
document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    if (!namecurrentRating === 0) {
        alert('Пожалуйста, заполните все поля и выберите оценку');
        return;
    }
    
    const review = {
        id: Date.now(),
        name: name,
        message: message,
        rating: currentRating,
        date: new Date().toLocaleDateString()
    };
    
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Очистка формы
    this.reset();
    currentRating = 0;
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
    
    displayReviews();
});

// Отображение отзывов
function displayReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            <div class="review-message">${review.message}</div>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// Загрузка отзывов при загрузке страницы
document.addEventListener('DOMContentLoaded', displayReviews);

function filterReviews(minRating) {
    const filtered = reviews.filter(review => review.rating >= minRating);
    displayFilteredReviews(filtered);
};

function validateReview(message) {
    // Проверка на запрещенные слова
    const forbiddenWords = ['спам', 'реклама', 'мат'];
    return !forbiddenWords.some(word => message.toLowerCase().includes(word));
}