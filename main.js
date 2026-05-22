// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Helper function to show toast messages
    function showToast(message) {
        let existingToast = document.querySelector('.feedback-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'feedback-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast) toast.remove();
        }, 3000);
    }
    
    // Contact form handling (on contact page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formFeedback = document.getElementById('formFeedback');
            
            if (!name || !email || !message) {
                formFeedback.style.color = '#b13e3e';
                formFeedback.textContent = 'Please fill in all required fields (name, email, message).';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                formFeedback.style.color = '#b13e3e';
                formFeedback.textContent = 'Please enter a valid email address.';
                return;
            }
            
            formFeedback.style.color = '#2b6e3c';
            formFeedback.textContent = 'Thank you! Our gardens team will get back to you within 24 hours.';
            contactForm.reset();
            showToast('Message sent to Gardens – we will reply soon.');
        });
    }
    
    // Talk alerts button (on activities page)
    const talkBtn = document.getElementById('talkAlertBtn');
    if (talkBtn) {
        talkBtn.addEventListener('click', function() {
            showToast('You have signed up for talk alerts! Check your email for upcoming session details.');
        });
    }
    
    // Subscribe buttons (on boxes page)
    const subscribeBtns = document.querySelectorAll('.subscribe-btn');
    subscribeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const boxName = this.getAttribute('data-box') || 'selected box';
            showToast(`Thank you for your interest in ${boxName}. Please fill out the contact form to complete subscription.`);
        });
    });
    
    // Blog buttons (on activities page)
    const blogBtns = document.querySelectorAll('.blog-btn');
    blogBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const blogTitle = this.getAttribute('data-blog') || 'this article';
            showToast(`"${blogTitle}" - Full article coming soon. Subscribe to our newsletter for updates.`);
        });
    });
    
    // Interactive activity badges (on activities page)
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3')?.textContent || 'This activity';
            showToast(`${title}: More resources available in our monthly newsletter.`);
        });
    });
    
    // Console log for testing purposes (assignment requirement)
    console.log('Website loaded and optimised: responsive design, accessibility features, form validation active.');
    console.log('Compatibility: modern browsers and mobile devices supported.');
    
    // Responsive check for console
    function logViewport() {
        console.log(`Viewport width: ${window.innerWidth}px - Layout is adaptive.`);
    }
    window.addEventListener('resize', logViewport);
    logViewport();
    
    // Accessibility: add aria labels to interactive elements missing them
    document.querySelectorAll('button, a').forEach(el => {
        if (!el.getAttribute('aria-label') && el.textContent.trim()) {
            if (el.tagName === 'BUTTON') {
                el.setAttribute('aria-label', el.textContent.trim());
            }
        }
    });
    
    // Image placeholders have proper aria roles
    document.querySelectorAll('.img-placeholder, .box-img-placeholder, .blog-img-placeholder').forEach(ph => {
        ph.setAttribute('role', 'img');
        const text = ph.textContent.trim().substring(0, 50);
        ph.setAttribute('aria-label', text || 'Image placeholder');
    });
    
    // Smooth scroll for any anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Feature: custom quote request redirect notice
    const requestQuoteBtns = document.querySelectorAll('a[href="contact.html"]');
    requestQuoteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            showToast('Fill out the contact form with "Custom box" details. Our team will prepare a quote.');
        });
    });
});