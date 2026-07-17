document.addEventListener("DOMContentLoaded", () => {

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

let reviews = [];

function getAvatar(name) {
    const emojis = [
        "🐻","🦎","🦋","🐱","🐶","🐰","🦊","🐼",
        "🐨","🐮","🐷","🐸","🐵","🐔","🐧","🐦",
        "🐤","🦄","🐴","🦉","🐳","🐬","🦁","🐯"
    ];
    return emojis[name.length % emojis.length];
}

function formatDate(dateStr){
    return new Date(dateStr).toLocaleDateString("ru-RU");
}

async function loadReviews(){

    const snap = await db
        .collection("reviews")
        .orderBy("date","desc")
        .limit(5)
        .get();

    reviews = [];

    snap.forEach(doc=>{
        reviews.push({
            id: doc.id,
            ...doc.data()
        });
    });

    renderReviews();
}

function renderReviews(){

    const slider = document.getElementById("reviewSlider");

    if(!slider) return;

    slider.innerHTML="";

    if(reviews.length===0){
        slider.innerHTML="<p>Пока нет отзывов.</p>";
        return;
    }

    reviews.forEach((r,index)=>{

        const stars="★".repeat(r.rating)+"☆".repeat(5-r.rating);

        const text=r.message || "";

        const short=text.length>120
            ? text.substring(0,120)+"..."
            : text;

        const card=document.createElement("div");

        card.className="review-card reveal";

        card.style.animationDelay=`${index*0.1}s`;

        card.innerHTML=`
            <div class="review-header">
                <div class="review-avatar">${getAvatar(r.name)}</div>

                <div class="review-meta">
                    <div class="review-name">${r.name}</div>
                    <div class="review-date">${formatDate(r.date)}</div>
                </div>
            </div>

            <div class="review-stars">${stars}</div>

            <p class="review-text">${short}</p>

            ${
            text.length>120
            ? `<button class="review-more-btn"
               onclick="openReviewModal('${r.name.replace(/'/g,"\\'")}','${stars}','${formatDate(r.date)}',\`${text.replace(/`/g,"\\`")}\`)">
               Читать полностью →
               </button>`
            : ""
            }
        `;

        slider.appendChild(card);

    });

    setTimeout(()=>{
        document.querySelectorAll(".review-card").forEach(c=>{
            c.classList.add("show");
        });
    },100);

}

loadReviews();
  
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
initReveal();

// Загружаем последние 5 отзывов из Firebase
loadReviews();
  
});
