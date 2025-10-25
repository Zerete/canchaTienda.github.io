"use strict";

// Spinner
const spinner = () => {
    setTimeout(() => {
        const spinnerEl = document.getElementById('spinner');
        if (spinnerEl) spinnerEl.classList.remove('show');
    }, 1);
};
spinner();

// Initiate WOW.js
new WOW().init();

// Sticky Navbar
window.addEventListener("scroll", () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 45) {
        navbar.classList.add('sticky-top', 'shadow-sm');
    } else {
        navbar.classList.remove('sticky-top', 'shadow-sm');
    }
});

// Dropdown on mouse hover (solo pantallas >=992px)
const handleDropdownHover = () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");

        dropdown.addEventListener("mouseenter", () => {
            if (window.innerWidth >= 992) {
                dropdown.classList.add("show");
                if (toggle) toggle.setAttribute("aria-expanded", "true");
                if (menu) menu.classList.add("show");
            }
        });

        dropdown.addEventListener("mouseleave", () => {
            if (window.innerWidth >= 992) {
                dropdown.classList.remove("show");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
                if (menu) menu.classList.remove("show");
            }
        });
    });
};
window.addEventListener("load", handleDropdownHover);
window.addEventListener("resize", handleDropdownHover);


const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => { backToTop.style.display = 'none'; }, 300);
        }
    });

    backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Facts counter
const counters = document.querySelectorAll('[data-toggle="counter-up"]');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target') || 0;
        const current = +counter.innerText || 0;
        const increment = target / 200; // velocidad aproximada
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// Modal Video
let videoSrc;
const btnPlay = document.querySelectorAll('.btn-play');
btnPlay.forEach(btn => {
    btn.addEventListener("click", () => {
        videoSrc = btn.getAttribute("data-src");
    });
});

const videoModal = document.getElementById("videoModal");
const videoEl = document.getElementById("video");

if (videoModal && videoEl) {
    videoModal.addEventListener('shown.bs.modal', () => {
        videoEl.src = videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0";
    });

    videoModal.addEventListener('hide.bs.modal', () => {
        videoEl.src = videoSrc;
    });
}

// Carrusel de testimonios


document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".testimonial-carousel");
    if (!carousel) return; // evita errores si no existe el carrusel
    const items = document.querySelectorAll(".testimonial-item");
    const totalItems = items.length;
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let index = 0;
    let autoSlide;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % totalItems;
        updateCarousel();
    }

    function prevSlide() {
        index = (index - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 5000); // cambia cada 5s
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();
});

// Validación del formulario de reservas
const reservaForm = document.getElementById("reservaForm");
if (reservaForm) {
    reservaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("name").value.trim();
        const correo = document.getElementById("email").value.trim();
        const fechaHora = document.getElementById("datetime").value.trim();
        const personas = document.getElementById("select1").value;

        const nombreRegex = /^[A-Za-z\s]+$/;
        const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!nombreRegex.test(nombre)) {
            alert("❌ Se le negó la reserva, por favor ingresa un nombre válido (solo letras y espacios).");
            return;
        }

        if (!correoRegex.test(correo)) {
            alert("❌ Se le negó la reserva, por favor ingresa un correo válido.");
            return;
        }

        if (!personas) {
            alert("❌ Se le negó la reserva, por favor selecciona la cantidad de personas.");
            return;
        }

        alert(`✅ Reserva realizada con éxito!\nNombre: ${nombre}\nCorreo: ${correo}\nFecha y Hora: ${fechaHora}\nPersonas: ${personas}`);
    });
}
