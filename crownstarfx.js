// ==================== DOM Elements ====================
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== Countdown Timer ====================
function startCountdown() {
    // Set Black Friday end date (December 5, 2025)
    const endDate = new Date('December 5, 2025 23:59:59').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">EXPIRED</span></div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

startCountdown();

// ==================== Copy Coupon Code ====================
function copyCoupon() {
    const couponCode = document.querySelector('.coupon-code').textContent;
    navigator.clipboard.writeText(couponCode).then(() => {
        showNotification('Coupon code copied!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// ==================== Scroll Functions ====================
function scrollToPlans() {
    document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
}

function watchDemo() {
    showNotification('Demo video will be available soon!', 'info');
}

function openDashboard() {
    showNotification('Please login to access dashboard', 'info');
}

function openTelegram() {
    window.open('https://t.me/crownstarfx', '_blank');
}

// ==================== PAYMENT SYSTEM ====================
let selectedPlanInfo = { name: '', amount: 0, amountNaira: 0 };

// Exchange rate (you can update this)
const USD_TO_NGN = 1500;

function selectPlan(planName, amount) {
    // Check if user is logged in
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!currentUser) {
        showNotification('Please login or register to enroll in a plan', 'info');
        openAuthModal('login');
        return;
    }
    
    const amountNaira = amount * USD_TO_NGN;
    selectedPlanInfo = { name: planName, amount: amount, amountNaira: amountNaira };
    
    document.getElementById('selectedPlan').textContent = `${planName} Plan`;
    document.getElementById('selectedAmount').textContent = `$${amount}`;
    document.getElementById('selectedAmountNaira').textContent = `₦${amountNaira.toLocaleString()}`;
    
    // Update payment amount in bank details
    const paymentAmountSpan = document.getElementById('paymentAmount');
    if (paymentAmountSpan) {
        paymentAmountSpan.textContent = `₦${amountNaira.toLocaleString()}`;
    }
    
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// ==================== Testimonials Slider ====================
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');

function initSlider() {
    if (!testimonials.length || !dotsContainer) return;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    updateSlider();
}

function updateSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const slideWidth = testimonials[0]?.offsetWidth + 30; // 30px gap
    slider.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
    });
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextTestimonial() {
    if (currentSlide < testimonials.length - 1) {
        currentSlide++;
        updateSlider();
    }
}

function prevTestimonial() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Initialize slider
if (testimonials.length) {
    initSlider();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => updateSlider(), 250);
    });
}

// ==================== FAQ Accordion ====================
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    faqItem.classList.toggle('active');
}

// ==================== Contact Form ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            showNotification('Message sent! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
}

// ==================== Newsletter Form ====================
const newsletterForm = document.querySelector('#newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (email) {
            showNotification('Subscribed successfully! Check your inbox.', 'success');
            this.reset();
        }
    });
}

// ==================== Notification System ====================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${getColorForType(type)};
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getColorForType(type) {
    switch(type) {
        case 'success': return '#48bb78';
        case 'error': return '#f56565';
        case 'warning': return '#ed8936';
        default: return '#667eea';
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Loader / Page Transition ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== Lot Size Calculator (Bonus Feature) ====================
function calculateLotSize(riskAmount, stopLossPips, accountCurrency) {
    // Basic lot size calculation
    // This is a simplified version - in production, use proper forex calculations
    const pipValue = 10; // Approximate for standard lot
    const lotSize = (riskAmount / (stopLossPips * pipValue)).toFixed(2);
    return lotSize;
}

// Example usage - can be integrated into a calculator component
console.log('CrownStarFX Website Loaded Successfully!');
