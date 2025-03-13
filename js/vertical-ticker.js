// Fetch sidebar HTML dynamically and insert it into the page
fetch('vertical-ticker.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('Header-ticker-container').innerHTML = data;
        console.log('vertical-ticker loaded?:\n\n', data);
        // Now, reinitialize the ticker animation
        // Wait a bit for the DOM to fully update before initializing the animation
        setTimeout(() => {
            initializeTickerAnimation();
            setTickerTextColor("black"); // Sets text color to black

        }, 100);

    })
    .catch(error => {
        console.error('Error loading vertical-ticker:', error);
    });

function initializeTickerAnimation() {

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

}

function setTickerTextColor(color) {
    document.querySelectorAll(".ticker-text").forEach(item => {
        item.style.color = color;
    });
}
