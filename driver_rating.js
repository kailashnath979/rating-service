
let ratings = {
    overall: 0,
    humor: 0,
    comfort: 0
};

function setRating(value) {
    ratings.overall = value;
    document.getElementById('rating-feedback').innerText = getFunnyFeedback(value);
    triggerAnimation();
}

function setCategoryRating(category, value) {
    ratings[category] = value;
}

function getFunnyFeedback(value) {
    if (value === 5) {
        return "Wow! You loved it! Uber is calling me for a full-time gig.";
    } else if (value === 3) {
        return "Could have been better… Am I losing my touch?";
    } else if (value === 1) {
        return "Ouch! Was I really that bad? Time to rethink my career!";
    }
    return "";
}

function triggerAnimation() {
    // Easter egg activation
    let egg = document.getElementById('easter-egg');
    egg.classList.remove('hidden');
    setTimeout(() => {
        egg.classList.add('hidden');
    }, 3000);
}
