// Hero - Slide-in effect for hero text
window.addEventListener('load', function() {
    document.querySelector('.hero-text').style.left = '40px';
});

window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (window.scrollY > 100) {
        scrollIndicator.style.display = 'none';
    } else {
        scrollIndicator.style.display = 'flex';
    }
});

// Toggle Music
document.addEventListener('DOMContentLoaded', function () {
    const musicControlButton = document.getElementById('musicControl');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    let isPlaying = false;

    // Add event listener for the music control button
    musicControlButton.addEventListener('click', function () {
        if (isPlaying) {
            backgroundMusic.pause();
            musicControlButton.setAttribute('label', 'Play Music');
            isPlaying = false;
        } else {
            backgroundMusic.play();
            musicControlButton.setAttribute('label', 'Pause Music');
            isPlaying = true;
        }
    });
});

// Types of Fitments
    const slider = document.querySelector('.fitments-slider');
    const fitments = document.querySelectorAll('.fitment');
    const progress = document.querySelector('.progress');
    const totalFitments = fitments.length;

    let currentIndex = 0;

    // Clone first and last fitments for infinite effect
    const firstClone = fitments[0].cloneNode(true);
    const lastClone = fitments[totalFitments - 1].cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, fitments[0]);

    // Calculate and update progress bar width to snap
    function updateProgressBar() {
        const effectiveIndex = (currentIndex % totalFitments) + 1;
        const progressWidth = (effectiveIndex / totalFitments) * 100;
        progress.style.width = `${progressWidth}%`;
    }

    // Update slider position
    function updateSlider() {
        const offset = (currentIndex + 1) * 50; 
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${offset}%)`;
        updateProgressBar();
    }

    // Move to next or previous fitment
    function nextFitment() {
        currentIndex++;
        updateSlider();
        if (currentIndex === totalFitments) {
            // Smooth transition to the first fitment
            setTimeout(() => {
                slider.style.transition = 'none'; 
                currentIndex = 0;
                slider.style.transform = `translateX(-50%)`; 
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease'; 
                    updateSlider();
                }, 50); 
            }, 500); 
        }
    }

    function prevFitment() {
        currentIndex--;
        updateSlider();
        if (currentIndex < 0) {
            // Smooth transition to the last fitment
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = totalFitments - 1;
                slider.style.transform = `translateX(-${totalFitments * 50}%)`; 
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease';
                    updateSlider();
                }, 50);
            }, 500); 
        }
    }

    // Event listeners for buttons
    document.querySelector('.next-btn').addEventListener('click', nextFitment);
    document.querySelector('.prev-btn').addEventListener('click', prevFitment);

    updateSlider();

// Safety and Compliance Section
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        card.classList.toggle('flipped'); 
    });
});

// Top Car of the Month
/* -------- top car of the month --------- */
// Select the first (and only) topcar-slider element
const track = document.querySelector(".topcar-slider");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  // Apply the transform directly to the track (slider container)
  track.style.transform = `translateX(${nextPercentage}%)`;  
  
  // Animate the images with object position change
  for(const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;  
  }
};

// -- touch events --
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


// Masonry Gallery
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    const images = document.querySelectorAll('.masonry-layout img');

    images.forEach((img) => {
        gsap.fromTo(img, {
            opacity: 0,
            transform: "rotate3d(-2, 0, 0, 45deg)",
        }, {
            opacity: 1,
            duration: 0.4,
            transform: "rotate3d(0, 0, 0, 0)",
            scrollTrigger: {
                trigger: img,
                start: "top 100%",
                end: "top 20%",
                toggleActions: "play none play none",
                markers: false,
                scrub: 0.2,
            }
        });
    });
});

// About
console.clear();

gsap.registerPlugin(SplitText, ScrollTrigger);

const split = new SplitText(".wrapper p", {
  type: "words",
  wordsClass: "word"
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#textSection",
    start: "top top",  
    end: "+=150%",     
    pin: true,         
    pinSpacing: true,  
    scrub: true,       
    markers: false
  }
})
.set(split.words, { opacity: 1, stagger: 0.1 }, 0.1);
