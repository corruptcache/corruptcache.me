document.addEventListener('DOMContentLoaded', function() {
    // Get the lightbox elements
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Add click event listeners to all lightbox triggers
    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img-src');
            const caption = this.getAttribute('data-caption');
            
            // Set the lightbox content
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption || '';
            
            // Show the lightbox
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
});
