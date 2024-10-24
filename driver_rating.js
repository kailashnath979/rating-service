document.getElementById('submit').addEventListener('click', function() {
    const categories = document.querySelectorAll('.rating-category');
    let feedback = '';

    categories.forEach(category => {
        const stars = category.querySelector('.stars');
        const selectedStar = Array.from(stars.children).find(star => star.classList.contains('selected'));
        if (selectedStar) {
            feedback += `${category.querySelector('label').innerText}: ${selectedStar.getAttribute('data-value')} stars\n`;
        }
    });

    if (feedback) {
        document.getElementById('feedback-message').innerText = 'Thank you for your feedback!\n' + feedback;
    } else {
        document.getElementById('feedback-message').innerText = 'Please select ratings for all categories!';
    }
});

function selectRating(element) {
    const stars = element.children;
    for (let star of stars) {
        star.classList.remove('selected');
    }
    const value = event.target.getAttribute('data-value');
    for (let i = 0; i < value; i++) {
        stars[i].classList.add('selected');
    }
}
