// Wait for DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("pbZkQxJOSeedyqYq5"); // Replace with your EmailJS user ID

    const starRatings = document.querySelectorAll(".rating-category");
    const commentBox = document.getElementById("comment");
    const submitButton = document.getElementById("submit-rating");

    if (!starRatings || !commentBox || !submitButton) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    // Loop through each rating section to add hover and click functionality
    starRatings.forEach((ratingSection) => {
        const stars = ratingSection.querySelectorAll(".star");

        stars.forEach((star, index) => {
            // Highlight stars on hover
            star.addEventListener("mouseover", function() {
                highlightStars(stars, index);
            });

            // Reset stars when mouse leaves
            star.addEventListener("mouseleave", function() {
                resetStars(stars, ratingSection);
            });

            // Set rating on click
            star.addEventListener("click", function() {
                setRating(stars, index + 1, ratingSection);
            });
        });
    });

    // Highlight stars up to the hovered one
    function highlightStars(stars, index) {
        stars.forEach((star, i) => {
            star.classList.toggle("highlighted", i <= index);
        });
    }

    // Reset stars to previously selected rating or to default if none selected
    function resetStars(stars, ratingSection) {
        const selectedRating = ratingSection.getAttribute("data-selected-rating");
        stars.forEach((star, i) => {
            star.classList.toggle("highlighted", i < selectedRating);
        });
    }

    // Set and display the selected rating
    function setRating(stars, rating, ratingSection) {
        ratingSection.setAttribute("data-selected-rating", rating);
        stars.forEach((star, i) => {
            star.classList.toggle("selected", i < rating);
        });
    }

    // Collect selected ratings for each category
    function getSelectedRatings() {
        const ratings = {};
        starRatings.forEach((section) => {
            const category = section.querySelector("h3").innerText;
            const rating = section.getAttribute("data-selected-rating") || "0";
            ratings[category] = rating;
        });
        return ratings;
    }

    // Handle form submission
    submitButton.addEventListener("click", function() {
        const selectedRatings = getSelectedRatings();
        const userComment = commentBox.value;

        // Check if all categories have been rated
        if (Object.values(selectedRatings).includes("0")) {
            alert("Please provide a rating for all categories.");
            return;
        }

        // Send email with ratings and comments using EmailJS
        emailjs.send("service_rwzse8w", "template_goneji6", {
            rating_chill: selectedRatings["Chill Factor"],
            rating_timeliness: selectedRatings["Timeliness"],
            rating_entertainment: selectedRatings["Overall Experience"],
            comments: userComment,
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

document.addEventListener("DOMContentLoaded", function() {
    // Magic 8-Ball Responses
    const responses = [
        "Absolutely!",
        "Try again later.",
        "I'm not sure, but it sounds fun!",
        "Definitely yes!",
        "Maybe ask me tomorrow?",
        "Only if you're lucky!",
        "Without a doubt!",
        "It's a secret!"
    ];

    // Magic 8-Ball feature
    const magic8BallButton = document.getElementById("magic-8-ball");
    const magicResponse = document.getElementById("magic-response");

    if (magic8BallButton) {
        magic8BallButton.addEventListener("click", function() {
            const randomIndex = Math.floor(Math.random() * responses.length);
            magicResponse.innerText = responses[randomIndex];
        });
    }

    // Ready to Roll feature
    const readyToRollButton = document.getElementById("ready-to-roll");
    const carIcon = document.getElementById("car-icon");

    if (readyToRollButton && carIcon) {
        readyToRollButton.addEventListener("click", function() {
            carIcon.classList.add("drive");
            setTimeout(() => {
                carIcon.classList.remove("drive");
            }, 3000); // Reset animation after 3 seconds
        });
    }
});
