// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    
    if (burger && menu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Animate statistics numbers
    const statisticsNumbers = document.querySelectorAll('.statistics__number[data-count]');
    
    function animateNumbers() {
        statisticsNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('K') ? 'K+' : '';
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 20);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('statistics__number')) {
                    animateNumbers();
                } else {
                    entry.target.classList.add('fade-in-up');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.vacancy-card, .how-it-works__step, .advantages__item, .reviews__item');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    statisticsNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Button click handlers
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});