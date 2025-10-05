document.addEventListener("DOMContentLoaded", () => {
  // === ТУРЫ ===
  const tours = [ /* ... твой массив туров ... */ ];

  const modal = document.getElementById("tourModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const carouselInner = document.getElementById("carousel-inner");
  const carouselIndicators = document.getElementById("carousel-indicators");
  const whatsappLink = document.getElementById("whatsapp-link");
  let currentSlide = 0, autoSlide;

  // === ОТКРЫТИЕ МОДАЛКИ ТУРА ===
  window.showDetails = (index) => {
    const tour = tours[index];
    modalTitle.textContent = tour.title;
    whatsappLink.href = tour.whatsapp;
    modalDescription.innerHTML = "";

    tour.description.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      modalDescription.appendChild(p);
    });

    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    tour.images.forEach((src, i) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${i === 0 ? "active" : ""}`;
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Фото ${i + 1}`;
      img.onerror = function() { this.src = 'image/placeholder.jpg'; };
      item.appendChild(img);
      carouselInner.appendChild(item);

      const dot = document.createElement("span");
      dot.className = `dot ${i === 0 ? "active" : ""}`;
      dot.onclick = () => showSlide(i);
      carouselIndicators.appendChild(dot);
    });

    currentSlide = 0;
    modal.style.display = "flex";
    startAuto();
  };

  window.closeModal = () => {
    modal.style.display = "none";
    stopAuto();
  };

  // === СЛАЙДЕР ===
  function showSlide(index) {
    const items = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".dot");
    if (index >= items.length) index = 0;
    if (index < 0) index = items.length - 1;
    items.forEach((el, i) => el.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    currentSlide = index;
  }

  window.nextSlide = () => showSlide(currentSlide + 1);
  window.prevSlide = () => showSlide(currentSlide - 1);

  function startAuto() { autoSlide = setInterval(() => showSlide(currentSlide + 1), 4000); }
  function stopAuto() { clearInterval(autoSlide); }

  // === МОДАЛКА ОТЗЫВОВ ===
  window.openReviewModal = function(name, stars, date, text, imgSrc) {
    document.getElementById("modalReviewName").textContent = name;
    document.getElementById("modalReviewStars").textContent = stars;
    document.getElementById("modalReviewDate").textContent = date;
    document.getElementById("modalReviewText").textContent = text;

    // Если есть картинка отзыва (например, в будущем)
    if (imgSrc) {
      const img = document.getElementById("modalReviewImage");
      if (img) {
        img.src = imgSrc;
        img.style.display = "block";
      }
    }

    document.getElementById("reviewModal").style.display = "flex";
  };

  window.closeReviewModal = function() {
    document.getElementById("reviewModal").style.display = "none";
  };

  // === КЛИК ВНЕ МОДАЛК ===
  window.onclick = function(e) {
    if (e.target === modal) closeModal();
    if (e.target === document.getElementById("reviewModal")) closeReviewModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.style.display === "flex") closeModal();
      if (document.getElementById("reviewModal").style.display === "flex") closeReviewModal();
    }
  });

  // === АНИМАЦИЯ "ПОЧЕМУ ВЫБИРАЮТ НАС" ===
  const items = document.querySelectorAll(".why-us li");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });
  items.forEach(i => obs.observe(i));
});

// === БУРГЕР ===
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}
