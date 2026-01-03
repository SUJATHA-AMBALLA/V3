/* =========================================
   1. DASHBOARD TABS
   ========================================= */
function openDashboardTab(evt, tabName) {
  // Hide all panes
  var panes = document.getElementsByClassName("dash-pane");
  for (var i = 0; i < panes.length; i++) {
    panes[i].classList.remove("active");
    panes[i].style.display = "none";
  }
  
  // Remove active class from buttons
  var buttons = document.getElementsByClassName("dash-btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  
  // Show current pane and activate button
  document.getElementById(tabName).style.display = "flex";
  // Small timeout to allow display:flex to apply before adding opacity class
  setTimeout(() => document.getElementById(tabName).classList.add("active"), 10);
  evt.currentTarget.classList.add("active");
}

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

    // FIX: Only close menu when clicking actual links (class .menu-link), 
    // NOT when clicking the dropdown toggle or container.
    document.querySelectorAll(".menu-link").forEach(n => n.addEventListener("click", closeMenuFunc));

    // MOBILE DROPDOWN TOGGLE LOGIC
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Stop click from bubbling up to parents
            dropdownMenu.classList.toggle('show-mobile'); // Toggle visibility
        });
    }
});

/* =========================================
   3. PROJECT SLIDER (AUTO PLAY)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('projectTrack');
    if(!track) return; // Guard clause if element missing

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextProject');
    const prevBtn = document.getElementById('prevProject');
    let currentIndex = 0;

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

    let autoPlayInterval = setInterval(moveToNextSlide, 4000); 

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(moveToNextSlide, 4000);
    }
});

/* =========================================
   4. ANIMATED STATS COUNTER
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