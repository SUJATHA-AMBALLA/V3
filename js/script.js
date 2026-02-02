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

document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.sol-nav-btn');
    const tabContents = document.querySelectorAll('.sol-tab-content');

    function switchTab(targetId) {
        // Remove active classes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active classes
        const targetBtn = document.querySelector(`[data-target="${targetId}"]`);
        const targetContent = document.getElementById(targetId);

        if (targetBtn && targetContent) {
            targetBtn.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Click events for the side panel
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchTab(target);
        });
    });

    // logic for Header Nav to switch tabs
    // Usage: <a href="#solutions" onclick="handleHeaderNav('public')">
    window.handleHeaderNav = function(sector) {
        switchTab(sector);
        // Scroll to the section smoothly
        document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
    };

    // Optional: Auto-detect if user came from a specific page link
    const hash = window.location.hash;
    if (hash.includes('public')) switchTab('public');
    if (hash.includes('business')) switchTab('business');
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