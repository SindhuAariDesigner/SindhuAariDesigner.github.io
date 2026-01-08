// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===========================
// Carousel Functionality
// ===========================
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = Array.from(carouselTrack.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const carouselIndicatorsContainer = document.querySelector('.carousel-indicators');

// Create indicators
carouselSlides.forEach((slide, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
        moveToSlide(carouselTrack, currentSlide, carouselSlides[index]);
        updateIndicators(index);
        currentSlideIndex = index;
    });
    carouselIndicatorsContainer.appendChild(indicator);
});

const indicators = Array.from(carouselIndicatorsContainer.children);

let currentSlideIndex = 0;
const slideWidth = carouselSlides[0].getBoundingClientRect().width;

// Arrange slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
carouselSlides.forEach(setSlidePosition);

// Move to specific slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Update indicators
const updateIndicators = (targetIndex) => {
    indicators.forEach((indicator, index) => {
        if (index === targetIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
};

// Next button click
nextButton.addEventListener('click', () => {
    const currentSlide = carouselTrack.querySelector('.current-slide') || carouselSlides[0];
    const nextSlide = currentSlide.nextElementSibling || carouselSlides[0];
    const nextIndex = carouselSlides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(carouselTrack, currentSlide, nextSlide);
    updateIndicators(nextIndex);
    currentSlideIndex = nextIndex;
});

// Previous button click
prevButton.addEventListener('click', () => {
    const currentSlide = carouselTrack.querySelector('.current-slide') || carouselSlides[0];
    const prevSlide = currentSlide.previousElementSibling || carouselSlides[carouselSlides.length - 1];
    const prevIndex = carouselSlides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(carouselTrack, currentSlide, prevSlide);
    updateIndicators(prevIndex);
    currentSlideIndex = prevIndex;
});

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    nextButton.click();
}, 5000);

// Pause autoplay on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        nextButton.click();
    }, 5000);
});

// Handle window resize
window.addEventListener('resize', () => {
    const newSlideWidth = carouselSlides[0].getBoundingClientRect().width;
    carouselSlides.forEach((slide, index) => {
        slide.style.left = newSlideWidth * index + 'px';
    });
    const currentSlide = carouselTrack.querySelector('.current-slide') || carouselSlides[0];
    carouselTrack.style.transform = 'translateX(-' + currentSlide.style.left + ')';
});

// ===========================
// Gallery Lightbox (Simple Implementation)
// ===========================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            animation: scaleIn 0.3s ease;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 2rem;
            cursor: pointer;
            color: #8b4513;
            transition: 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = '#d4af37';
            closeBtn.style.color = 'white';
            closeBtn.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'white';
            closeBtn.style.color = '#8b4513';
            closeBtn.style.transform = 'scale(1)';
        });
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === closeBtn) {
                closeLightbox();
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                closeLightbox();
            }
        });
    });
});

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        text-align: center;
        animation: scaleIn 0.3s ease;
    `;
    
    successMessage.innerHTML = `
        <div style="color: #d4af37; font-size: 4rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #8b4513; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">
            Thank You!
        </h3>
        <p style="color: #666; margin-bottom: 1.5rem;">
            Your message has been received. We'll get back to you soon!
        </p>
        <button onclick="this.parentElement.remove(); document.body.style.overflow='auto';" 
                style="background: #d4af37; color: #2c2c2c; border: none; padding: 0.8rem 2rem; 
                       border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 1rem;">
            Close
        </button>
    `;
    
    document.body.appendChild(successMessage);
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
    
    // Log form data (In production, send to server)
    console.log('Form submitted:', formData);
});

// ===========================
// Smooth Scroll Enhancement
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Accounting for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// Initialize carousel current slide
// ===========================
if (carouselSlides.length > 0) {
    carouselSlides[0].classList.add('current-slide');
}

// ===========================
// Preload images
// ===========================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

console.log('Sindhu Aari Designer website loaded successfully! 🎨✨');
