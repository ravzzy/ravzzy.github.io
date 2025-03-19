const canvas = document.getElementById('canvas-collab');
const ctx = canvas.getContext('2d');

// Set initial canvas size
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed


let imgPaths = [];
const FRAMES = 697; // Total number of frames
const initialFrame = 1; // Initial frame
let frame = { frame: 1 };

// Function to get image paths
function getImagePaths() {
	imgPaths = []; // Reset the image paths array
	for (let i = initialFrame; i <= FRAMES; i++) {
		if (isMobile) {
			imgPaths.push(`images/mobile/mob-${i}.png`); // Mobile version
		} else {
			imgPaths.push(`images/desktop/out-${i}.png`); // Desktop version
		}
	}
}
getImagePaths();
let imgs = [];
const progressBar = document.getElementById('progress');
const loadingScreen = document.getElementById('loading-screen');

// Function to hide elements during loading
function hideElements() {
    const elementsToHide = [
        document.getElementById('topper'),
        document.querySelector('.two'),
        document.querySelector('.final'),
        document.querySelector('.footer-branding')
    ];

    elementsToHide.forEach(element => {
        if (element) {
            element.classList.add('hidden');
        }
    });
}

// Function to unhide elements after loading
function unhideElements() {
    const elementsToUnhide = [
        document.getElementById('topper'),
        document.querySelector('.two'),
        document.querySelector('.final'),
        document.querySelector('.footer-branding')
    ];

    elementsToUnhide.forEach(element => {
        if (element) {
            element.classList.remove('hidden'); // Remove the .hidden class
            element.style.visibility = 'visible'; // Explicitly set visibility
            element.style.display = 'block'; // Or the appropriate display value
        }
    });
}
// Hide elements when the page starts loading
hideElements();

// Function to preload images and update progress
function preloadImages() {
    let loadedCount = 0;

    const promises = imgPaths.map((path) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                loadedCount++;
                updateProgress(loadedCount); // Update progress bar
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                resolve(null); // Resolve with null instead of rejecting
            };
        });
    });

    // Load all images in parallel
    Promise.all(promises)
        .then((loadedImages) => {
            // Filter out null values (failed images)
            imgs = loadedImages.filter((img) => img !== null);
            console.log('All images preloaded successfully!');
            console.log(`Loaded ${imgs.length} out of ${imgPaths.length} images.`);

            // Hide loading screen and unhide elements
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                unhideElements(); // Unhide all elements
                document.body.style.overflow = 'auto'; // Enable scrolling
				                // Render the first frame after loading is complete
				render();
            }, 500); // Fade out duration
        })
        .catch((error) => {
            console.error('Unexpected error during preloading:', error);
        });
}

// Function to update the progress bar
function updateProgress(loadedCount) {
    const progressPercentage = (loadedCount / imgPaths.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Start preloading images
preloadImages();

/*
let imgs = [];
function getImages() {
	imgPaths.forEach(path => {
		const img = new Image();
		img.src = path;
		img.style.display = 'block';
		imgs.push(img);
	});
}
getImages();*/

gsap.registerPlugin(ScrollTrigger);

/*
gsap.to(frame, {
	frame: (FRAMES - initialFrame) - 1,
	snap: 'frame',
	scrollTrigger: {
		start: 'top top',
		end: '+=300%',
		scrub: true,
		invalidateOnRefresh: true, // Ensures it recalculates on resize
	},
	onUpdate: () => {
		render();
	},
});*/

gsap.to(frame, {
	frame: (FRAMES - initialFrame) - 1,
	snap: 'frame',
	scrollTrigger: {
		trigger: '.two', // Use a section before .final as the trigger
		start: 'top top', // Start when the trigger hits the top of the viewport
		endTrigger: '.final', // End when .final comes into view
		end: 'top center', // End when the top of .final reaches the center of the viewport
		scrub: 10, //default is true, but changed to 10 so that it slows down scrolling.
		invalidateOnRefresh: true, // Ensures it recalculates on resize
	},
	onUpdate: () => {
		render();
	},
});

// Function to render the image
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let img = imgs[frame.frame];

	if (img) {
		// Calculate the scaled dimensions (reduce by 20%)
		let scaleFactor
		if (isMobile) {
			scaleFactor = 1.2
		}else {
			scaleFactor = 0.9
		}

		const scaledWidth = canvas.width * scaleFactor;
		const scaledHeight = canvas.height * scaleFactor;

		// Maintain aspect ratio
		const aspectRatio = img.width / img.height;
		let renderWidth, renderHeight;

		if (scaledWidth / scaledHeight > aspectRatio) {
			renderHeight = scaledHeight;
			renderWidth = scaledHeight * aspectRatio;
		} else {
			renderWidth = scaledWidth;
			renderHeight = scaledWidth / aspectRatio;
		}

		// Center the image on the canvas
		const x = (canvas.width - renderWidth) / 2;
		const y = (canvas.height - renderHeight) / 2;

		ctx.drawImage(img, x, y, renderWidth, renderHeight);
	}
}

// Handle window resize
window.addEventListener('resize', () => {
	resizeCanvas();
});

// Function to resize the canvas
function resizeCanvas() {
	// Match canvas size to the viewport (with 30% reduction)
	const scaleFactor = 0.7; // 30% reduction
	canvas.width = window.innerWidth * scaleFactor * window.devicePixelRatio;
	canvas.height = window.innerHeight * scaleFactor * window.devicePixelRatio;

	render(); // Re-draw image after resizing
}

// ScrollTrigger animations for other sections
gsap.to('.two', {
	scrollTrigger: {
		trigger: '.two',
		start: 'top top',
		end: '+=' + window.innerHeight * 1.1,
		pin: true,
		scrub: 1,
	},
});

gsap.to('.three', {
	scrollTrigger: {
		trigger: '.three',
		start: 'top .two',
		end: '+=' + window.innerHeight * 1.1,
		scrub: 1,
		pin: true,
	},
});
/*
gsap.to('.four', {
	scrollTrigger: {
		trigger: '.four',
		start: 'top top',
		end: '+=' + window.innerHeight * 1.1,
		scrub: 1,
		pin: true,
	},
}); */

gsap.to('.final', {
	scrollTrigger: {
		trigger: '.final',
		start: 'top top',
		end: '+=100%',
		scrub: 1,
		pin: true,
	},
});



// The below code is used in collab section to make the background image parallax effect
// Select all the sections with the parallax background
const parallaxSections = document.querySelectorAll('.career-section, .collab-section');

// Listen to the scroll event to trigger the parallax effect
window.addEventListener('scroll', function () {
  parallaxSections.forEach(section => {
    const offset = window.pageYOffset; // Get the current scroll position
    const speed = 0.5; // Adjust the speed of the parallax effect
    const bg = section.querySelector('::before');
    
    if (bg) {
      bg.style.transform = `translateY(${offset * speed}px)`;
    }
  });
});

// Intersection Observer for triggering animations on scroll
const sections = document.querySelectorAll('.career-section, .collab-section');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

sections.forEach(section => {
  observer.observe(section);
});
