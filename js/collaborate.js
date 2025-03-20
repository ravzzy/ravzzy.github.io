const canvas = document.getElementById('canvas-collab');
const ctx = canvas.getContext('2d');

// Set initial canvas size
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

const isMobilePortrait = (window.innerWidth <= 768 || window.innerHeight <= 768) && !isLandscape();

//If the device is in portrait mode and the width or height is less than or equal to 768px, it’s treated as a mobile device.
//If the device is in landscape mode, it’s treated as a desktop device, regardless of the screen size.

let imgPaths = [];
const FRAMES = 697; // Total number of frames
const initialFrame = 1; // Initial frame
let frame = { frame: 1 };

// Function to get image paths
function getImagePaths() {
  imgPaths = []; // Reset the image paths array
  for (let i = initialFrame; i <= FRAMES; i++) {
    if (isMobilePortrait) {
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
        render(); // Render the first frame after loading is complete
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
//gsap.registerPlugin(ScrollTrigger);


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


// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 0.5, // Smooth scrolling duration
  easing: (t) => 1 - Math.pow(1 - t, 4), // Custom easing
  smooth: true,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// GSAP's requestAnimationFrame
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Multiply by 1000 to convert seconds to milliseconds
});

// Disable GSAP's default scroll behavior
gsap.ticker.lagSmoothing(0);

if (!isMobilePortrait) {
	console.log("gsap for landscape");
// GSAP ScrollTrigger animation
gsap.to(frame, {
  frame: (FRAMES - initialFrame) - 1,
  snap: 'frame',
  scrollTrigger: {
    trigger: '.two', // Use a section before .final as the trigger
    start: 'top top', // Start when the trigger hits the top of the viewport
    endTrigger: '.final', // End when .final comes into view
    end: 'top center', // End when the top of .final reaches the center of the viewport
    scrub: 20, // Smooth animation scrubbing
    invalidateOnRefresh: true, // Ensures it recalculates on resize
    markers: true, // Debug markers
	onLeave: () => {
		lenis.destroy(); // Disable Lenis when the user scrolls past the end
	  },
  },
  onUpdate: () => {
    render();
  },
});
} else {
	console.log("gsap for portrait");
	gsap.to(frame, {
		frame: (FRAMES - initialFrame) - 1,
		snap: 'frame',
		scrollTrigger: {
		  trigger: '.two', // Use a section before .final as the trigger
		  start: 'top top', // Start when the trigger hits the top of the viewport
		  endTrigger: '.final', // End when .final comes into view
		  end: 'top center', // End when the top of .final reaches the center of the viewport
		  scrub: 40, // Smooth animation scrubbing
		  invalidateOnRefresh: true, // Ensures it recalculates on resize
		  //markers: true, // Debug markers
		  onLeave: () => {
			  lenis.destroy(); // Disable Lenis when the user scrolls past the end
			},
		},
		onUpdate: () => {
		  render();
		},
	  });


}


// Function to render the image
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let img = imgs[frame.frame];

  if (img) {
    // Calculate the scaled dimensions (reduce by 20%)
    let scaleFactor = isMobilePortrait ? 1.2 : 0.9;
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
		// Log the image dimensions and position
		//console.log(`Image dimensions: ${renderWidth}x${renderHeight}, Position: (${x}, ${y})`);

	ctx.drawImage(img, x, y, renderWidth, renderHeight);
  }
}

/*
// Handle window resize
window.addEventListener('resize', () => {
	resizeCanvas();
});

// Function to resize the canvas
function resizeCanvas() {
	console.log("Orientation flipped by user, render the images again");

	// Log the new canvas dimensions
	console.log(`New canvas width: ${window.innerWidth}, height: ${window.innerHeight}`);

	// Update canvas dimensions to match the viewport
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;

	// Log the actual canvas dimensions
	console.log(`Canvas width: ${canvas.width}, height: ${canvas.height}`);

	// Re-render the current frame
	render();
}
*/
let currentOrientation = window.orientation;
// Function to handle orientation change


function handleOrientationChange() {
  if (window.orientation !== currentOrientation) {
    console.log("Orientation changed, refreshing the page...");
    currentOrientation = window.orientation;
    window.location.reload(); // Refresh the page
    window.scrollTo(0, 0);
  }
}

// Listen for resize events (which also fire on orientation change)
window.addEventListener('resize', handleOrientationChange);

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

/*

gsap.to('.three', {
	scrollTrigger: {
		trigger: '.three',
		start: 'top .two',
		end: '+=' + window.innerHeight * 1.1,
		scrub: 1,
		pin: true,
	},
})
gsap.to('.four', {
	scrollTrigger: {
		trigger: '.four',
		start: 'top top',
		end: '+=' + window.innerHeight * 1.1,
		scrub: 1,
		pin: true,
	},
}); 

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
}); */
