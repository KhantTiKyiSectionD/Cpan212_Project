const reviews = [
  {
    text: "The atmosphere at Boho Barkada Bistro is truly captivating. It's a perfect blend of creativity, warmth, and camaraderie.",
    author: "John Doe",
    title: "Food Critic, Foodie Magazine",
    image: "path/to/image.jpg", // replace with actual path
    rating: 5,
    logo: "path/to/logo.png", // replace with actual path
  },
  // Add more reviews as needed
];

document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.getElementById("carouselInner");

  reviews.forEach((review, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item${index === 0 ? " active" : ""}`;

    const stars = Array(review.rating).fill("★").join("");

    carouselItem.innerHTML = `
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <div class="stars">${stars}</div>
              <p class="review-text">${review.text}</p>
              <div class="review-author">
                <img src="${review.image}" alt="${review.author}" class="rounded-circle" width="50" height="50">
                <div>
                  <strong>${review.author}</strong><br>
                  ${review.title}
                </div>
              </div>
              <img src="${review.logo}" alt="Logo" class="review-logo" width="100">
            </div>
          </div>
        </div>
      `;

    carouselInner.appendChild(carouselItem);
  });
});
