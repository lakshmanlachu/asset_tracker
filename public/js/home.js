document.addEventListener('DOMContentLoaded', function () {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
    if (user) {
        var loggedInUserContainer = document.getElementById('user');
        loggedInUserContainer.textContent += user.name;
        var logoutLink = document.querySelector('.logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', function (event) {
                event.preventDefault(); 
                logout(); 
            });
        }
    } else {
        window.location.href = '/login';
    }
    console.log(user);
});
function logout() {
    localStorage.removeItem('user'); 
    window.location.href = "/login"; 
}