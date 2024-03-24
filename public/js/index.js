document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here
    console.log('DOM loaded');
});
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
        link.classList.add('active');
    }
});