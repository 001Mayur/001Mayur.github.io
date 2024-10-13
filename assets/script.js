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

document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.category-link').forEach(item => item.classList.remove('active'));

        // Add active class to the clicked link
        this.classList.add('active');

        // Get the category from data-category attribute
        const category = this.getAttribute('data-category');

        // Hide all skill sets
        document.querySelectorAll('.skill-set').forEach(set => set.style.display = 'none');

        // Show the selected skill set
        document.getElementById(category).style.display = 'block';
    });
});
