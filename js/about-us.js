console.log("company.js Loaded Successfully");

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');
    
    // Function to set proper scrolling
    function setScrollBehavior(activeSection) {
        // Reset all sections
        sections.forEach(section => {
            section.style.overflowY = 'hidden';
            section.style.height = 'auto';
        });
        
        // Set active section to scrollable
        activeSection.style.overflowY = 'auto';
        activeSection.style.height = '100vh';
        activeSection.style.maxHeight = '100vh';
        
        // Calculate if we need scrolling
        const needsScroll = activeSection.scrollHeight > activeSection.clientHeight;
        
        if (!needsScroll) {
            activeSection.style.overflowY = 'hidden';
            activeSection.style.height = 'auto';
            activeSection.style.maxHeight = 'none';
        }
    }

    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetSection = document.querySelector(target);
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            targetSection.classList.add('active');
            
            // Set proper scrolling
            setScrollBehavior(targetSection);
            
            // Reset scroll position
            window.scrollTo(0, 0);
            targetSection.scrollTo(0, 0);
        });
    });

    // Initialize first tab
    if (tabs.length > 0 && sections.length > 0) {
        tabs[0].classList.add('active');
        sections[0].classList.add('active');
        setScrollBehavior(sections[0]);
    }
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