// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#hero"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight the navigation bar on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Hero h1 typing effect
    const heroH1 = document.querySelector('.hero-h1 span');
    const heroText = "Discover AI Brilliance";
    typeText(heroH1, heroText);

    // Hero paragraph typing effect
    const heroParagraph = document.querySelector('.hero-content p');
    const heroParagraphText = ": A Warm Welcome to Mayur's Portfolio";
    typeText(heroParagraph, heroParagraphText);
});

function typeText(element, text) {
    // Clear the existing text
    element.innerHTML = "";

    // Create a span for each character and line break, and append to the element
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement("span");
        if (text[i] === '\n') {
            charSpan.innerHTML = '<br>';
        } else {
            charSpan.innerText = text[i];
            charSpan.style.animation = `typewriter 1s ${i * 0.05}s linear both, colorChange 0.5s ${i * 0.05}s both`;
        }
        element.appendChild(charSpan);
    }
}
    



// Slider (all Slides in a container)
const slider = document.querySelector(".slider");
// All trails
const trail = document.querySelector(".trail").querySelectorAll("div");

// Transform value
let value = 0;
// trail index number
let trailValue = 0;
// interval (Duration)
let interval = 4000;

// Throttle function
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Function to slide forward
const slide = (condition) => {
    // Clear interval
    clearInterval(start);
    // Update value and trailValue
    condition === "increase" ? initiateINC() : initiateDEC();
    // Move slide
    move(value, trailValue);
    // Restart Animation
    animate();
    // Start interval for slides back 
    start = setInterval(() => slide("increase"), interval);
};

// Function for increase (forward, next) configuration
const initiateINC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"));
    // Increase transform value
    value === 80 ? value = 0 : value += 20;
    // Update trailValue based on value
    trailUpdate();
};

// Function for decrease (backward, previous) configuration
const initiateDEC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"));
    // Decrease transform value
    value === 0 ? value = 80 : value -= 20;
    // Update trailValue based on value
    trailUpdate();
};

// Function to transform slide 
const move = (S, T) => {
    // Transform slider
    slider.style.transform = `translateX(-${S}%)`;
    // Add active class to the current trail
    trail[T].classList.add("active");
};
const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.inOut" } });
tl.from(".bg", { x: "-100%", opacity: 0 })
    .from(".animation-container p", { opacity: 0 }, "-=0.3")
    .from(".animation-container h1", { opacity: 0, y: "30px" }, "-=0.3")
    .from(".animation-container button", { opacity: 0, y: "-40px" }, "-=0.8");

// Function to restart animation
const animate = () => tl.restart();

// Function to update trailValue based on slide value
const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0;
    } else if (value === 20) {
        trailValue = 1;
    } else if (value === 40) {
        trailValue = 2;
    } else if (value === 60) {
        trailValue = 3;
    } else {
        trailValue = 4;
    }
};

// Start interval for slides
let start = setInterval(() => slide("increase"), interval);

// Next and Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name ("next" and "prev")
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"));
});

// Function to slide when trail is clicked
const clickCheck = (e) => {
    // Clear interval
    clearInterval(start);
    // Remove active class from all trails
    trail.forEach(cur => cur.classList.remove("active"));
    // Get selected trail
    const check = e.target;
    // Add active class
    check.classList.add("active");

    // Update slide value based on the selected trail
    if (check.classList.contains("box1")) {
        value = 0;
    } else if (check.classList.contains("box2")) {
        value = 20;
    } else if (check.classList.contains("box3")) {
        value = 40;
    } else if (check.classList.contains("box4")) {
        value = 60;
    } else {
        value = 80;
    }
    // Update trail based on value
    trailUpdate();
    // Transform slide
    move(value, trailValue);
    // Start animation
    animate();
    // Start interval
    start = setInterval(() => slide("increase"), interval);
};

// Add function to all trails
trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)));

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth;

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // Get the touch position of X on the screen
        start = e.touches[0].clientX;
        // (each slide width) The width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth / trail.length;
    }, { passive: true });
    
    // Do this on touchDrag on screen
    slider.addEventListener("touchmove", (e) => {
        // Prevent default function
        e.preventDefault();
        // Get the touch position of X on the screen when dragging stops
        move = e.touches[0].clientX;
        // Subtract initial position from end position and save to change variable
        change = start - move;
    }, { passive: true });

    const mobile = (e) => {
        // If change is greater than a quarter of sliderWidth, next else do NOTHING
        change > (sliderWidth / 4) ? slide("increase") : null;
        // If change * -1 is greater than a quarter of sliderWidth, prev else do NOTHING
        (change * -1) > (sliderWidth / 4) ? slide("decrease") : null;
        // Reset all variables to 0
        [start, move, change, sliderWidth] = [0, 0, 0, 0];
    };
    // Call mobile on touch end
    slider.addEventListener("touchend", mobile);
})();

// Pause on Hover
slider.addEventListener("mouseenter", () => clearInterval(start));
slider.addEventListener("mouseleave", () => start = setInterval(() => slide("increase"), interval));

// Responsive Adjustments
const updateResponsiveValues = () => {
    // Adjust values based on screen size
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
        interval = 5000; // Adjust as needed
    } else {
        interval = 4000; // Default interval
    }
};

// Update responsive values on window resize
window.addEventListener("resize", updateResponsiveValues);

// Initial update
updateResponsiveValues();

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        document.body.style.opacity = 1; // Fade in the entire body
        document.querySelector('.skills-container').style.opacity = 1; // Fade in the skills container
        animateSkillCards();
    }, 500); // Adjust the delay as needed
});

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1; // Fade in individual skill cards
            const skillText = card.querySelector('.skill-text');
            const percentage = card.querySelector('.percentage');
            if (skillText && percentage) {
                skillText.style.opacity = 1; // Fade in the skill text
                percentage.style.opacity = 1; // Fade in the percentage
                fillProgressBar(card);
            }
        }, (index + 1) * 500); // Adjust the delay between each card as needed
    });
}

function fillProgressBar(card) {
    const percentage = card.style.getPropertyValue('--percentage');
    if (percentage) {
        card.style.setProperty('--percentage', '0'); // Reset to 0 before animation
        card.style.setProperty('--percentage', percentage); // Start the fill animation
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const paragraph = document.querySelector(".about p");
    const text = paragraph.innerText;

    // Clear the existing text
    paragraph.innerHTML = "";

    // Create a span for each character and line break, and append to the paragraph
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement("span");
        if (text[i] === '\n') {
            charSpan.innerHTML = '<br>';
        } else {
            const isName = i >= 10 && i < 39; // Adjust the range based on the position of "Mayur Nandkishor Phatanagre" in your text
            charSpan.innerText = text[i];
            charSpan.style.animation = `typewriter 1s ${i * 0.05}s linear both, bounce 1s ${i * 0.05}s infinite alternate ease-out, colorChange 0.5s ${i * 0.05}s both`;
            if (isName) {
                charSpan.style.fontWeight = 'bold';
            }
        }
        paragraph.appendChild(charSpan);
    }
});
