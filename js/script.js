// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Array of fun space facts
const spaceFacts = [
	"Did you know? A day on Venus is longer than a year on Venus!",
	"Did you know? Neutron stars can spin at a rate of 600 rotations per second.",
	"Did you know? There are more trees on Earth than stars in the Milky Way.",
	"Did you know? One million Earths could fit inside the Sun.",
	"Did you know? Space is completely silent—there's no air for sound to travel.",
	"Did you know? The footprints on the Moon will be there for millions of years.",
	"Did you know? Jupiter has 95 known moons!",
	"Did you know? The hottest planet in our solar system is Venus.",
	"Did you know? Saturn could float in water because it’s mostly gas.",
	"Did you know? The largest volcano in the solar system is on Mars—Olympus Mons."
];

// Wait for the DOM to load before running code
document.addEventListener('DOMContentLoaded', () => {
	// Insert the space fact section above the gallery if not present
	let factDiv = document.getElementById('space-fact');
	if (!factDiv) {
		factDiv = document.createElement('div');
		factDiv.id = 'space-fact';
		factDiv.className = 'space-fact';
		const container = document.querySelector('.container');
		const gallery = document.getElementById('gallery');
		if (container && gallery) {
			container.insertBefore(factDiv, gallery);
		}
	}
	// Show a random space fact
	if (factDiv) {
		const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
		factDiv.textContent = randomFact;
	}
	// Get the button and gallery container from the HTML
	const getImagesBtn = document.getElementById('get-images-btn');
	const gallery = document.getElementById('gallery');

	// Modal elements
	const modal = document.getElementById('modal');
	const modalImg = document.getElementById('modal-img');
	const modalTitle = document.getElementById('modal-title');
	const modalDate = document.getElementById('modal-date');
	const modalExplanation = document.getElementById('modal-explanation');
	const closeBtn = document.getElementById('modal-close');

	// Add a click event to the button
		getImagesBtn.addEventListener('click', () => {
			// Show loading message
			gallery.innerHTML = '<div class="placeholder"><div class="placeholder-icon">🔄</div><p>Loading space photos…</p></div>';

			// Fetch the APOD data from the API
			fetch(apodData)
				.then(response => response.json()) // Parse the JSON data
				.then(data => {
					// Clear the gallery before adding new images
					gallery.innerHTML = '';

					// Loop through each item in the data
					data.forEach(item => {
						// Create a div for each gallery item
						const itemDiv = document.createElement('div');
						itemDiv.className = 'gallery-item';

						// Create an image element
						const img = document.createElement('img');
						img.src = item.url;
						img.alt = item.title;

						// Create a title element
						const title = document.createElement('h3');
						title.textContent = item.title;

						// Create a date element
						const date = document.createElement('p');
						date.textContent = item.date;

						// Add the image, title, and date to the gallery item
						itemDiv.appendChild(img);
						itemDiv.appendChild(title);
						itemDiv.appendChild(date);

						// Add click event to open modal with details
						itemDiv.addEventListener('click', () => {
							openModal(item);
						});

						// Add the gallery item to the gallery container
						gallery.appendChild(itemDiv);
					});
				})
				.catch(error => {
					// Show an error message if something goes wrong
					gallery.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
					console.error('Error fetching data:', error);
				});
		});

	// Function to open the modal with image details
	function openModal(item) {
		modalImg.src = item.hdurl || item.url;
		modalImg.alt = item.title;
		modalTitle.textContent = item.title;
		modalDate.textContent = item.date;
		modalExplanation.textContent = item.explanation;
		modal.style.display = 'block';
	}

	// Close modal when user clicks the close button or outside the modal content
	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none';
	});
	window.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	});
});