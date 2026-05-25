// Crear el canvas para el rastro de brillo
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Estilos para que cubra la pantalla sin interferir con los clics
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none"; 
canvas.style.zIndex = "9999";

let particles = [];

// Ajustar tamaño del canvas al tamaño de la ventana
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Generar partículas al mover el ratón
window.addEventListener("mousemove", (e) => {
    // Generamos 2 partículas por cada movimiento capturado para un efecto delicado
    for (let i = 0; i < 2; i++) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 2.5 + 0.5, // Tamaño pequeño y variado
            speedX: (Math.random() - 0.5) * 1.2, // Dispersión horizontal suave
            speedY: (Math.random() - 0.5) * 1.2 + 0.5, // Tendencia a caer un poco
            life: 1 // Vida inicial de la partícula
        });
    }
});

// Función de animación
function animate() {
    // Borrar el frame anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Actualizar posición
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Reducir tamaño y desvanecer progresivamente
        p.size *= 0.95;
        p.life -= 0.025;
        
        // Dibujar la partícula (color dorado cálido tipo chispa)
        ctx.fillStyle = `rgba(255, 215, 120, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Eliminar partículas que ya no se ven
        if (p.life <= 0 || p.size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// Iniciar animación
animate();

// --- FUNCIONES DEL ÍNDICE ---

// 1. Cambiar estilo de la barra al hacer scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Control del Menú Hamburguesa para celulares
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 3. Cerrar el menú del celular automáticamente al elegir una opción
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});