document.addEventListener('DOMContentLoaded', function () {
  let stars = document.querySelectorAll('.stars span'); // Select all the star elements
  let rating = 0;
  let activeTabUrl = '';

  // Get the current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    activeTabUrl = tabs[0].url;
    console.log('Active Tab URL: ', activeTabUrl);
  });

  // Set up star click events for each star
  stars.forEach((star, index) => {
    star.addEventListener('click', function () {
      rating = index + 1;  // Set the rating based on which star is clicked (1-indexed)
      updateStarsDisplay(rating); // Update the visual display of the stars
      console.log(`User clicked ${rating} stars`);
    });
  });

  // Function to update the visual display of the stars
  function updateStarsDisplay(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.textContent = '★'; // Fully filled star
        star.classList.add('selected'); // Add class to make it yellow
      } else {
        star.textContent = '☆'; // Empty star
        star.classList.remove('selected'); // Remove the yellow color from unselected stars
      }
    });
  }

  document.getElementById('submit').addEventListener('click', function () {
    const reason = document.getElementById('reason').value;

    console.log(`User submitting rating: ${rating}, reason: "${reason}", for URL: ${activeTabUrl}`);

    if (rating && reason && activeTabUrl) {
      fetch('https://nodejs-production-c051.up.railway.app/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: activeTabUrl, rating, reason })
      })
      .then(response => {
        if (response.ok) {
          console.log('Rating submitted successfully');
          alert('Rating submitted successfully');
        } else {
          console.error('Failed to submit rating');
          alert('Failed to submit rating');
        }
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
        alert('Error submitting rating');
      });
    } else {
      alert('Please provide a rating and a reason');
      console.log('Form incomplete, missing rating, reason, or URL');
    }
  });
});
