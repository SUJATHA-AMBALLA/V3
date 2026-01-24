/* =========================================
   2. MOBILE MENU & DROPDOWNS
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const closeMenu = document.querySelector(".close-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    function openMenu() {
        navMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    function closeMenuFunc() {
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    if(hamburger) hamburger.addEventListener("click", openMenu);
    if(closeMenu) closeMenu.addEventListener("click", closeMenuFunc);
    if(menuOverlay) menuOverlay.addEventListener("click", closeMenuFunc);

    // Close menu when clicking actual links
    document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", closeMenuFunc));

    // Mobile Dropdown Logic
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            if(window.innerWidth <= 900) {
               e.stopPropagation();
               dropdownMenu.classList.toggle('show-mobile');
            }
        });
    }
});

/* =========================================
   3. PROJECT SLIDER (AUTO PLAY ENABLED)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('projectTrack');
    if(!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextProject');
    const prevBtn = document.getElementById('prevProject');
    let currentIndex = 0;
    let autoPlayInterval;

    function updateSlidePosition() {
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }

    function moveToNextSlide() {
        if (currentIndex === slides.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex--;
        }
        updateSlidePosition();
    }

    // Initialize Auto Play (Runs every 4 seconds)
    function startAutoPlay() {
        autoPlayInterval = setInterval(moveToNextSlide, 4000); 
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveToNextSlide();
            resetAutoPlay(); 
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveToPrevSlide();
            resetAutoPlay(); 
        });
    }

    // Start the loop
    startAutoPlay();
});

/* =========================================
   4. STATS COUNTER
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const options = { threshold: 0.5 };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 50; 
            
            let c = 0;
            const updateCounter = () => {
                c += increment;
                if(c < target) {
                    counter.innerText = Math.ceil(c);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
      });
    }, options);

    counters.forEach(counter => { observer.observe(counter); });
});