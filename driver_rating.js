document.addEventListener("DOMContentLoaded", () => {
    // Handle star rating functionality for multiple categories
    const ratingCategories = document.querySelectorAll('.rating-category');

    ratingCategories.forEach(category => {
        const stars = category.querySelectorAll('.star');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                highlightStars(stars, star.dataset.value);
            });

            star.addEventListener('mouseleave', () => {
                resetStars(stars);
                const selectedValue = category.dataset.selectedValue;
                if (selectedValue) {
                    highlightStars(stars, selectedValue);
                }
            });

            star.addEventListener('click', () => {
                category.dataset.selectedValue = star.dataset.value;
                highlightStars(stars, star.dataset.value);
            });
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

    // Fun feedback message after rating is submitted
    function displayFeedback() {
        const feedbackMessage = document.getElementById('feedback-message');
        feedbackMessage.textContent = "Thank you for your feedback! I’ll work on my charm and driving skills!";
        feedbackMessage.style.display = 'block';
    }

    // Easter egg: Clicking on the title triggers a surprise message
    document.getElementById('page-title').addEventListener('click', () => {
        alert("Surprise! You've found an Easter Egg! 👀");
    });

    // Interactive car following cursor
    const carIcon = document.getElementById('car-icon');
    document.addEventListener('mousemove', (e) => {
        carIcon.style.left = `${e.pageX}px`;
        carIcon.style.top = `${e.pageY}px`;
    });

    // Adding comment box functionality
    const commentBox = document.getElementById('comment-box');
    document.getElementById('submit-comment').addEventListener('click', () => {
        const comment = commentBox.value.trim();
        if (comment) {
            alert("Comment submitted: " + comment);
            commentBox.value = '';  // Clear the comment box
        } else {
            alert("Please enter a comment before submitting.");
        }
    });
});
