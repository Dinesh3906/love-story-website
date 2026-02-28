// script.js - Interactive behaviors and animations

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect (Removed as navbar is now absolute)
    /* 
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    */

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNavOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNavOverlay.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Intersection Observer for fade-in scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Download Button Interaction
    const dlBtn = document.getElementById('dl-btn');
    if (dlBtn) {
        dlBtn.addEventListener('click', () => {
            // Add a visual clicking state
            dlBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                dlBtn.style.transform = '';
            }, 150);

            // Console log for feedback
            console.log("Download interaction triggered.");
        });
    }

    // 5. Infinite Auto-Scroll with grab-to-scroll for Showcase
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryTrack = document.querySelector('.gallery-track');

    let isDown = false;
    let isInteracting = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;
    let scrollSpeed = 0.5; // Pixels per frame (Slower for better readability)

    if (galleryContainer && galleryTrack) {
        // Auto Scroll Function
        const startAutoScroll = () => {
            if (autoScrollInterval) cancelAnimationFrame(autoScrollInterval);

            const scroll = () => {
                if (!isInteracting) {
                    galleryContainer.scrollLeft += scrollSpeed;

                    // Reset to start seamlessly when reaching halfway
                    if (galleryContainer.scrollLeft >= (galleryTrack.scrollWidth / 2)) {
                        galleryContainer.scrollLeft = 0;
                    }
                }
                autoScrollInterval = requestAnimationFrame(scroll);
            };
            autoScrollInterval = requestAnimationFrame(scroll);
        };

        // Start initially
        startAutoScroll();

        // Mouse Events for Grab-to-Scroll & Pause
        galleryContainer.addEventListener('mouseenter', () => {
            isInteracting = true;
        });

        galleryContainer.addEventListener('mouseleave', () => {
            isInteracting = false;
            isDown = false;
        });

        galleryContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            isInteracting = true;
            startX = e.pageX - galleryContainer.offsetLeft;
            scrollLeft = galleryContainer.scrollLeft;
        });

        galleryContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            galleryContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch Events for Mobile Swiping
        galleryContainer.addEventListener('touchstart', () => {
            isInteracting = true;
            isDown = true;
        }, { passive: true });

        galleryContainer.addEventListener('touchend', () => {
            isInteracting = false;
            isDown = false;
        });
    }
});
