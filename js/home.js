
  document.addEventListener("DOMContentLoaded", () => {
  const tours = [
    {
      title: "Куршская коса + Зеленоградск",
      description: [
        "На узкой полосе суши между соленой Балтикой и пресноводным Куршским заливом расположился настоящий “туристический магнит” Калининградской области — уникальный нацпарк «Куршская коса», причем его угодья с севера граничат с Литовской Республикой.",
        "Аутентичности местным пейзажам придает тот факт, что весь национальный парк, по сути, представляет собой крупнейшую песчаную пересыпь на планете. Старейший из российских нацпарков протянулся почти на 100 км от Зеленоградска до литовской Клайпеды, при этом ширина заповедной территории не превышает 4 км — всё очень компактно, максимально живописно и неповторимо!",
        "Ценители необыкновенных природных панорам особенно отмечают здешние дюнные ландшафты, которые вкупе с вековыми древесными гигантами и богатейшей локальной фауной превращают просторы Куршской косы в знаковый объект для очень актуального в наши дни экотуризма. Скучать в таком природном оазисе не придется никому, тем более что для юных туристов подготовлены увлекательные загадки и мастер-классы.",
        "Обратная дорога пройдет через курортный Зеленоградск (бывший прусский Кранц), впечатляющий старинной архитектурой, неспешностью и атмосферой -  первый Куршская коса (4-5 часа)",
        "Сегодня большая часть российской части косы — национальный парк. Начнём экскурсию  с Визит центра, где я познакомлю Вас с периодом образования Косы, ее заселением, почему она называется Куршская. Потом мы посетим Орнитологическую станцию, Танцующий Лес, Живописные дюны высоты Эфа. Можно пройти все маршруты, можно выбрать по желанию. И также можно искупаться и насладиться песчанными пляжами, и отведать свежий улов в аутентичных кафе.",
        "•  Королевский бор: Встречает посетителей в начале косы, предлагая прогулку по живописному сосновому лесу с вековыми деревьями и богатым подлеском.",
        "•  Визит-центр 'Куршская коса': Информационный центр, где можно узнать об истории, природе и культуре косы, а также получить карту и рекомендации для дальнейшего путешествия.",
        "•  Орнитологическая станция 'Фрингилла': Место изучения миграции птиц, где можно увидеть процесс кольцевания и узнать интересные факты о пернатых обитателях косы.",
        "•  Озеро Чайка и высота Мюллера: Маршрут ведет к живописному озеру, где обитают чайки, и к дюне Мюллера, откуда открывается прекрасный вид на окрестности.",
        "•  Танцующий лес: Уникальный участок соснового леса с искривленными деревьями, причина аномалии до сих пор вызывает споры и привлекает туристов.",
        "•  Высота Эфа: Одна из самых высоких дюн косы, откуда открывается захватывающий панорамный вид на море, залив и окружающие ландшафты.",
        "•  Озеро Лебедь: Небольшое озеро, известное как место обитания лебедей, предлагающее спокойную и живописную атмосферу для наблюдения за птицами.",
        "Зеленоградск (1 час)",
        "Пляжный курорт на побережье Балтийского моря, в 35 км от Калининграда. До 1946 года город принадлежал Пруссии и назывался Кранц. Ещё в начале XIX столетия немцы поняли, что морской воздух и вода полезны для здоровья, организовав здесь курорт."
      ],
      images: Array(28).fill().map((_, i) => `image/kurshskaya${i+1}.jpg`),
      whatsapp: "https://wa.me/79052484096?text=Хочу%20на%20тур%20Куршская%20коса"
    },
    {
      title: "Обзорная экскурсия по Калининграду",
      description: [
        "Предлагаю начать наше знакомство с Калининградом с увлекательной обзорной экскурсии. Она откроет перед вами богатую и многослойную историю города, познакомит с его уникальной архитектурой и главными достопримечательностями.",
        "Мы пройдемся по историческому центру, заглянем на остров Канта, где возвышается Кафедральный собор — архитектурная жемчужина с самым большим органом в России. Обязательно посетим живописную Рыбную деревню — любимое место гостей города с уютными кафе, ресторанами, гостиницами и сувенирными лавками.",
        "Я также покажу вам знаменитое оборонительное кольцо Кёнигсберга XIX века, расскажу о его военной истории и тайнах. Не обойдем стороной и современный центр города — Площадь Победы с её динамичной атмосферой.",
        "В завершение экскурсии мы отправимся в самые колоритные и атмосферные районы Калининграда — Амалиенау и Марауненхоф. Здесь, среди тенистых аллей и старинных особняков, вы почувствуете дух старой Европы.", 
        "Экскурсия комбинированная — часть маршрута проходит пешком, часть на автомобиле, продолжительность около 4 часов. По пути — приятные остановки: музей марципана, сказочный Домик хомлинов и необычный музей открыток, откуда можно отправить послание родным прямо из сердца Калининграда.",
        "По вашему желанию маршрут можно дополнить посещением одного из старинных фортов, прогулкой на катере или концертом органной музыки в Кафедральном соборе.",
      ],
      images: Array(20).fill().map((_, i) => `image/obzornaya${i+1}.jpg`),
      whatsapp: "https://wa.me/79052484096?text=Хочу%20на%20обзорную%20экскурсию"
    },
    {
      title: "Все красоты области за 3 дня",
      description: [ 
        "Если у вас есть пара-тройка свободных дней в Калининграде, этот тур по выгодной цене идеально подойдет для знакомства с городом и курортами Янтарного побережья.",
        "1 день",
        "В первый день проведу вас по знаковым локациям Калининграда. За 3-4 часа вы узнаете основные вехи становления Кёнигсберга и посетите его главные туристические места: башню Врангеля, Бранденбургские ворота, Драматический театр, Кафедральный собор, Кёнигсбергский замок, кирху королевы Луизы, Медовый мост, Музей янтаря, Остров Канта и Рыбную деревню.",
        "2 день",
        "Второй день проведем на Янтарном побережье. Нас ждут красоты Светлогорска и Янтарного (можно заменить визитом в Балтийск). Обязательно полюбуемся морем и посетим пляж, отмеченный за комфорт и идеальную чистоту Голубым флагом, восхитимся неповторимой архитектурой курортных городков, испытаем удачу в поисках янтаря и по желанию поучаствуем в мастер-классах по обработке солнечного камня!",
        "3 день",
        "В третий день побываем в Зеленоградске и увидим объект всемирного наследия ЮНЕСКО — Куршскую косу.",
        "Тратить слова на описание этого природного шедевра бессмысленно, нужно просто посетить это волшебное место и узнать:",
        "-как появилось это неповторимое чудо природы;",
        "-почему гиганты-деревья в лесу пустились в пляс;",
        "-кто спас косу от песчаной катастрофы;",
        "-кто подарил имя Куршской косе;",
        "-что такое «голубь Куршской косы» и с чем его едят?",
        "После этого мы заедем в город кошек — Зеленоградск, посетим древний замок Шаакен и сыроварню.",
        "По окончании 3-дневного тура по Калининграду и области у вас будет масса положительных эмоций, оригинальных фотографий, янтарных сувениров и рыбно-марципановых вкусняшек!",
        "Город Калининград (4 часа)",
        "Обзорная экскурсия по Калининграду. Увидим башню Врангеля, Бранденбургские ворота, Драматический театр, Кафедральный собор, Кёнигсбергский замок, кирху королевы Луизы, Медовый мост, Музей янтаря, Остров Канта и Рыбную деревню.",
        "Янтарное побережье (6 часов)",
        "Побываем в Светлогорске и Янтарном (можно заменить/ добавить Балтийск).",
        "Куршская коса (6 часов)",
        "Посетим Куршскую косу, место непередаваемой красоты и истории, заедем в город кошек — Зеленоградск, посетим древний замок Шаакен и сыроварню."
      ],
      images: Array(18).fill().map((_, i) => `image/3days${i+1}.jpg`),
      whatsapp: "https://wa.me/79052484096?text=Хочу%20на%203-дневный%20тур"
    }
  ];

  const modal = document.getElementById("tourModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const carouselInner = document.getElementById("carousel-inner");
  const carouselIndicators = document.getElementById("carousel-indicators");
  const whatsappLink = document.getElementById("whatsapp-link");
  let currentSlide = 0, autoSlide;

  // ===== ОБРАБОТКА URL ДЛЯ ССЫЛОК =====
  function openTourBySlug(slug) {
    const slugToIndex = {
      'kurshskaya-kosa-zelenogradsk': 0,
      'obzornaya-ekskursiya': 1,
      'vse-krasoty-za-3-dnya': 2
    };
    
    const index = slugToIndex[slug];
    if (index !== undefined) {
      showDetails(index);
    }
  }

  // === ОТКРЫТИЕ МОДАЛКИ ТУРА ===
  window.showDetails = (index) => {
    const tour = tours[index];
    
    // БЛОКИРУЕМ ПРОКРУТКУ СТРАНИЦЫ
    document.body.classList.add('modal-open');
    document.documentElement.style.overflow = 'hidden';
    
    // ОБНОВЛЯЕМ URL С ЧЕЛОВЕКО-ПОНЯТНЫМ ЯКОРЕМ
    const indexToSlug = {
      0: 'kurshskaya-kosa-zelenogradsk',
      1: 'obzornaya-ekskursiya', 
      2: 'vse-krasoty-za-3-dnya'
    };
    
    const slug = indexToSlug[index];
    if (slug) {
      history.pushState(null, null, `#${slug}`);
    }

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
    
    // РАЗБЛОКИРУЕМ ПРОКРУТКУ СТРАНИЦЫ
    document.body.classList.remove('modal-open');
    document.documentElement.style.overflow = '';
    
    // ВОССТАНАВЛИВАЕМ ОРИГИНАЛЬНЫЙ URL БЕЗ ЯКОРЯ
    history.pushState(null, null, window.location.pathname);
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

  // === ОБРАБОТКА ЗАГРУЗКИ СТРАНИЦЫ С ЯКОРЕМ ===
  const hash = window.location.hash;
  if (hash) {
    const slug = hash.replace('#', '');
    openTourBySlug(slug);
  }

  // === ОБРАБОТКА ИЗМЕНЕНИЯ URL ===
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (!hash) {
      closeModal();
    } else {
      const slug = hash.replace('#', '');
      openTourBySlug(slug);
    }
  });
});

// === БУРГЕР ===
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}
