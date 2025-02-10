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
	for (let i = initialFrame; i <= FRAMES; i++) { // 88 is the first frame
		imgPaths.push(`images/out-${i}.png`)
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
	frame: (FRAMES-initialFrame) - 1,
	snap: 'frame',
	// ease: 'none',
	scrollTrigger: {
		// trigger: 'canvas',
		start: 'top top',
		end: '+=700%',
		scrub: true,
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

