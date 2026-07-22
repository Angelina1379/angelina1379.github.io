let reviewIndex = 0;

function getVisibleReviews() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateReviewSlider() {

    const track = document.getElementById("reviewTrack");
    if (!track) return;

    const visible = getVisibleReviews();

    const gap = 25;

    const cardWidth = track.querySelector(".review-card").offsetWidth + gap;

    track.style.transform =
        `translateX(-${reviewIndex * cardWidth}px)`;

    document.getElementById("reviewPrev").disabled = reviewIndex === 0;

    document.getElementById("reviewNext").disabled =
        reviewIndex >= reviewCards.length - visible;

}

function nextReview() {

    const visible = getVisibleReviews();

    if (reviewIndex < reviewCards.length - visible) {

        reviewIndex++;

        updateReviewSlider();

    }

}

function prevReview() {

    if (reviewIndex > 0) {

        reviewIndex--;

        updateReviewSlider();

    }

}

function initReviewSlider() {

    reviewIndex = 0;

    document.getElementById("reviewPrev").onclick = prevReview;

    document.getElementById("reviewNext").onclick = nextReview;

    setTimeout(updateReviewSlider, 100);

}

window.addEventListener("resize", updateReviewSlider);



window.openReviewModal=function(review){

    const modal=document.getElementById("reviewModal");

    document.getElementById(
        "modalReviewName"
    ).textContent=review.name;


    document.getElementById(
        "modalReviewStars"
    ).innerHTML=
    "★".repeat(review.rating)+
    "☆".repeat(5-review.rating);


    document.getElementById(
        "modalReviewDate"
    ).textContent=
    new Date(review.date)
    .toLocaleDateString("ru-RU");


    document.getElementById(
        "modalReviewText"
    ).textContent=
    review.message;


    modal.classList.add("open");

}


window.closeReviewModal=function(){

    document
    .getElementById("reviewModal")
    .classList.remove("open");

}
