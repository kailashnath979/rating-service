document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("pbZkQxJOSeedyqYq5");

    const ratingSections = document.querySelectorAll(".rating-category");
    const commentBox = document.querySelector("#comment");
    const submitButton = document.querySelector("#submit-rating");

    // Star rating functionality
    ratingSections.forEach(section => {
        const stars = section.querySelectorAll(".star");
        const category = section.dataset.category;

        stars.forEach(star => {
            // Highlight stars on hover
            star.addEventListener("mouseover", () => highlightStars(stars, star.dataset.value));
            star.addEventListener("mouseleave", () => resetStars(stars, section));

            // Set rating on click
            star.addEventListener("click", () => {
                section.setAttribute("data-selected-rating", star.dataset.value);
                updateSelectedStars(stars, star.dataset.value);
            });
        });
    });

    function highlightStars(stars, value) {
        stars.forEach(star => {
            star.classList.toggle("highlighted", star.dataset.value <= value);
        });
    }

    function resetStars(stars, section) {
        const selectedRating = section.getAttribute("data-selected-rating");
        stars.forEach(star => {
            star.classList.toggle("highlighted", star.dataset.value <= selectedRating);
        });
    }

    function updateSelectedStars(stars, value) {
        stars.forEach(star => {
            star.classList.toggle("selected", star.dataset.value <= value);
        });
    }

    submitButton.addEventListener("click", function() {
        const ratings = {};
        ratingSections.forEach(section => {
            const category = section.dataset.category;
            const rating = section.getAttribute("data-selected-rating") || "0";
            ratings[category] = rating;
        });
        const comment = commentBox.value;

        if (Object.values(ratings).includes("0")) {
            alert("Please provide a rating for all categories.");
            return;
        }

        emailjs.send("service_rwzse8w", "template_goneji6", {
            rating_chill: ratings["chill"],
            rating_timeliness: ratings["timeliness"],
            rating_entertainment: ratings["entertainment"],
            comments: comment,
        }).then(
            function(response) {
                alert("Thank you for your feedback!");
            },
            function(error) {
                alert("Failed to send feedback. Please try again.");
            }
        );
    });
});
