$(function () {
    $("#nav-bar").load("./nav.html");
});

$(function () {
    $("#footer").load("./footer.html");
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const heroHeight = document.querySelector('.homepage-banner').offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroHeight) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });

  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const heroHeight = document.querySelector('.webpage-banner').offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > heroHeight) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  });