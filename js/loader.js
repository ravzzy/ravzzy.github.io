
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