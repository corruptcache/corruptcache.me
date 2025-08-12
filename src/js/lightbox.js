document.addEventListener('DOMContentLoaded', function() {
    // Try to get both possible lightbox elements
    const lightbox = document.getElementById('image-lightbox') || document.getElementById('lightbox');
    
    // Exit if no lightbox element is found
    if (!lightbox) return;
    
    // Get the lightbox elements with fallbacks
    const lightboxImg = document.getElementById('lightbox-image') || document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close') || document.getElementById('lightbox-close');
    
    // Exit if required elements are missing
    if (!lightboxImg || !lightboxClose) {
        console.warn('Lightbox: Required elements not found');
        return;
    }
    
    // Function to close the lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    };
    
    // Add click event listeners to all lightbox triggers
    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img-src') || this.getAttribute('href');
            const caption = this.getAttribute('data-caption') || this.getAttribute('title') || '';
            
            if (!imgSrc) {
                console.warn('Lightbox: No image source found');
                return;
            }
            
            // Set the lightbox content
            lightboxImg.src = imgSrc;
            lightboxImg.alt = caption;
            
            if (lightboxCaption) {
                lightboxCaption.textContent = caption;
            }
            
            // Show the lightbox
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
});
