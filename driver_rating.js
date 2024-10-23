document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
        const stars = this.parentNode.querySelectorAll('.star');
        const ratingValue = this.getAttribute('data-value');

        stars.forEach(s => {
            s.classList.remove('active');
        });

        for (let i = 0; i < ratingValue; i++) {
            stars[i].classList.add('active');
        }
    });
});

function submitRating() {
    const charmRating = document.querySelector('#charmRating .active:last-child')?.getAttribute('data-value');
    const comfortRating = document.querySelector('#comfortRating .active:last-child')?.getAttribute('data-value');
    const timelinessRating = document.querySelector('#timelinessRating .active:last-child')?.getAttribute('data-value');
    const overallRating = document.querySelector('#overallRating .active:last-child')?.getAttribute('data-value');
    const comments = document.getElementById('comments').value;

    if (!charmRating || !comfortRating || !timelinessRating || !overallRating) {
        alert("Please fill in all the ratings before submitting!");
        return;
    }

    // Playful response based on overall rating
    let message;
    switch (overallRating) {
        case '5':
            message = "Wow! You loved it! Uber is calling me for a full-time gig.";
            break;
        case '3':
            message = "Could have been better… Am I losing my touch?";
            break;
        case '1':
            message = "Ouch! Was I really that bad? Time to rethink my career!";
            break;
        default:
            message = "Thank you for your feedback!";
    }

    // Show the thank you message with humor
    document.getElementById('thankYouMessage').innerHTML = message;
    document.getElementById('thankYouMessage').classList.remove('hidden');
}
