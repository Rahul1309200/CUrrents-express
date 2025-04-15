let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-slide");
    let texts = document.getElementsByClassName("carousel-text");

    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        texts[i].style.opacity = "0";
        texts[i].style.transform = "translate(-50%, 50px)";
    }

    slides[slideIndex].style.display = "block";
    texts[slideIndex].style.animation = "slideFadeIn 1.5s ease forwards";

}

document.querySelector('.second-box').addEventListener('mouseenter', function() {
this.querySelector('img').style.filter = 'brightness(70%)'; // Dim the image
});

document.querySelector('.second-box').addEventListener('mouseleave', function() {
this.querySelector('img').style.filter = 'brightness(100%)'; // Reset brightness
});


document.addEventListener("DOMContentLoaded", function() {
const logos = document.querySelectorAll('.partner-logo');

logos.forEach(logo => {
    logo.addEventListener('mouseover', function() {
        logo.style.transform = 'rotate(10deg) scale(1.1)'; // Rotate and scale on hover
    });

    logo.addEventListener('mouseout', function() {
        logo.style.transform = 'rotate(0deg) scale(1)'; // Reset rotation and scale
    });
});
});
document.getElementById("newsletter-form").addEventListener("submit", function(event){
event.preventDefault();
document.getElementById("thank-you-message").style.display = "block";
document.getElementById("email").value = ""; // Clear the input field
});

document.querySelector('.hamburger').addEventListener('click', function() {
this.classList.toggle('active');
document.querySelector('.nav-links').classList.toggle('active');
});

// navbar js starts


// Select all navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Add click event listener to each link
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove the 'active' class from all links
    navLinks.forEach(nav => nav.classList.remove("active"));
    // Add the 'active' class to the clicked link
    this.classList.add("active");
  });
});


//navbar js ends


//   const popup = document.getElementById("welcomePopup");
//   if (popup) {
//     setTimeout(() => {
//       popup.style.display = "none";
//     }, 5000);
//   }

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('welcome-popup');
  if (popup) {
    setTimeout(() => {
      popup.style.display = 'none';
    }, 5000);
  }
});
