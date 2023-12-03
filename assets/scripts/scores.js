// Wrap your code in a function
function displayScores() {
    const scoreList = document.getElementById('score-list');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Check if there are scores to display
    if (scores.length > 0) {
        scores.forEach((score, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;

            if (scoreList) {
                scoreList.appendChild(listItem);
            } else {
                console.error('scoreList is null');
            }
        });
    } else {
        // Display a message if there are no scores
        const noScoresMessage = document.createElement('p');
        noScoresMessage.textContent = 'No scores available.';

        // Check if scoreList is still null
        if (scoreList) {
            scoreList.appendChild(noScoresMessage);
        } else {
            console.error('scoreList is null');
        }
    }
}

// Clear the scores
let clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

// Use the DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', displayScores);