/* Author - ravzzy */

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 1080
canvas.width = 1920



let imgPaths = []
const FRAMES = 697 // Total number of frames
const initialFrame = 1 // Initial frame
let frame = { frame: 1 }

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
getImagePaths()

let imgs = []
function getImages() {
	imgPaths.forEach(path => {
		const img = new Image()
		img.src = path
		img.style.display = 'block'
		imgs.push(img)
	})
}
getImages()

gsap.registerPlugin(ScrollTrigger)

gsap.to(frame, {
	frame: (FRAMES - initialFrame) - 1,
	snap: 'frame',
	// ease: 'none',
	scrollTrigger: {
		// trigger: 'canvas',
		start: 'top top',
		end: '+=700%',
		scrub: true,
		invalidateOnRefresh: true, // Ensures it recalculates on resize
		/* markers: true */ // Set to true for debugging

	},
	onUpdate: () => {
		render()
		// canvas.style.backgroundImage = `url(${imgPaths[frame.frame]})`
	},
})

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let img = imgs[frame.frame];

	if (img) {
		let scale = Math.max(canvas.width / img.width, canvas.height / img.height); // Scale factor
		let x = (canvas.width - img.width * scale) / 2; // Centering X
		let y = (canvas.height - img.height * scale) / 2; // Centering Y

		ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
	}
}


imgs[1].onload = render

window.addEventListener('resize', () => {
	// canvas.height = window.innerHeight
	// canvas.width = window.innerWidth
	render()
})

function resizeCanvas() {
	// Match canvas size to the viewport
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;

	render(); // Re-draw image after resizing
}

// Run resize function on load & when resizing the screen
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

function updateOpacity() {
	const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed
	const canvas = document.getElementById("canvas");

	if (isMobile) {
		canvas.style.opacity = "0.4"; // Mobile opacity
	} else {
		canvas.style.opacity = "0.4"; // Desktop opacity
	}
}

// Run when page loads
window.addEventListener("load", updateOpacity);

// Run on window resize (e.g., rotating phone)
window.addEventListener("resize", updateOpacity);


gsap.to('.two', {
	scrollTrigger: {
		trigger: '.two',
		start: 'top top',
		end: '+=' + window.innerHeight * 1.1,
		pin: true,
		scrub: 1,
	},
})

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
		srub: 1,
		pin: true,
	},
})


gsap.to('.loader-img', {
	rotation: 360,
	duration: 1.5,
	repeat: -1,
	repeatDelay: 0.25,
})

window.addEventListener('load', e => {
	document.body.classList.remove('loading')
})

const rgb = {
	r: 255,
	g: 255,
	b: 255,
	rT: 23,
	gT: 16,
	bT: 16,
}

const rgbTitle = {}

const roadmap = document.querySelector('.roadmap')
const roadmapTitle = document.querySelector('.roadmap .title')

gsap.to(rgb, {
	r: 23,
	g: 16,
	b: 16,
	rT: 255,
	gT: 255,
	bT: 255,
	snap: 1,
	scrollTrigger: {
		trigger: '.roadmap',
		start: 'top bottom',
		end: '+=' + window.innerHeight * 0.3,
		scrub: true,
	},
	onUpdate: () => {
		roadmapTitle.style.color = `rgb(${rgb.rT},${rgb.gT},${rgb.bT})`

		roadmap.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
	},
})

/* Disabling the rotating text logo for now
// JavaScript to adjust rotation based on scroll and position letters along the top of the circle
document.addEventListener('DOMContentLoaded', function () {
	const text = document.querySelector('.rotating-text');
	const letters = text.querySelectorAll('span');
	const radius = 52.5; // Reduced radius by 70% (was 120px, now 52.5px for smaller circle)
	const totalLetters = letters.length;
	const angleStep = 360 / totalLetters; // Step between each letter's position
  
	// Position each letter along the top of the circle, upright
	letters.forEach((letter, index) => {
	  const angle = angleStep * index; // Angle to place each letter along the circle
	  const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius; // X position of the letter
	  const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius; // Y position of the letter
  
	  // Position each letter, aligned along the top of the circle
	  letter.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
	});
  
	// Scroll event listener to adjust rotation based on scroll
	window.addEventListener('scroll', function () {
	  const scrollPosition = window.scrollY;
	  const rotationAmount = scrollPosition / 3; // Control the scroll-to-rotate speed
	  text.style.transform = `rotate(${rotationAmount}deg)`; // Rotate the text around the circle
	  //document.querySelector('.dice').style.transform = `rotate(${rotationAmount}deg)`; // Rotate the dice along with the text
	});
  });
  

	window.addEventListener("load", function () {
		document.querySelector(".rotating-text").style.opacity = "1";
	});

	window.addEventListener("load", function () {
		document.querySelector(".circle").style.opacity = "0.9";
	});
*/
$(document).ready(function () {
	$(".card").tilt({
		maxTilt: 30,         // Maximum tilt angle
		perspective: 1000,    // Perspective depth
		easing: "cubic-bezier(.03,.98,.52,.99)", // Smooth effect
		speed: 400,          // Speed of transition
		glare: false,        // Set to true if you want a glare effect
		scale: 1.05,         // Slight zoom effect
		reset: true          // Reset tilt when the mouse leaves
	});
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);
	result.innerHTML = "Please wait..."

	fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: json
	})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerHTML = "Form submitted successfully";
			} else {
				console.log(response);
				result.innerHTML = json.message;
			}
		})
		.catch(error => {
			console.log(error);
			result.innerHTML = "Something went wrong!";
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = "none";
			}, 3000);
		});
});


document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click
document.addEventListener("keydown", (event) => {
	if (event.ctrlKey && (event.key === "u" || event.key === "U")) {
		event.preventDefault(); // Disable View Source (Ctrl+U)
	}
});

/*  function hideSecondVerticalLine() {
	let lines = document.querySelectorAll(".vertical-line");
	if (lines.length >= 2 && window.innerWidth <= 430) { // iPhone 14 & 14 Pro Max
		lines[1].style.display = "none";
	}
}

window.onload = hideSecondVerticalLine;
window.addEventListener("resize", hideSecondVerticalLine);
*/

window.addEventListener("load", function () {
	document.querySelector(".logo-image").style.opacity = "1";
});

window.addEventListener("load", function () {
	document.querySelector(".navbar").style.opacity = "1";
});

window.addEventListener("load", function () {
	document.querySelector(".designer-footer").style.opacity = "1";
});


// Optional: Add a small fade-in effect for dropdown
document.addEventListener("DOMContentLoaded", function () {
	const dropdowns = document.querySelectorAll(".dropdown");

	dropdowns.forEach(dropdown => {
		dropdown.addEventListener("mouseenter", function () {
			const menu = this.querySelector(".dropdown-menu");
			menu.style.opacity = "0";
			menu.style.display = "block";
			setTimeout(() => {
				menu.style.opacity = "1";
			}, 10);
		});

		dropdown.addEventListener("mouseleave", function () {
			const menu = this.querySelector(".dropdown-menu");
			menu.style.opacity = "0";
			setTimeout(() => {
				menu.style.display = "none";
			}, 200);
		});
	});
});


document.querySelector(".hamburger-menu").addEventListener("click", () => {
	document.querySelector(".container").classList.toggle("change");
});


window.addEventListener("load", function () {
	document.querySelector(".hamburger-menu").style.opacity = "1";
});


// dynamic text colour change logic based on background colour for hamburger/sidebar
function adjustTextColor() {
	const menuLinks = document.querySelectorAll(".menu-link");
	const menuLines = document.querySelectorAll(".hamburger-menu .line"); // Hamburger menu lines
	const hamburgerMenu = document.querySelector(".hamburger-menu"); // Select the entire menu button
	let sections = document.querySelectorAll("section");
	let currentSection = null;

	// Detect the current section in view
	sections.forEach(section => {
		let rect = section.getBoundingClientRect();
		if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
			currentSection = section;
		}
	});

	if (!currentSection) {
		console.error("❌ No section detected in view.");
		return;
	}

	// Get computed background color of the section
	const bgColor = window.getComputedStyle(currentSection).backgroundColor;
	logMessage("🎨 Detected Section Background Color: " + bgColor);

	// Convert RGBA to brightness
	function getBrightness(rgba) {
		let match = rgba.match(/\d+(\.\d+)?/g);
		if (!match || match.length < 3) {
			logMessage("❌ Failed to extract RGB values!");
			return 255;
		}

		let [r, g, b, a = 1] = match.map(Number);
		logMessage(`🔍 Extracted RGBA: R=${r}, G=${g}, B=${b}, A=${a}`);

		// Blend with white if transparent
		let blendedR = Math.round(r * a + 255 * (1 - a));
		let blendedG = Math.round(g * a + 255 * (1 - a));
		let blendedB = Math.round(b * a + 255 * (1 - a));

		let brightness = (blendedR * 299 + blendedG * 587 + blendedB * 114) / 1000;
		logMessage(`🔆 Corrected Brightness: ${brightness} (0 = black, 255 = white)`);
		return brightness;
	}

	let brightness = getBrightness(bgColor);

	// Change menu link text color
	menuLinks.forEach(link => {
		link.style.color = brightness < 150 ? "white" : "black";
	});

	// Change hamburger menu lines (X icon inside menu)
	menuLines.forEach(line => {
		line.style.backgroundColor = brightness < 150 ? "white" : "black";
	});

	// Change close button (X) when sidebar is open
	if (document.querySelector(".container").classList.contains("change")) {
		hamburgerMenu.style.color = brightness < 150 ? "white" : "black"; // Changes the ✖ icon color
	}
}

// Log messages to console and webpage
function logMessage(message) {
	console.log(message);

	let logContainer = document.getElementById("debug-log");
	if (logContainer) {
		logContainer.innerHTML += message + "<br>";
		logContainer.scrollTop = logContainer.scrollHeight;
	}
}

// Run on page load, scroll & when sidebar opens/closes
window.addEventListener("load", adjustTextColor);
window.addEventListener("scroll", adjustTextColor);
document.querySelector(".hamburger-menu").addEventListener("click", adjustTextColor);

// Closes the sidebar when clicking outside of it.
// Does not close when clicking inside the sidebar or on the hamburger menu.

document.addEventListener("click", function (event) {
	const container = document.querySelector(".container");
	const sidebar = document.querySelector(".sidebar");
	const hamburgerMenu = document.querySelector(".hamburger-menu");

	// Check if the sidebar is open and the clicked area is outside the sidebar & hamburger menu
	if (container.classList.contains("change") && !sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
		container.classList.remove("change"); // Close sidebar
	}
});


