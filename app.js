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


const rgb = {
	r: 255,
	g: 255,
	b: 255,
	rT: 23,
	gT: 16,
	bT: 16,
}

/*
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

*/
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
	//logMessage("🎨 Detected Section Background Color: " + bgColor);
	console.log("🎨 Detected Section Background Color: " + bgColor);

	// Convert RGBA to brightness
	function getBrightness(rgba) {
		let match = rgba.match(/\d+(\.\d+)?/g);
		if (!match || match.length < 3) {
			//logMessage("❌ Failed to extract RGB values!");
			console.log("❌ Failed to extract RGB values!");
			return 255;
		}

		let [r, g, b, a = 1] = match.map(Number);
		//logMessage(`🔍 Extracted RGBA: R=${r}, G=${g}, B=${b}, A=${a}`);
		console.log(`🔍 Extracted RGBA: R=${r}, G=${g}, B=${b}, A=${a}`);


		// Blend with white if transparent
		let blendedR = Math.round(r * a + 255 * (1 - a));
		let blendedG = Math.round(g * a + 255 * (1 - a));
		let blendedB = Math.round(b * a + 255 * (1 - a));

		let brightness = (blendedR * 299 + blendedG * 587 + blendedB * 114) / 1000;
		//logMessage(`🔆 Corrected Brightness: ${brightness} (0 = black, 255 = white)`);
		console.log(`🔆 Corrected Brightness: ${brightness} (0 = black, 255 = white)`);
		return brightness;
	}

	let brightness = getBrightness(bgColor);

	// Change menu link text color
	menuLinks.forEach(link => {
		link.style.color = brightness < 150 ? "white" : "black";
		console.log("✅ Updated menu link text color:", link.style.color);
	});

	// Change hamburger menu lines (X icon inside menu)
	menuLines.forEach(line => {
		line.style.backgroundColor = brightness < 150 ? "white" : "black";
		console.log("✅ Updated hamburger menu lines:", line.style.color);
	});


	console.log("Current Navbar Background Color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-bg-color"));
	// ✅ Update CSS Variables Instead of Inline Styles
	document.documentElement.style.setProperty("--nav-bg-color", brightness < 150 ? "white" : "black");
	document.documentElement.style.setProperty("--nav-text-color", brightness < 150 ? "black" : "white");
	// ✅ Update Hover Color for Better Contrast
	document.documentElement.style.setProperty("--nav-hover-color", brightness < 150 ? "grey" : "grey");
	// ✅ Update CSS Variable for Footer Text Color
	document.documentElement.style.setProperty("--footer-text-color", brightness < 150 ? "white" : "black");

	console.log("Updated --nav-bg-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-bg-color"));
	console.log("Updated --nav-text-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-text-color"));
	console.log("Updated --nav-hover-color:", getComputedStyle(document.documentElement).getPropertyValue("--nav-hover-color"));
	console.log("Updated --footer-text-color:", getComputedStyle(document.documentElement).getPropertyValue("--footer-text-color"));

	// ✅ Apply to `.nav-menu a`
	navLinks.forEach(link => {
		link.style.color = "var(--nav-text-color)"; // Use CSS variable
		console.log("✅ Updated Navbar Text Color:", link.style.color);
	});

	// Change close button (X) when sidebar is open
	if (document.querySelector(".container").classList.contains("change")) {
		hamburgerMenu.style.color = brightness < 150 ? "white" : "black"; // Changes the ✖ icon color
		console.log("✅ Updated ✖ icon colour:", hamburgerMenu.style.color);

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
		  initialFontSize = 20;
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
        sidebar.style.width = `calc(100vw - ${tickerWidth}px)`;
    }
}

// Run function on page load and window resize
window.addEventListener("load", adjustSidebarWidth);
window.addEventListener("resize", adjustSidebarWidth);
