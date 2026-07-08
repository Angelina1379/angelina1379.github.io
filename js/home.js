document.addEventListener("DOMContentLoaded", () => {
  
  /* ============================================================
     СИСТЕМА ОТЗЫВОВ — ПОКАЗЫВАЕМ ТОЛЬКО ПОСЛЕДНИЕ
     ============================================================ */
  
  const MAX_REVIEWS = 5; // сколько последних отзывов показывать
  const STORAGE_KEY = 'reviews_data';
  
  // Начальные отзывы (если в localStorage пусто)
  const defaultReviews = [
    {
      id: Date.now() - 300000,
      name: "Елена Савкина",
      avatar: "🐻",
      stars: 5,
      date: "2024-11-17",
      dateLabel: "17 нояб. 2024",
      text: "Калининград с Ириной. Отличный гид! Ездили по Калининграду — Ирина рассказала много интересной информации, что на следующий день решили с ней же поехать уже на Куршскую косу и в Светлогорск. Нам всем очень понравилось (группа 4 человека), так что советую обращаться к Ирине за проведением экскурсий."
    },
    {
      id: Date.now() - 200000,
      name: "Татьяна Макова",
      avatar: "🦎",
      stars: 5,
      date: "2025-01-05",
      dateLabel: "05 янв. 2025",
      text: "Не особо люблю писать отзывы, обычно просто благодарю достойных людей, которые ответственно относятся к своей работе, могут подстраиваться под различные нюансы и желания своих клиентов! Ирина настолько заинтересовала рассказами, что решили еще раз весной вернуться!!! Спасибо ей огромное!"
    },
    {
      id: Date.now() - 100000,
      name: "Марина Волкова",
      avatar: "🦋",
      stars: 5,
      date: "2025-01-05",
      dateLabel: "05 янв. 2025",
      text: "Были на экскурсии с Ириной — великолепно! Очень интересные истории, приятная атмосфера и чудесные маршруты. Обязательно приедем снова и попробуем другие туры!"
    },
    {
      id: Date.now() - 50000,
      name: "Алексей Иванов",
      avatar: "🐱",
      stars: 5,
      date: "2025-01-10",
      dateLabel: "10 янв. 2025",
      text: "Прекрасная организация экскурсии на Куршскую косу! Гид Ирина профессионал своего дела, знает множество интересных фактов. Отдельное спасибо за комфортный автомобиль и внимание к деталям. Рекомендую!"
    }
  ];
  
  // Загружаем отзывы из localStorage или используем начальные
  function loadReviewsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.warn('Ошибка загрузки отзывов из localStorage');
      }
    }
    return defaultReviews;
  }
  
  // Сохраняем отзывы в localStorage
  function saveReviewsToStorage(reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }
  
  // Получаем текущий список отзывов
  let reviews = loadReviewsFromStorage();
  
  // Функция для генерации аватарки по имени
  function getAvatar(name) {
    const emojis = ['🐻', '🦎', '🦋', '🐱', '🐶', '🐰', '🦊', '🐼', '🐨', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄', '🐴', '🦋', '🦉', '🐳', '🐬', '🦁', '🐯'];
    const index = name.length % emojis.length;
    return emojis[index];
  }
  
  // Форматирование даты
  function formatDate(dateStr) {
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  // ГЛАВНАЯ ФУНКЦИЯ: рендерим только последние отзывы (от новых к старым)
  function renderReviews() {
    const slider = document.getElementById("reviewSlider");
    if (!slider) return;
    
    // СОРТИРУЕМ ПО ДАТЕ (от новых к старым)
    const sorted = [...reviews].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    
    // БЕРЕМ ТОЛЬКО ПОСЛЕДНИЕ MAX_REVIEWS
    const visible = sorted.slice(0, MAX_REVIEWS);
    
    // Если отзывов нет — показываем сообщение
    if (visible.length === 0) {
      slider.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: #f9f9f9; border-radius: 16px;">
          <p style="color: #999; font-size: 18px;">Пока нет отзывов. Будьте первым! 🌟</p>
        </div>
      `;
      return;
    }
    
    slider.innerHTML = "";
    
    visible.forEach((r, index) => {
      const starsStr = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
      const isLong = r.text.length > 120;
      const short = isLong ? r.text.slice(0, 120).trim() + "..." : r.text;
      
      const card = document.createElement("div");
      card.className = `review-card reveal`;
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.innerHTML = `
        <div class="review-header">
          <div class="review-avatar">${r.avatar || getAvatar(r.name)}</div>
          <div class="review-meta">
            <div class="review-name">${r.name}</div>
            <div class="review-date">${r.dateLabel || formatDate(r.date)}</div>
          </div>
        </div>
        <div class="review-stars">${starsStr}</div>
        <p class="review-text">${short}</p>
        ${isLong ? `<button class="review-more-btn" onclick="openReviewModal('${r.name.replace(/'/g, "\\'")}', '${starsStr}', '${r.dateLabel || formatDate(r.date)}', \`${r.text.replace(/`/g, '\\`')}\`)">Читать полностью →</button>` : ''}
      `;
      
      slider.appendChild(card);
    });
    
    // Запускаем анимацию появления
    setTimeout(() => {
      document.querySelectorAll('.review-card.reveal').forEach((el) => {
        el.classList.add('show');
      });
    }, 100);
  }
  
  // ДОБАВЛЕНИЕ НОВОГО ОТЗЫВА
  function addReview(name, stars, text) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // ГГГГ-ММ-ДД
    
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      avatar: getAvatar(name),
      stars: stars,
      date: dateStr,
      dateLabel: formatDate(dateStr),
      text: text.trim()
    };
    
    // Добавляем в массив (в начало, чтобы был самым свежим)
    reviews.unshift(newReview);
    
    // Сохраняем в localStorage
    saveReviewsToStorage(reviews);
    
    // Перерисовываем отзывы (показываем только последние)
    renderReviews();
  }
  
  /* ============================================================
     МОДАЛКА ОТЗЫВА (полный текст)
     ============================================================ */
  window.openReviewModal = function(name, stars, date, text) {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;
    
    document.getElementById("modalReviewName").textContent = name;
    document.getElementById("modalReviewStars").textContent = stars;
    document.getElementById("modalReviewDate").textContent = date;
    document.getElementById("modalReviewText").textContent = text;
    
    modal.classList.add("open");
    document.body.style.overflow = 'hidden';
  };
  
  window.closeReviewModal = function() {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = '';
  };
  
  // Закрытие модалки по клику вне окна
  document.addEventListener('click', (e) => {
    const modal = document.getElementById("reviewModal");
    if (modal && e.target === modal) {
      closeReviewModal();
    }
  });
  
  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById("reviewModal");
      if (modal && modal.classList.contains("open")) {
        closeReviewModal();
      }
    }
  });
  
  /* ============================================================
     ФОРМА ДОБАВЛЕНИЯ ОТЗЫВА (можно добавить на страницу отзывов)
     ============================================================ */
  // Проверяем, есть ли форма на странице
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    const starsSelect = document.getElementById('starsSelect');
    const ratingInput = document.getElementById('reviewRating');
    
    if (starsSelect) {
      // Выбор звёзд
      starsSelect.querySelectorAll('span').forEach(star => {
        star.addEventListener('click', function() {
          const value = parseInt(this.dataset.value);
          ratingInput.value = value;
          
          starsSelect.querySelectorAll('span').forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.value) <= value);
            s.style.color = parseInt(s.dataset.value) <= value ? '#ffb547' : '#ddd';
          });
        });
        
        star.addEventListener('mouseenter', function() {
          const value = parseInt(this.dataset.value);
          starsSelect.querySelectorAll('span').forEach(s => {
            s.style.color = parseInt(s.dataset.value) <= value ? '#ffb547' : '#ddd';
          });
        });
        
        star.addEventListener('mouseleave', function() {
          const current = parseInt(ratingInput.value);
          starsSelect.querySelectorAll('span').forEach(s => {
            s.style.color = parseInt(s.dataset.value) <= current ? '#ffb547' : '#ddd';
          });
        });
      });
      
      // Инициализация
      const initialRating = parseInt(ratingInput.value) || 5;
      starsSelect.querySelectorAll('span').forEach(s => {
        const val = parseInt(s.dataset.value);
        s.classList.toggle('active', val <= initialRating);
        s.style.color = val <= initialRating ? '#ffb547' : '#ddd';
      });
    }
    
    // Отправка формы
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('reviewName')?.value.trim();
      const rating = parseInt(ratingInput?.value || 5);
      const text = document.getElementById('reviewText')?.value.trim();
      
      if (!name || !text) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      if (text.length < 10) {
        alert('Отзыв должен содержать хотя бы 10 символов');
        return;
      }
      
      addReview(name, rating, text);
      
      reviewForm.reset();
      if (ratingInput) ratingInput.value = 5;
      
      // Сбрасываем звёзды
      if (starsSelect) {
        starsSelect.querySelectorAll('span').forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= 5);
          s.style.color = parseInt(s.dataset.value) <= 5 ? '#ffb547' : '#ddd';
        });
      }
      
      alert('Спасибо за ваш отзыв! ❤️');
    });
  }
  
  /* ============================================================
     ОСТАЛЬНЫЕ ФУНКЦИИ (туры, бургер, cookie и т.д.)
     ============================================================ */
  
  // Бургер-меню
  window.toggleMenu = function() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("show");
  };
  
  // Открытие модалки тура
  window.showDetails = function(index) {
    const modal = document.getElementById("tourModal");
    if (!modal) return;
    
    const tours = [
      {
        title: "Куршская коса + Зеленоградск",
        description: [
          "На узкой полосе суши между соленой Балтикой и пресноводным Куршским заливом расположился настоящий “туристический магнит” Калининградской области — уникальный нацпарк «Куршская коса».",
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
  
  // Слайдер
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
  
  // Закрытие модалок по клику вне
  document.addEventListener('click', (e) => {
    const tourModal = document.getElementById("tourModal");
    if (tourModal && e.target === tourModal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const tourModal = document.getElementById("tourModal");
      if (tourModal && tourModal.classList.contains("open")) {
        closeModal();
      }
    }
  });
  
  // Cookie-согласие
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner && document.cookie.indexOf("cookieConsent=1") === -1) {
    cookieBanner.classList.add("show");
  }
  
  window.acceptCookies = function() {
    document.cookie = "cookieConsent=1; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.classList.remove("show");
  };
  
  // Scroll-reveal
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
  }
  
  // ИНИЦИАЛИЗАЦИЯ
  renderReviews();
  initReveal();
  
});
