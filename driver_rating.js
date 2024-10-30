// Initialize EmailJS on page load
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("kailashnath");

    document.getElementById('submit-button').addEventListener('click', () => {
    submitForm();
    });
});

// Function to get selected rating for each category
function getSelectedRating(category) {
    const stars = document.querySelectorAll(`#${category} .star`);
    let rating = 0;
    stars.forEach((star, index) => {
        if (star.classList.contains('selected')) {
            rating = index + 1; 
        }
    });
    return rating;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    // Collect ratings and comment
    const humorRating = getSelectedRating("humor");
    const comfortRating = getSelectedRating("comfort");
    const timelinessRating = getSelectedRating("timeliness");
    const comment = document.getElementById('comment-box').value;

    // EmailJS parameters
    const templateParams = {
        humor: humorRating,
        comfort: comfortRating,
        timeliness: timelinessRating,
        comment: comment
    };

    // Send email with ratings and comment
    emailjs.send("service_rwzse8w", "template_goneji6", templateParams)
        .then(response => {
            console.log("Success!", response.status, response.text);
            alert("Thanks for submitting your feedback!");
        })
        .catch(error => {
            console.error("Failed to send feedback", error);
            alert("Sorry, there was an issue submitting your feedback.");
        });
}

// Star rating selection functionality
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        const category = this.parentNode.id;
        const stars = document.querySelectorAll(`#${category} .star`);

        // Clear previous selection
        stars.forEach(s => s.classList.remove('selected'));
        
        // Mark all stars up to the clicked one as selected
        for (let i = 0; i <= Array.from(stars).indexOf(this); i++) {
            stars[i].classList.add('selected');
        }
    });
});
