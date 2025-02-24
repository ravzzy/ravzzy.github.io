/* Author - ravzzy */

/*
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
/*
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
		canvas.style.opacity = "1"; // Desktop opacity
	}
}

// Run when page loads
window.addEventListener("load", updateOpacity);

// Run on window resize (e.g., rotating phone)
window.addEventListener("resize", updateOpacity);

/*
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

*/
gsap.to('.loader-img', {
	rotation: 360,
	duration: 1.5,
	repeat: -1,
	repeatDelay: 0.25,
})

// Ensure loader is visible when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	document.body.classList.add("loading");
});

// Keep the loader for 2.5 seconds before showing the page
window.addEventListener("load", () => {
	setTimeout(() => {
		document.body.classList.remove("loading");
		document.querySelector(".loader").style.display = "none"; // Hide loader
	}, 1000); // 2500ms = 2.5 seconds
});



const rgbTitle = {}

const roadmap = document.querySelector('.roadmap')
const roadmapTitle = document.querySelector('.roadmap .title')

const rgb = {
	r: 230, // Initial Red: #e61618
	g: 22,
	b: 24,
	rT: 255, // Initial Text Color: White
	gT: 255,
	bT: 255,
};

gsap.to(rgb, {
	r: 255, // Final Background: White
	g: 255,
	b: 255,
	rT: 0,   // Final Text Color: Black
	gT: 0,
	bT: 0,
	snap: 1,
	ease: "power1.inOut",
	scrollTrigger: {
		trigger: '.roadmap',
		start: 'top 70%',
		end: 'top 20%',
		scrub: 1.5,
	},
	onUpdate: () => {
		roadmapTitle.style.color = `rgb(${rgb.rT},${rgb.gT},${rgb.bT})`;
		roadmap.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
	},
});

// 🔥 Animate white-text elements separately
gsap.to(".white-text", {
	opacity: 1,
	visibility: "visible", // Ensure text becomes visible
	duration: 1.5, // Smooth transition duration
	ease: "power2.out",
	scrollTrigger: {
		trigger: ".roadmap",
		start: "top 70%", // Starts when 70% of roadmap is visible
		end: "top 20%", // Ends transition at 20% visibility
		scrub: 1.5,
		toggleActions: "play none none reverse", // Ensures it reverses when scrolling back up
	}
});





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


//document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click
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


// dynamic text colour change logic based on background colour for hamburger/sidebar/dropdown/navbar/designer footer
function adjustTextColor() {
	const menuLinks = document.querySelectorAll(".menu-link");
	const menuLines = document.querySelectorAll(".hamburger-menu .line"); // Hamburger menu lines
	const navLinks = document.querySelectorAll(".nav-menu a"); // navbar links
	const hamburgerMenu = document.querySelector(".hamburger-menu"); // Select the entire menu button
	const footer = document.querySelector(".designer-footer"); // Select the designer footer


	let sections = document.querySelectorAll("section");
	let currentSection = null;

	// Detect the current section in view
	sections.forEach(section => {
		let rect = section.getBoundingClientRect();
		if (rect.top <= window.innerHeight && rect.bottom >= 0) {  // Checks if the section is in the viewport
			currentSection = section;
		}
	});

	if (!currentSection) {
		console.error("❌ No section detected in view.");
		return;
	}

	// Get computed background color of the section
	const bgColor = window.getComputedStyle(currentSection).backgroundColor;
	//logMessage("🎨 Detected Section Background Color: " + bgColor);
	//console.log("🎨 Detected Section Background Color: " + bgColor);

	// Convert RGBA to brightness
	function getBrightness(rgba) {
		let match = rgba.match(/\d+(\.\d+)?/g);
		if (!match || match.length < 3) {
			//logMessage("❌ Failed to extract RGB values!");
			//console.log("❌ Failed to extract RGB values!");
			return 255;
		}

		let [r, g, b, a = 1] = match.map(Number);
		//logMessage(`🔍 Extracted RGBA: R=${r}, G=${g}, B=${b}, A=${a}`);
		//console.log(`🔍 Extracted RGBA: R=${r}, G=${g}, B=${b}, A=${a}`);


		// Blend with white if transparent
		let blendedR = Math.round(r * a + 255 * (1 - a));
		let blendedG = Math.round(g * a + 255 * (1 - a));
		let blendedB = Math.round(b * a + 255 * (1 - a));

		let brightness = (blendedR * 299 + blendedG * 587 + blendedB * 114) / 1000;
		//logMessage(`🔆 Corrected Brightness: ${brightness} (0 = black, 255 = white)`);
		//console.log(`🔆 Corrected Brightness: ${brightness} (0 = black, 255 = white)`);
		return brightness;
	}

	let brightness = getBrightness(bgColor);

	// Change menu link text color
	menuLinks.forEach(link => {
		link.style.color = brightness < 150 ? "white" : "black";
		//console.log("✅ Updated menu link text color:", link.style.color);
	});

	// Change hamburger menu lines (X icon inside menu)
	menuLines.forEach(line => {
		line.style.backgroundColor = brightness < 150 ? "white" : "black";
		//console.log("✅ Updated hamburger menu lines:", line.style.color);
	});


	//console.log("Current Navbar Background Color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-bg-color"));
	// ✅ Update CSS Variables Instead of Inline Styles
	document.documentElement.style.setProperty("--nav-bg-color", brightness < 150 ? "white" : "black");
	document.documentElement.style.setProperty("--nav-text-color", brightness < 150 ? "black" : "white");
	// ✅ Update Hover Color for Better Contrast
	document.documentElement.style.setProperty("--nav-hover-color", brightness < 150 ? "white" : "white");
	// ✅ Update CSS Variable for Footer Text Color
	document.documentElement.style.setProperty("--footer-text-color", brightness < 150 ? "white" : "black");

	//console.log("Updated --nav-bg-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-bg-color"));
	//console.log("Updated --nav-text-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-text-color"));
	//console.log("Updated --nav-hover-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-hover-color"));
	//console.log("Updated --footer-text-color:", getComputedStyle(document.documentElement).getPropertyValue("--footer-text-color"));

	// ✅ Apply to `.nav-menu a`
	navLinks.forEach(link => {
		link.style.color = "var(--nav-text-color)"; // Use CSS variable
		//console.log("✅ Updated Navbar Text Color:", link.style.color);
	});

	// Change close button (X) when sidebar is open
	if (document.querySelector(".container").classList.contains("change")) {
		hamburgerMenu.style.color = brightness < 150 ? "white" : "black"; // Changes the ✖ icon color
		//("✅ Updated ✖ icon colour:", hamburgerMenu.style.color);

	}
}

// Log messages to console and webpage
//Enable this for Debug log window
/*function logMessage(message) {
	console.log(message);

	let logContainer = document.getElementById("debug-log");
	if (logContainer) {
		logContainer.innerHTML += message + "<br>";
		logContainer.scrollTop = logContainer.scrollHeight;
	}
}*/

// Run on page load, scroll & when sidebar opens/closes
window.addEventListener("load", adjustTextColor);
window.addEventListener("scroll", adjustTextColor);
document.querySelector(".hamburger-menu").addEventListener("click", adjustTextColor);

// make each dropdown item appear sequentially effect
document.addEventListener("DOMContentLoaded", () => {
	const dropdown = document.querySelector(".dropdown");
	const items = document.querySelectorAll(".dropdown-menu li");

	dropdown.addEventListener("mouseenter", () => {
		items.forEach((item, index) => {
			item.style.opacity = "0";
			item.style.transform = "translateY(-10px)";
			setTimeout(() => {
				item.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
				item.style.opacity = "1";
				item.style.transform = "translateY(0)";
			}, index * 200); // 200ms delay between each item
		});
	});

	dropdown.addEventListener("mouseleave", () => {
		items.forEach(item => {
			item.style.opacity = "0";
			item.style.transform = "translateY(-10px)";
		});
	});
});


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


document.addEventListener("scroll", function () {
	let items = document.querySelectorAll(".timeline-item, .timeline-connector");
	items.forEach(item => {
		let rect = item.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.8) {
			item.classList.add("show");
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let dividers = document.querySelectorAll(".timeline-divider");
	let connectors = document.querySelectorAll(".timeline-connector");

	dividers.forEach((divider, index) => {
		if (connectors[index]) {
			let nextElement = connectors[index].nextElementSibling;
			let dividerTop = divider.offsetTop;
			let connectorTop = connectors[index].offsetTop;
			let height = connectorTop - dividerTop - 15;
			divider.style.height = height + "px";

			if (nextElement && nextElement.classList.contains("timeline-divider")) {
				nextElement.style.top = (connectorTop + connectors[index].offsetHeight) + "px";
			}
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			let text = entry.target;
			if (entry.isIntersecting) {
				text.classList.add("in-view"); // Add effect when entering viewport
			} else {
				text.classList.remove("in-view"); // Remove effect when out of view
			}
		});
	}, { threshold: 0.3 }); // Trigger effect when 30% of the text is visible

	document.querySelectorAll(".timeline-text.left, .timeline-text.right").forEach((text) => {
		observer.observe(text);
	});
});



document.addEventListener("DOMContentLoaded", function () {
	const header = document.querySelector("header");
	const swimlane = document.querySelector(".Header-swimlane");
	let lastScrollY = window.scrollY;
	let isHidden = false; // Tracks if header & swimlane are hidden

	// Initial values for font size and padding
	// Set different values for desktop and mobile
	let initialFontSize, minFontSize, initialPadding, minPadding;

	function updateValues() {
		if (window.innerWidth <= 768) { // Mobile screen sizes
			initialFontSize = 8;
			minFontSize = 4;
			initialPadding = 10;
			minPadding = 5;
		} else { // Desktop sizes
			initialFontSize = 16;
			minFontSize = 12;
			initialPadding = 20;
			minPadding = 5;
		}
	}

	updateValues(); // Set values based on initial screen size

	window.addEventListener("scroll", function () {
		let scrollY = window.scrollY;
		let shrinkFactor = Math.min(1, scrollY / 200); // Controls shrink speed

		let newFontSize = initialFontSize - shrinkFactor * (initialFontSize - minFontSize);
		let newPadding = initialPadding - shrinkFactor * (initialPadding - minPadding);

		// Apply shrinking effect
		header.style.fontSize = `${newFontSize}px`;
		header.style.padding = `${newPadding}px 0`;

		if (scrollY > 200 && scrollY > lastScrollY && !isHidden) {
			// Hide both header & swimlane when scrolling down past 200px
			header.style.transform = "translateY(-160%)";
			swimlane.style.transform = "translateY(-150%)";
			isHidden = true;
		} else if (scrollY < lastScrollY && scrollY < 150 && isHidden) {
			// Show them again when scrolling up past 150px
			header.style.transform = "translateY(0)";
			swimlane.style.transform = "translateY(0)";
			isHidden = false;
		}

		lastScrollY = scrollY; // Update last scroll position
	});
});

window.addEventListener("scroll", function () {
	let logo = document.querySelector(".logo-image");
	if (window.scrollY > 160) {
		logo.style.opacity = "0";  // Hide the logo
		logo.style.pointerEvents = "none";  // Prevent interaction
	} else {
		logo.style.opacity = "1";  // Show the logo
		logo.style.pointerEvents = "auto";
	}
});


//logic to calculate the width of the sidebar dynamically for all screen sizes

function adjustSidebarWidth() {
	let tickerWidth = document.querySelector(".Header-ticker").offsetWidth;
	let sidebar = document.querySelector(".sidebar");

	if (sidebar) {
		let sidebarWidth = `calc(100vw - ${tickerWidth}px)`;
		sidebar.style.width = sidebarWidth;

		// Ensure menu items update width after sidebar adjustment
		document.querySelectorAll(".menu-item").forEach(item => {
			item.style.width = sidebarWidth;
		});
	}
}

// Run function on page load and window resize
window.addEventListener("load", adjustSidebarWidth);
window.addEventListener("resize", adjustSidebarWidth);

// This is God's code - fixes the bloody alignment for mobile view
document.addEventListener("DOMContentLoaded", function () {
	const ELEMENT_GAP_LOOP = 10; // Constant gap within a single loop
	const ELEMENT_GAP_BETWEEN_LOOPS = 20; // Larger gap before the next loop starts
	const START_Y = -100; // Adjust for initial vertical position

	//console.log("ELEMENT_GAP_LOOP: " + ELEMENT_GAP_LOOP);
	//console.log("ELEMENT_GAP_BETWEEN_LOOPS: " + ELEMENT_GAP_BETWEEN_LOOPS);
	//console.log("START_Y: " + START_Y);

	function alignTimeline() {
		if (window.innerWidth >= 1200) return; // Stop execution for desktops

		const timelineContainer = document.querySelector(".timeline-container");
		const timelineTexts = [...timelineContainer.querySelectorAll(".timeline-text")];
		const timelineItems = [...timelineContainer.querySelectorAll(".timeline-item")];
		const timelineConnectors = [...timelineContainer.querySelectorAll(".timeline-connector")];
		let currentBottom = START_Y; // Use bottom position for calculations
		//console.log("currentBottom: " + currentBottom);
		let lastBottom = currentBottom;

		timelineTexts.forEach((text, index) => {
			//console.log("text.offsetHeight: " + text.offsetHeight);

			let textHeight = text.getBoundingClientRect().height + ELEMENT_GAP_LOOP; // Use loop gap here
			//console.log("textHeight: " + textHeight);

			// Place text using bottom position
			text.style.cssText = `
                position: absolute !important;
                top: ${currentBottom}px !important;
                left: 55% !important;
                transform: translateX(-50%) !important;
                width: 80vw !important;
                max-width: 100vw !important;
                text-align: center !important;
            `;
			currentBottom += textHeight; // Update bottom after the text
			//console.log("currentBottom after text: " + currentBottom);

			if (timelineItems[index]) {
				//console.log(timelineItems[index] + ".offsetHeight: " + timelineItems[index].offsetHeight);

				let itemHeight = timelineItems[index].getBoundingClientRect().height + ELEMENT_GAP_LOOP; // Use loop gap here
				//console.log("itemHeight: " + itemHeight);

				// Place item using bottom position
				timelineItems[index].style.cssText = `
                    position: absolute !important;
                    font-size: 1.5rem !important;
                    top: ${currentBottom}px !important;
                    left: 55% !important;
                    transform: translateX(-50%) !important;
                    width: 70vw !important;
                    min-width: 70vw !important;
                    max-width: 70vw !important;
                `;
				currentBottom += itemHeight; // Update bottom after the item
				//console.log("currentBottom after item: " + currentBottom);
			}

			if (timelineConnectors[index]) {
				let connectorHeight = timelineConnectors[index].getBoundingClientRect().height + ELEMENT_GAP_LOOP; // Use loop gap here
				//console.log(timelineConnectors[index] + ".offsetHeight: " + timelineConnectors[index].offsetHeight);

				// Remove any inherited margin-top by explicitly setting it to 0 and apply custom styles
				timelineConnectors[index].style.cssText = `
                    position: absolute !important;
                    top: ${currentBottom}px !important;
                    //background-color: green !important;
                    left: 50% !important;
                    font-size: 1rem !important;
                    transform: translateX(-50%) !important;
                    text-align: center !important;
                    opacity: 1 !important;
                    margin-top: 0 !important; /* Ensure no margin-top is inherited */
                `;
				currentBottom += connectorHeight; // Update bottom after the connector
				//console.log("currentBottom after connector: " + currentBottom);
			}

			lastBottom = currentBottom; // Store last bottom position
			//console.log("lastBottom after this iteration: " + lastBottom);

			// After completing the iteration, add a larger gap between loops
			currentBottom += ELEMENT_GAP_BETWEEN_LOOPS;
			//console.log("currentBottom after adding gap between loops: " + currentBottom);
		});

		// Adjust container height dynamically
		timelineContainer.style.cssText = `
            height: ${lastBottom + 50}px !important;
            position: relative !important;
        `;
	}

	alignTimeline();
	window.addEventListener("resize", alignTimeline);
});


//Shuffle text effect for nav bar


document.querySelectorAll(".shuffle-text > a").forEach(textElement => {
	let originalText = textElement.textContent;
	let words = originalText.split(" ");
	let shuffleIntervals = []; // Store interval references to stop them
	let shuffleTimeout; // Store timeout reference

	// Wrap each letter in a span
	textElement.innerHTML = words.map(word =>
		word.split("").map((char, index) =>
			`<span data-char="${char}" data-index="${index}">${char}</span>`
		).join("")
	).join(" "); // Maintain spaces

	let letters = [...textElement.querySelectorAll("span")];

	function startShuffling() {
		stopShuffling(); // Ensure no previous shuffle runs

		words.forEach(word => {
			let wordStartIndex = letters.findIndex(span => span.dataset.char === word[0]);
			let wordLetters = letters.slice(wordStartIndex, wordStartIndex + word.length);
			let firstLetter = wordLetters.shift(); // Keep first letter stable

			let originalOrder = wordLetters.map(span => span.textContent);

			let interval = setInterval(() => {
				let shuffledIndexes = [...Array(wordLetters.length).keys()];
				for (let i = shuffledIndexes.length - 1; i > 0; i--) {
					let j = Math.floor(Math.random() * (i + 1));
					[shuffledIndexes[i], shuffledIndexes[j]] = [shuffledIndexes[j], shuffledIndexes[i]];
				}

				let shuffledText = shuffledIndexes.map(i => originalOrder[i]);
				wordLetters.forEach((span, i) => {
					span.textContent = shuffledText[i];
				});
			}, 50); // Fast shuffle every 50ms

			shuffleIntervals.push(interval);
		});

		// Automatically stop shuffling after 0.3 seconds
		shuffleTimeout = setTimeout(stopShuffling, 300);
	}

	function stopShuffling() {
		shuffleIntervals.forEach(clearInterval);
		shuffleIntervals = [];
		clearTimeout(shuffleTimeout);
		restoreOriginal();
	}

	function restoreOriginal() {
		letters.forEach(span => {
			span.textContent = span.dataset.char; // Reset to original letter
		});
	}

	textElement.addEventListener("mouseenter", startShuffling);
	textElement.addEventListener("mouseleave", stopShuffling);
});

//shuffle text effect that triggers when in view and when hovered both.

document.querySelectorAll(".header-shuffle-text").forEach(textElement => {
	let originalText = textElement.textContent;
	let words = originalText.split(" ");
	let shuffleIntervals = []; // Store interval references to stop them
	let shuffleTimeout; // Store timeout reference
	let visibilityTimeout; // Store timeout for delayed animation

	// Wrap each letter in a span
	textElement.innerHTML = words.map(word =>
		word.split("").map((char, index) =>
			`<span data-char="${char}" data-index="${index}">${char}</span>`
		).join("")
	).join(" "); // Maintain spaces

	let letters = [...textElement.querySelectorAll("span")];

	function startShuffling() {
		stopShuffling(); // Ensure no previous shuffle runs

		words.forEach(word => {
			let wordStartIndex = letters.findIndex(span => span.dataset.char === word[0]);
			let wordLetters = letters.slice(wordStartIndex, wordStartIndex + word.length);
			let firstLetter = wordLetters.shift(); // Keep first letter stable

			let originalOrder = wordLetters.map(span => span.textContent);

			let interval = setInterval(() => {
				let shuffledIndexes = [...Array(wordLetters.length).keys()];
				for (let i = shuffledIndexes.length - 1; i > 0; i--) {
					let j = Math.floor(Math.random() * (i + 1));
					[shuffledIndexes[i], shuffledIndexes[j]] = [shuffledIndexes[j], shuffledIndexes[i]];
				}

				let shuffledText = shuffledIndexes.map(i => originalOrder[i]);
				wordLetters.forEach((span, i) => {
					span.textContent = shuffledText[i];
				});
			}, 50); // Fast shuffle every 50ms

			shuffleIntervals.push(interval);
		});

		// Automatically stop shuffling after 0.3 seconds
		shuffleTimeout = setTimeout(stopShuffling, 400);
	}

	function stopShuffling() {
		shuffleIntervals.forEach(clearInterval);
		shuffleIntervals = [];
		clearTimeout(shuffleTimeout);
		restoreOriginal();
	}

	function restoreOriginal() {
		letters.forEach(span => {
			span.textContent = span.dataset.char; // Reset to original letter
		});
	}

	// 🔥 Trigger animation with a 1-second delay when element enters viewport
	let observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				clearTimeout(visibilityTimeout); // Prevent duplicate triggers
				visibilityTimeout = setTimeout(() => {
					startShuffling(); // Run animation after 1 second
				}, 1000);
			}
		});
	}, { threshold: 0.5 }); // Start when at least 50% visible

	observer.observe(textElement);

	// Keep hover functionality as is
	textElement.addEventListener("mouseenter", startShuffling);
	textElement.addEventListener("mouseleave", stopShuffling);
});


document.addEventListener("DOMContentLoaded", () => {
	const tickerWrapper = document.querySelector(".ticker-wrapper");
	let tickerItems = Array.from(document.querySelectorAll(".ticker-text"));
  
	function calculateSpacing() {
	  let maxHeight = 0;
	  tickerItems.forEach((item) => {
		const rect = item.getBoundingClientRect();
		maxHeight = Math.max(maxHeight, rect.height); // Capture the real height
	  });
	  return maxHeight * 0.5; // Adjusted spacing for proper visibility
	}
  
	function setupTicker() {
	  requestAnimationFrame(() => {
		let dynamicSpacing = calculateSpacing();
  
		tickerItems.forEach((item) => {
		  item.style.marginBottom = `${dynamicSpacing}px`;
		});
  
		let itemHeight = tickerItems[0].offsetHeight + dynamicSpacing;
		let totalHeight = itemHeight * tickerItems.length;
  
		// Clear previous duplicate and ensure infinite loop works properly
		tickerWrapper.innerHTML = "";
		let originalItems = tickerItems.map(item => item.outerHTML).join('');
		tickerWrapper.innerHTML = originalItems + originalItems; // Duplicate content once
		tickerItems = Array.from(document.querySelectorAll(".ticker-text"));
  
		gsap.set(".ticker-wrapper", { y: 0 });
  
		gsap.to(".ticker-wrapper", {
		  y: -totalHeight,
		  duration: tickerItems.length * 1, // Smooth scrolling speed
		  ease: "none",
		  repeat: -1,
		});
	  });
	}
  
	setupTicker();
  
	// Recalculate spacing on window resize with debounce to prevent crashes
	let resizeTimeout;
	window.addEventListener("resize", () => {
	  clearTimeout(resizeTimeout);
	  resizeTimeout = setTimeout(() => {
		setupTicker();
	  }, 300);
	});
  
	// Fix font rendering issue on iOS (prevents text overlap on first load)
	document.fonts.ready.then(() => {
	  setupTicker();
	});
  });
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".menu-link");
    const overlay = document.querySelector(".page-transition-overlay");
    const sidebar = document.querySelector(".sidebar");
    const ticker = document.querySelector(".Header-ticker");
    let iframeContainer = document.createElement("div"); // Wrapper for iframe
    let iframe = null; // Global iframe reference
    document.body.appendChild(iframeContainer);

    function getTickerWidth() {
        return ticker ? ticker.offsetWidth : 100;
    }

    function adjustOverlayPosition() {
        let tickerWidth = getTickerWidth();
        document.documentElement.style.setProperty("--ticker-width", `${tickerWidth}px`);
    }

    function closeSidebar() {
        sidebar.classList.remove("change");
    }

    function loadPageInIframe(url, updateHistory = true) {
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100vw";
            iframe.style.height = "100vh";
            iframe.style.opacity = "0"; // Hide initially
            iframe.style.pointerEvents = "none"; // Prevent interactions
            iframe.style.zIndex = "9980"; // Place it behind overlay
            iframeContainer.appendChild(iframe);
        }

        iframe.src = url;
        iframe.onload = () => {
            iframe.style.opacity = "1"; // Reveal iframe
            iframe.style.transition = "opacity 0.5s ease-in-out"; // Smooth fade-in effect
            iframe.style.pointerEvents = "auto"; // Enable interactions

            // ** Always Update URL **
            if (updateHistory) {
                history.pushState({ path: url }, "", url);
            }

            // ** Reattach event listeners inside the iframe **
            reattachIframeListeners();
        };
    }

    function handleMenuLinkClick(event) {
        event.preventDefault();
        let targetUrl = event.currentTarget.getAttribute("href");

        adjustOverlayPosition();

        // Step 1: Shrink menu items
        menuLinks.forEach(item => item.classList.add("shrink"));

        // Step 2: Cover the screen with the overlay
        setTimeout(() => {
            overlay.classList.add("active");
        }, 400);

        // Step 3: Close sidebar after overlay covers
        setTimeout(() => {
            closeSidebar();
        }, 1400);

        // Step 4: Load new page inside iframe & update URL
        setTimeout(() => {
            loadPageInIframe(targetUrl, true);
        }, 2000);

        // Step 5: Move overlay back after replacing content
        setTimeout(() => {
            overlay.classList.add("reverse");
        }, 2500);

        // Step 6: Remove overlay after transition completes
        setTimeout(() => {
            overlay.classList.remove("active", "reverse");
            menuLinks.forEach(item => item.classList.remove("shrink")); // Restore menu
			//location.reload();
        }, 3400);
    }

    function reattachIframeListeners() {
        // Ensure menu links work inside the iframe
        if (!iframe || !iframe.contentWindow.document) return;

        let iframeLinks = iframe.contentWindow.document.querySelectorAll(".menu-link");
        iframeLinks.forEach(link => {
            link.removeEventListener("click", handleMenuLinkClick);
            link.addEventListener("click", handleMenuLinkClick);
        });
    }

    function reattachEventListeners() {
        // Ensure menu links work on the main page
        document.querySelectorAll(".menu-link").forEach(link => {
            link.removeEventListener("click", handleMenuLinkClick); // Prevent duplicate listeners
            link.addEventListener("click", handleMenuLinkClick);
        });
    }

    // ** Handle browser back/forward navigation **
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.path) {
            loadPageInIframe(event.state.path, false);
        }
    });

    // Attach event listeners initially
    reattachEventListeners();

    window.addEventListener("resize", adjustOverlayPosition);
});


/* Prevent iframe dragging without blocking scrolling */

document.addEventListener("touchmove", (event) => {
    if (event.target.tagName === "IFRAME") {
        // Allow vertical scrolling but prevent iframe from shifting sideways
        if (event.touches.length === 1) {
            let touch = event.touches[0];
            if (Math.abs(touch.pageX - touch.clientX) > 10) {
                event.preventDefault(); // Prevent side movement
            }
        }
    }
}, { passive: false });
