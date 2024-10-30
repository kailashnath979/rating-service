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
    "Thanks for your feedback! 🌟✨ Your thoughts are like confetti—spreading joy all around!",
    "Your message just floated in like a balloon! 🎈💌 It’s on its way to brighten my day!",
    "Thanks for sharing! 📨🌈 Your input is like a sprinkle of magic in my inbox!",
    "Your feedback is a high-five in my heart! 🙌💖 It’s sure to spark some smiles!",
    "I appreciate your thoughts! 🌼💌 They’re like sunshine, making everything brighter!",
    "Your feedback just danced into my inbox! 💃📬 Ready to groove into something awesome!",
    "Thanks for the message! 🎉📝 It’s like a treasure map, guiding me to new adventures!",
    "Your thoughts just did a happy jig! 💃✨ They’re here to add some sparkle to my day!",
    "Thanks for your input! 💌🌟 It’s like a surprise gift—wrapped in awesomeness!",
    "Your feedback just arrived like a shooting star! 🌠💌 I’ll make a wish to keep shining brighter!"
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
            rating_like: selectedRatings["How Much Do You Like Me?"], // New category
            rating_date: selectedRatings["How Likely Would You Go on Another Date with Me?"], // New category
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
        if (carIcon) {
            carIcon.style.visibility = 'visible';
            carIcon.style.transition = "transform 1s ease-in-out";
            carIcon.style.transform = "translateX(50px)";

            setTimeout(() => {
                carIcon.style.transform = "translateX(0)";
                carIcon.style.visibility = 'hidden';
            }, 1000);
        }
    }

    // Function to get a random quirky message
    function getRandomQuirkyMessage() {
        const randomIndex = Math.floor(Math.random() * quirkyMessages.length);
        return quirkyMessages[randomIndex];
    }
});
