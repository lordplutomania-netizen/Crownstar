// ==================== PAYMENT FUNCTIONS ====================
const USD_TO_NGN = 1500;

function selectPlan(planName, amount) {
    console.log("selectPlan called:", planName, amount);
    
    const amountNaira = amount * USD_TO_NGN;
    
    // Update modal content
    const planNameElement = document.getElementById('selectedPlanName');
    const planAmountElement = document.getElementById('selectedPlanAmount');
    
    if (planNameElement) {
        planNameElement.textContent = `${planName} Plan`;
    }
    
    if (planAmountElement) {
        planAmountElement.innerHTML = `₦${amountNaira.toLocaleString()}`;
    }
    
    // Show modal
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log("Modal should be visible now");
    } else {
        console.log("Modal element not found!");
    }
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(() => {
        alert('Please copy manually: ' + text);
    });
}

function scrollToPlans() {
    document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
}

function watchDemo() {
    alert('Demo video coming soon!');
}

function openDashboard() {
    alert('Please login to access dashboard');
}

function openTelegram() {
    window.open('https://wa.me/2347026563437', '_blank');
}

function copyCoupon() {
    copyToClipboard('CROWN30');
}

// Testimonial Slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');

function updateSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const slideWidth = testimonials[0]?.offsetWidth + 30;
    slider.scrollTo({ left: currentSlide * slideWidth, behavior: 'smooth' });
    
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

function initSlider() {
    if (!testimonials.length || !dotsContainer) return;
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    faqItem.classList.toggle('active');
}

// Countdown Timer
function startCountdown() {
    const endDate = new Date('December 5, 2025 23:59:59').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<div>EXPIRED</div>';
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

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    this.reset();
});

// Newsletter Form
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Subscribed successfully!');
    this.reset();
});

// Mobile Menu
document.getElementById('mobileMenuBtn')?.addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    initSlider();
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});