document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.classList.add('fade-out');
            
            // Remove loader from DOM after animation completes
            setTimeout(function() {
                loaderWrapper.remove();
            }, 500);
        }, 500);
    });
    
    // Navigation
    const menuBtn = document.querySelector('.menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navbarMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollUpBtn = document.querySelector('.scroll-up-btn');
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollUpBtn.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            scrollUpBtn.classList.remove('active');
        }
    });
    
    // Scroll to top button
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    
    scrollUpBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Typing animation
    const typed = new Typed('.typed-text', {
        strings: ['AI Engineer', 'Machine Learning Expert', 'Full Stack Developer', 'Tech Educator', 'Software Architect'],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            
            // Change button text and show loading state
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission code)
            setTimeout(function() {
                btnText.textContent = 'Message Sent!';
                submitBtn.classList.add('success');
                
                // Reset form after 2 seconds
                setTimeout(function() {
                    contactForm.reset();
                    btnText.textContent = 'Send Message';
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Initialize testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        // This would be replaced with an actual slider library like Swiper.js in production
        // For this example, we'll just enable horizontal scrolling
        const slider = document.querySelector('.testimonials-slider');
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Run animations on scroll
    animateOnScroll();
    
    // File input styling
    const fileInput = document.getElementById('attachment');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
            this.nextElementSibling.querySelector('span').textContent = fileName;
        });
    }
});
