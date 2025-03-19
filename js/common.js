/* Author - ravzzy */

const loaderImage = document.querySelector('.loader-img');
    
    gsap.to(loaderImage, {
      rotation: 360,    // Rotate 360 degrees
      duration: 5,      // Duration of rotation
      repeat: 9999,       // Infinite repeat for continuous rotation
      ease: "linear"    // Smooth, continuous rotation
    });

    // Wait for the window to load all resources
    window.addEventListener('load', () => {
      // Once everything is loaded, stop the animation or change it
      gsap.to(loaderImage, {
        rotation: 0,     // Reset rotation
        duration: 1,     // Transition duration for resetting
        repeat: 0,       // Stop repeating once fully loaded
        onComplete: () => {
          console.log('All resources loaded, rotation stopped.');
        }
      });
    });

	window.addEventListener('load', function() {
		// This code runs when everything has loaded: HTML, CSS, images, etc.
		const loadingScreen = document.getElementById('loader');
		const topper = document.getElementById('topper');

	  
		// Hide the loading screen
    if (loadingScreen != null)
		loadingScreen.style.visibility = 'hidden';
		
	  
		// Show the content
    if (topper != null)
		topper.style.visibility = 'visible';
	  
		// Re-enable scrolling by setting body overflow back to 'auto'
		document.body.style.overflow = 'auto';
	  });
	  


window.addEventListener("load", function () {
	document.querySelector(".logo-image").style.opacity = "1";
	document.querySelector(".designer-footer").style.opacity = "1";
});


//shuffle text effect that triggers when in view and when hovered both.

document.querySelectorAll(".header-shuffle-text").forEach(textElement => {
	// Check if the device is mobile using user-agent string
	const isMobile = /Mobi|Android/i.test(navigator.userAgent);

	if (!isMobile) { 
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
	}
});
/*
document.addEventListener("DOMContentLoaded", () => {
    const tickerWrapper = document.querySelector(".ticker-wrapper");
    let tickerItems = Array.from(document.querySelectorAll(".ticker-text"));
    let counter = 0; // Initialize counter to track executions
    let resizeTimeout;
    let isAnimating = false;

    function calculateSpacing() {
        let maxHeight = 0;
        tickerItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            maxHeight = Math.max(maxHeight, rect.height); // Capture the real height
        });
        return maxHeight * 0.5; // Adjusted spacing for proper visibility
    }

    function forceReflow() {
        // Accessing offsetHeight forces a reflow in browsers
        tickerWrapper.offsetHeight; // This will force the browser to reflow
    }

    function setupTicker() {
        // If the counter has already exceeded the threshold, prevent further execution
        if (counter >= 50) return; // Stop execution once the counter reaches 50
        counter++;

        // Throttle animation updates to reduce frequency
        if (isAnimating) return; // Prevent multiple triggers
        isAnimating = true;

        requestAnimationFrame(() => {
            let dynamicSpacing = calculateSpacing();

            // Set the margin for all ticker items
            tickerItems.forEach((item) => {
                item.style.marginBottom = `${dynamicSpacing}px`;
            });

            let itemHeight = tickerItems[0].offsetHeight + dynamicSpacing;
            let totalHeight = itemHeight * tickerItems.length;

            // Clear previous duplicate content and ensure infinite loop works properly
            tickerWrapper.innerHTML = "";
            let originalItems = tickerItems.map(item => item.outerHTML).join('');
            tickerWrapper.innerHTML = originalItems + originalItems; // Duplicate content once
            tickerItems = Array.from(document.querySelectorAll(".ticker-text"));

            // Force reflow to ensure layout is updated
            forceReflow();

            // Reset the position of the ticker wrapper
            gsap.set(".ticker-wrapper", { y: 0 });

            // GSAP animation to scroll the ticker and stop after 2 loops
            const tickerAnimation = gsap.to(".ticker-wrapper", {
                y: -totalHeight,
                duration: tickerItems.length * 1, // Smooth scrolling speed
                ease: "none",
                repeat: 50, // Repeat once (50 loops total: 1 initial + 1 repeat)
                onComplete: () => {
                    console.log("Ticker animation completed 50 loops.");
                    gsap.killTweensOf(".ticker-wrapper"); // Stop the animation completely
                    isAnimating = false; // Reset the flag to allow re-triggering
                }
            });
        });
    }

    // Initial setup of the ticker
    setupTicker();

    // Recalculate spacing on window resize with optimized debouncing and requestAnimationFrame
    window.addEventListener("resize", () => {
        cancelAnimationFrame(resizeTimeout);
        resizeTimeout = requestAnimationFrame(() => {
            setupTicker();
        });
    });

    // Fix font rendering issue on iOS (prevents text overlap on first load)
    document.fonts.ready.then(() => {
        setupTicker();
    });
});
*/

//Print Viewport Dimensions

function printViewportDimensions() {
	const width = window.innerWidth;   // Viewport width
	const height = window.innerHeight; // Viewport height
	console.log("------VIEWPORT SIZES------")
	console.log(`Viewport Width: ${width}px`);
	console.log(`Viewport Height: ${height}px`);
	console.log("--------------------------")
}

// Print viewport dimensions when the page loads
printViewportDimensions();

// Print viewport dimensions whenever the window is resized
window.addEventListener('resize', printViewportDimensions);