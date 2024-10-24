document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll('.star');
    const feedbackMessage = document.getElementById('feedback-message');

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const category = star.parentElement.dataset.category;
            highlightStars(stars, star.dataset.value);
        });

        star.addEventListener('mouseleave', () => {
            resetStars(stars);
        });

        star.addEventListener('click', () => {
            selectStars(stars, star.dataset.value);
        });
    });

    document.getElementById('submit-rating').addEventListener('click', () => {
        displayFeedback();
    });

    function highlightStars(stars, value) {
        stars.forEach(s => {
            s.classList.remove('selected');
            if (s.dataset.value <= value) {
                s.classList.add('selected');
            }
        });
    }

    function resetStars(stars) {
        stars.forEach(star => {
            star.classList.remove('selected');
        });
    }

    function selectStars(stars, value) {
        stars.forEach(s => {
            s.classList.remove('selected');
            if (s.dataset.value <= value) {
                s.classList.add('selected');
            }
        });
    }

    function displayFeedback() {
        feedbackMessage.textContent = "Thank you for your feedback! I’ll work on my charm and driving skills!";
    }
});
