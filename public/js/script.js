// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
document.getElementById('betaForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        teamSize: document.getElementById('teamSize').value,
        message: document.getElementById('message').value
    };
    
    try {
        // Send data to backend
        const response = await fetch('/api/submit-interest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Track conversion with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'event_category': 'Beta Signup',
                    'event_label': 'Interest Form Submission',
                    'value': 1
                });
            }
            
            // Track conversion with Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Beta Program Signup',
                    content_category: 'Interest Form'
                });
            }
            
            // Hide form and show success message
            this.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            setTimeout(() => {
                this.reset();
            }, 1000);
        } else {
            // Show error message
            alert(result.message || 'Something went wrong. Please try again.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Unable to submit form. Please check your connection and try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    document.querySelector('.navbar .container').appendChild(menuButton);
};

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        
        // Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'CTA Button',
                'event_label': buttonText
            });
        }
        
        // Track with Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'CTAClick', {
                button_text: buttonText
            });
        }
    });
});

// Track feature card views
const trackFeatureViews = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const featureName = entry.target.querySelector('h3')?.textContent;
            
            if (typeof gtag !== 'undefined' && featureName) {
                gtag('event', 'view_item', {
                    'event_category': 'Feature View',
                    'event_label': featureName
                });
            }
            
            trackFeatureViews.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.feature-card').forEach(card => {
    trackFeatureViews.observe(card);
});

// Initialize on load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('TicketManager website loaded successfully!');
    
    // Track page load time
    if (typeof gtag !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        gtag('event', 'timing_complete', {
            'name': 'page_load',
            'value': loadTime,
            'event_category': 'Performance'
        });
    }
});
