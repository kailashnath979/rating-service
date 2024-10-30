// Wait for DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("pbZkQxJOSeedyqYq5");

    const starRatings = document.querySelectorAll(".rating-category");
    const comments = document.querySelector("#comment");
    const submitButton = document.querySelector("#submit-rating");
    const quirkyMessage = document.querySelector("#quirky-message");
    const carIcon = document.getElementById("car-icon"); // Assuming you have the car icon in your HTML

    if (!starRatings || !comments || !submitButton || !quirkyMessage) {
        console.error("Required elements not found in the DOM.");
        return;
    }

    // Array of quirky messages
    const quirkyMessages = [
        "Sending your thoughts...",
        "Your feedback is zooming away! 🚀",
        "Hold tight, your comments are on their way! 🏎️",
        "Packing your thoughts for delivery! 📦",
        "Your insights are taking a joyride! 🎢",
        "Buckle up! Your feedback is hitting the road! 🚙",
        "Your ratings are racing to their destination! 🏁",
        "Hang on! We’re sending your feedback off! 📡",
        "Your thoughts are in the fast lane! 🛣️",
        "Sending your feedback with a sprinkle of magic! ✨"
    ];

    // Loop through each rating section
    starRatings.forEach((ratingSection) => {
        const stars = ratingSection.querySelectorAll(".star");

        if (stars.length === 0) {
            console.error("No stars found in rating section.");
            return;
        }

        // Add event listeners for hover and click
        stars.forEach((star, index) => {
            // Handle hover effect
            star.addEventListener("mouseover", function() {
                highlightStars(stars, index);
            });

            // Reset stars when mouse leaves
            star.addEventListener("mouseleave", function() {
                resetStars(stars);
            });

            // Handle click to set rating
            star.addEventListener("click", function() {
                setRating(stars, index + 1, ratingSection);
            });
        });
    });

    // Function to highlight stars up to the hovered one
    function highlightStars(stars, index) {
        stars.forEach((star, i) => {
            star.classList.toggle("highlighted", i <= index);
        });
    }

    // Function to reset star highlights
    function resetStars(stars) {
        stars.forEach((star) => {
            star.classList.remove("highlighted");
        });
    }

    // Function to set and display the selected rating
    function setRating(stars, rating, ratingSection) {
        ratingSection.setAttribute("data-selected-rating", rating);
        stars.forEach((star, i) => {
            star.classList.toggle("selected", i < rating);
        });
    }

    // Collect all selected ratings for each category
    function getSelectedRatings() {
        const ratings = {};
        starRatings.forEach((section) => {
            const category = section.querySelector("h3").textContent;
            const rating = section.getAttribute("data-selected-rating") || "0";
            ratings[category] = rating;
        });
        return ratings;
    }

    // Handle form submission
    submitButton.addEventListener("click", function() {
        const selectedRatings = getSelectedRatings();
        const userComment = comments.value;

        // Check if all categories have been rated
        if (Object.values(selectedRatings).includes("0")) {
            alert("Please provide a rating for all categories.");
            return;
        }

        // Display random quirky message
        quirkyMessage.textContent = getRandomQuirkyMessage();
        moveCarIcon();

        // Send email with ratings and comments using EmailJS
        emailjs.send("service_rwzse8w", "template_goneji6", {
            rating_chill: selectedRatings["Chill Factor"],
            rating_timeliness: selectedRatings["Timeliness"],
            rating_experience: selectedRatings["Overall Experience"],
            comments: userComment,
        }).then(
            function(response) {
                quirkyMessage.textContent = "Your feedback has been sent! 🎉";
            },
            function(error) {
                alert("Failed to send feedback. Please try again.");
                quirkyMessage.textContent = "Oops! Something went wrong. 😬";
            }
        );
    });

    function moveCarIcon() {
        carIcon.style.visibility = 'visible';
        carIcon.style.transition = "transform 2s";
        carIcon.style.transform = "translateX(300px)"; // Adjust the distance as needed

        setTimeout(() => {
            carIcon.style.transform = "translateX(0)";
            carIcon.style.visibility = 'hidden';
        }, 2000); // Adjust duration as needed
    }

    // Function to get a random quirky message
    function getRandomQuirkyMessage() {
        const randomIndex = Math.floor(Math.random() * quirkyMessages.length);
        return quirkyMessages[randomIndex];
    }
});
