let currentIndex = 0;
const images = document.querySelectorAll('.slideshow-image');

function setRating(category, stars) {
    alert(`You rated "${category}" with ${stars} star(s)!`);
}

function submitRating() {
    alert("Thank you for your feedback! Here’s a trip down memory lane.");
    // Additional logic to display images or further actions can be added here
}

function openModal(imageUrl, captionText) {
    document.getElementById("modalImage").src = imageUrl;
    document.getElementById("caption").innerHTML = captionText;
    document.getElementById("photoModal").style.display = "block";
}

function closeModal() {
    document.getElementById("photoModal").style.display = "none";
}

// Slideshow Functionality
function showSlides() {
    images.forEach((img, index) => {
        img.classList.remove('active');
    });
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    images[currentIndex].classList.add('active');
}

// Change slides every 5 seconds
setInterval(showSlides, 5000);
