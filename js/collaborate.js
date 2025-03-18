const canvas = document.getElementById('canvas-collab');
const ctx = canvas.getContext('2d');

// Set initial canvas size
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

let imgPaths = [];
const FRAMES = 697; // Total number of frames
const initialFrame = 1; // Initial frame
let frame = { frame: 1 };

// Function to get image paths
function getImagePaths() {
	imgPaths = []; // Reset the image paths array
	const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

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
function getImages() {
	imgPaths.forEach(path => {
		const img = new Image();
		img.src = path;
		img.style.display = 'block';
		imgs.push(img);
	});
}
getImages();

gsap.registerPlugin(ScrollTrigger);

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
});

// Function to render the image
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let img = imgs[frame.frame];

	if (img) {
		// Calculate the scaled dimensions (reduce by 20%)
		const scaleFactor = 0.9; // 20% reduction
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

// Initial render
imgs[1].onload = render;

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
		end: '+=' + window.innerHeight * 1.1,
		scrub: 1,
		pin: true,
	},
});