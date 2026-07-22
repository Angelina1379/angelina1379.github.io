



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
