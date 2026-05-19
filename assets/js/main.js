// 1. Scroll animations
const animateSections = () => {
    const sections = document.querySelectorAll('.section-animate');
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            section.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', animateSections);
window.addEventListener('resize', animateSections);
animateSections();

// 2. Carousel logic (mobile only)
let carouselInitialized = false;
function initCarousels() {
    if (window.innerWidth > 768) {
        // Remove carousel wrappers if any
        document.querySelectorAll('.carousel-container').forEach(container => {
            const grid = container.querySelector('.services-grid, .portfolio-grid, .team-grid, .blog-posts, .projects-grid');
            if (grid) {
                container.parentNode.insertBefore(grid, container);
                container.remove();
            }
        });
        carouselInitialized = false;
        return;
    }
    if (carouselInitialized) return;

    const gridSelectors = ['.services-grid', '.portfolio-grid', '.team-grid', '.blog-posts', '.projects-grid'];
    gridSelectors.forEach(selector => {
        const grids = document.querySelectorAll(selector);
        grids.forEach(grid => {
            if (grid.parentElement.classList.contains('carousel-container')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-container';
            grid.parentNode.insertBefore(wrapper, grid);
            wrapper.appendChild(grid);

            // Arrows
            const leftArrow = document.createElement('div');
            leftArrow.className = 'carousel-arrow left';
            leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
            const rightArrow = document.createElement('div');
            rightArrow.className = 'carousel-arrow right';
            rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
            wrapper.appendChild(leftArrow);
            wrapper.appendChild(rightArrow);

            const scrollAmount = () => {
                const card = grid.querySelector(':scope > *');
                if (!card) return 0;
                const cardWidth = card.offsetWidth;
                const gap = parseInt(getComputedStyle(grid).gap) || 0;
                return cardWidth + gap;
            };
            leftArrow.addEventListener('click', () => {
                grid.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            });
            rightArrow.addEventListener('click', () => {
                grid.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
            grid.scrollLeft = 0;
        });
    });
    carouselInitialized = true;
}

window.addEventListener('DOMContentLoaded', initCarousels);
window.addEventListener('resize', () => {
    initCarousels();  // re-run to add/remove wrappers on resize
});

// 3. Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const service = document.getElementById('service')?.value;
        const message = document.getElementById('message')?.value.trim();
        if (!name || !email || !subject || !service || !message) {
            alert('Please fill in all fields.');
            return;
        }
        alert('Thank you! We will get back to you soon.');
        contactForm.reset();
    });
}

// 4. FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        answer.classList.toggle('show');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        // Close other open answers (optional)
        document.querySelectorAll('.faq-question').forEach(other => {
            if (other !== btn) {
                const otherAnswer = other.nextElementSibling;
                const otherIcon = other.querySelector('i');
                otherAnswer.classList.remove('show');
                otherIcon.classList.add('fa-chevron-down');
                otherIcon.classList.remove('fa-chevron-up');
            }
        });
    });
});

// 5. Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
            alert('Thanks for subscribing!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}