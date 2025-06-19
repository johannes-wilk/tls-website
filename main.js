// Main JavaScript for TLS & UAV Campaigns Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initialize slideshows
    setupSlideshows();
    
    // Initialize site slideshows with dots
    setupSiteSlideshows();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
});

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Slideshow functionality for the "What We Do" section
function setupSlideshows() {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        if (slides.length > 0) {
            let currentIndex = 0;
            
            // Find the active slide index
            slides.forEach((slide, index) => {
                if (slide.classList.contains('active')) {
                    currentIndex = index;
                }
            });
            
            // Previous button click
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    slides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    slides[currentIndex].classList.add('active');
                });
            }
            
            // Next button click
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    slides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % slides.length;
                    slides[currentIndex].classList.add('active');
                });
            }
            
            // Auto-advance slides every 5 seconds
            setInterval(function() {
                if (document.visibilityState === 'visible') {
                    slides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % slides.length;
                    slides[currentIndex].classList.add('active');
                }
            }, 5000);
        }
    });
}

// Site slideshow functionality with dot indicators
function setupSiteSlideshows() {
    const siteSlideshows = document.querySelectorAll('.site-slideshow');
    
    siteSlideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.prev-btn');
        const nextBtn = slideshow.querySelector('.next-btn');
        const dotsContainer = slideshow.querySelector('.dots-container');
        
        if (slides.length > 0) {
            let currentIndex = 0;
            
            // Create dot indicators
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                
                dotsContainer.appendChild(dot);
            });
            
            const dots = dotsContainer.querySelectorAll('.dot');
            
            // Function to go to a specific slide
            function goToSlide(index) {
                slides[currentIndex].classList.remove('active');
                dots[currentIndex].classList.remove('active');
                
                currentIndex = index;
                
                slides[currentIndex].classList.add('active');
                dots[currentIndex].classList.add('active');
            }
            
            // Previous button click
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                    goToSlide(newIndex);
                });
            }
            
            // Next button click
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    const newIndex = (currentIndex + 1) % slides.length;
                    goToSlide(newIndex);
                });
            }
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
