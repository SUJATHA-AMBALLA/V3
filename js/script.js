document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 2. Dashboard Tabs ---
    window.openDashboardTab = function(evt, tabName) {
        const panes = document.querySelectorAll('.dash-pane');
        panes.forEach(pane => pane.classList.remove('active'));

        const buttons = document.querySelectorAll('.dash-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        const target = document.getElementById(tabName);
        if(target) target.classList.add('active');
        
        if(evt && evt.currentTarget) {
            evt.currentTarget.classList.add('active');
        }
    };

    // --- 3. Projects Slider (UPDATED) ---
    const track = document.getElementById('projectTrack');
    
    // Only run if the slider exists on the page
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('nextProject');
        const prevButton = document.getElementById('prevProject');
        
        let currentSlideIndex = 0;

        function updateSliderPosition() {
            // Get width of one slide dynamically
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (slideWidth * currentSlideIndex) + 'px)';
        }

        // Next Button
        if(nextButton) {
            nextButton.addEventListener('click', () => {
                currentSlideIndex++;
                if (currentSlideIndex >= slides.length) {
                    currentSlideIndex = 0; // Loop back to start
                }
                updateSliderPosition();
            });
        }

        // Prev Button
        if(prevButton) {
            prevButton.addEventListener('click', () => {
                currentSlideIndex--;
                if (currentSlideIndex < 0) {
                    currentSlideIndex = slides.length - 1; // Loop to end
                }
                updateSliderPosition();
            });
        }

        // Recalculate on window resize to keep alignment correct
        window.addEventListener('resize', updateSliderPosition);
    }


    // --- 4. Stats Counter ---
    const statsSection = document.querySelector('#statsSection');
    const counters = document.querySelectorAll('.counter');
    let started = false;

    function startCounting() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500; 
            const increment = target / (duration / 16); 

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    counter.classList.add('pulse-active');
                }
            };
            updateCounter();
        });
    }

    if(statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                startCounting();
                started = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});