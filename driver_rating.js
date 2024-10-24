document.addEventListener('DOMContentLoaded', () => {
    const starRating = document.querySelectorAll('#starRating .star');
    const ratingMessage = document.getElementById('ratingMessage');
    let overallRating = 0;

    starRating.forEach(star => {
        star.addEventListener('click', () => {
            overallRating = star.getAttribute('data-value');
            ratingMessage.innerText = `You rated me ${overallRating} star(s)!`;
            highlightStars(starRating, overallRating);
        });
    });

    document.getElementById('submitRating').addEventListener('click', () => {
        if (overallRating === 0) {
            alert("Please select an overall rating before submitting!");
            return;
        }
        document.querySelector('.rating-section').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';
    });

    function highlightStars(stars, rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('highlight');
            } else {
                star.classList.remove('highlight');
            }
        });
    }

    // Category Ratings
    const categoryRatings = ['humor', 'comfort', 'timeliness'];
    categoryRatings.forEach(category => {
        const stars = document.querySelector(`#${category}Rating .star`);
        stars.forEach(star => {
            star.addEventListener('click', () => {
                highlightStars(document.querySelectorAll(`#${category}Rating .star`), star.getAttribute('data-value'));
            });
        });
    });
});
