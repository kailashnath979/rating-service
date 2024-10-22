document.getElementById('ratingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Here you can capture the ratings and handle storage
    const funny = document.getElementById('funnyRating').value;
    const comfort = document.getElementById('comfortRating').value;
    const timeliness = document.getElementById('timelinessRating').value;
    const conversation = document.getElementById('conversationRating').value;
    const overall = document.getElementById('overallRating').value;
    const comments = document.getElementById('comments').value;

    console.log({
        funny, comfort, timeliness, conversation, overall, comments
    });

    // Store in cookies or localStorage
    localStorage.setItem('driverRating', JSON.stringify({
        funny, comfort, timeliness, conversation, overall, comments
    }));

    // Show response message
    document.getElementById('response').classList.remove('hidden');
});
