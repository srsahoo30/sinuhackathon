// Utility functions
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(callback, limit = 100) {
    let waiting = false;
    return function() {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(function() {
                waiting = false;
            }, limit);
        }
    }
}

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.flavor-card, .image-grid, .cta');
    elements.forEach(element => {
        const slideInAt = (window.scrollY + window.innerHeight) - element.offsetHeight / 2;
        const elementBottom = element.offsetTop + element.offsetHeight;
        const isHalfShown = slideInAt > element.offsetTop;
        const isNotScrolledPast = window.scrollY < elementBottom;
        
        if (isHalfShown && isNotScrolledPast) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkScroll));