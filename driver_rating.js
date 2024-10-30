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

    

    starRatings.forEach((ratingSection) => {
        const stars = ratingSection.querySelectorAll(".star");

        if (stars.length === 0) {
            console.error("No stars found in rating section.");
            return;
        }

        stars.forEach((star, index) => {
            star.addEventListener("mouseover", function() {
                highlightStars(stars, index);
            });

            star.addEventListener("mouseleave", function() {
                resetStars(stars);
            });

            star.addEventListener("click", function() {
                setRating(stars, index + 1, ratingSection);
            });
        });
    });

    function highlightStars(stars, index) {
        stars.forEach((star, i) => {
            star.classList.toggle("highlighted", i <= index);
        });
    }
    function resetStars(stars) {
        stars.forEach((star) => {
            star.classList.remove("highlighted");
        });
    }

    function setRating(stars, rating, ratingSection) {
        ratingSection.setAttribute("data-selected-rating", rating);
        stars.forEach((star, i) => {
            star.classList.toggle("selected", i < rating);
        });
    }

    function getSelectedRatings() {
        const ratings = {};
        starRatings.forEach((section) => {
            const category = section.querySelector("h3").textContent;
            const rating = section.getAttribute("data-selected-rating") || "0";
            ratings[category] = rating;
        });
        return ratings;
    }

    submitButton.addEventListener("click", function() {
        const selectedRatings = getSelectedRatings();
        const userComment = comments.value;

        if (Object.values(selectedRatings).includes("0")) {
            alert("Please provide a rating for all categories.");
            return;
        }

        quirkyMessage.textContent = getRandomQuirkyMessage();
        moveCarIcon();

        emailjs.send("service_rwzse8w", "template_goneji6", {
            rating_chill: selectedRatings["How zen were you during our ride?"],
            rating_timeliness: selectedRatings["Did I keep you waiting like a lost tourist?"],
            rating_experience: selectedRatings["How much fun did I bring to our ride?"],
            rating_like: selectedRatings["How Much Do You Like Me?"], 
            rating_date: selectedRatings["Another date?"], 
            comments: userComment,
        }).then(
            function(response) {
                // quirkyMessage.textContent = "Your feedback has been sent! 🎉";
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

    function getRandomQuirkyMessage() {
        const randomIndex = Math.floor(Math.random() * quirkyMessages.length);
        return quirkyMessages[randomIndex];
    }
});
