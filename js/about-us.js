console.log("company.js Loaded Successfully");

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.getAttribute('data-target');

            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to the clicked tab and corresponding section
            this.classList.add('active');
            document.querySelector(target).classList.add('active');

            // Scroll the entire page to the top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

    });

    // Activate the first tab and section by default
    tabs[0].classList.add('active');
    sections[0].classList.add('active');
});


document.addEventListener('DOMContentLoaded', function () {
    // Select all .image-box elements
    const imageBoxes = document.querySelectorAll('.image-box img');

    // Initialize Vanilla Tilt on each .image-box
    imageBoxes.forEach(imageBox => {
        VanillaTilt.init(imageBox, {
            max: 15, // Maximum tilt rotation (in degrees)
            speed: 400, // Speed of the tilt effect
            glare: true, // Enable glare effect
            'max-glare': 0.5, // Maximum glare opacity
        });
    });
});