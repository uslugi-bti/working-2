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
    
    // Vacancies data
    const vacanciesData = [
        {
            title: 'Віртуальний асистент',
            salary: '1200 UAH/день',
            description: 'Допомагай підприємцям: пошта, календар, дзвінки.',
            skills: 'Необхідні навички: організованість, базовий Office.'
        },
        {
            title: 'Оператор введення даних',
            salary: '1100 UAH/день',
            description: 'Проста робота з таблицями, внесення інформації.',
            skills: 'Необхідні навички: швидке друкування, Excel.'
        },
        {
            title: 'Онлайн підтримка клієнтів',
            salary: '1300 UAH/день',
            description: 'Чати та пошта. Досвід не потрібен.',
            skills: 'Необхідні навички: спілкування, терпіння.'
        },
        {
            title: 'Контент-райтер',
            salary: '1400 UAH/день',
            description: 'Пиши статті й описи для сайтів.',
            skills: 'Необхідні навички: грамотність, дослідження тем.'
        },
        {
            title: 'SMM-асистент',
            salary: '1500 UAH/день',
            description: 'Веди соцмережі, створюй прості пости.',
            skills: 'Необхідні навички: креативність, базові знання Instagram/TikTok.'
        },
        {
            title: 'Асистент онлайн-магазину',
            salary: '1250 UAH/день',
            description: 'Додай товари, обробляй замовлення.',
            skills: 'Необхідні навички: уважність, комп\'ютерна грамотність.'
        },
        {
            title: 'Учасник онлайн-опитувань',
            salary: '1000 UAH/день',
            description: 'Відповідай на прості питання у вільний час.',
            skills: 'Необхідні навички: інтернет, чесність.'
        },
        {
            title: 'Віддалений адмін-асистент',
            salary: '1350 UAH/день',
            description: 'Файли, дзвінки, планування.',
            skills: 'Необхідні навички: офісні програми, організація.'
        }
    ];
    
    // Generate vacancies
    const vacanciesGrid = document.querySelector('.vacancies__grid');
    
    if (vacanciesGrid) {
        vacanciesData.forEach(vacancy => {
            const vacancyCard = document.createElement('div');
            vacancyCard.className = 'vacancy-card fade-in-up';
            vacancyCard.innerHTML = `
                <h3 class="vacancy-card__title">${vacancy.title}</h3>
                <div class="vacancy-card__salary">${vacancy.salary}</div>
                <p class="vacancy-card__description">${vacancy.description}</p>
                <p class="vacancy-card__skills">${vacancy.skills}</p>
                <button class="button button--primary vacancy-card__button">Подати заявку</button>
            `;
            vacanciesGrid.appendChild(vacancyCard);
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
                
                // Close mobile menu if open
                if (menu && menu.classList.contains('active')) {
                    burger.classList.remove('active');
                    menu.classList.remove('active');
                }
            }
        });
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
            
            // Handle specific button actions
            if (this.textContent.includes('Подати заявку')) {
                alert('Дякуємо за вашу заявку! Ми зв\'яжемося з вами найближчим часом.');
            }
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