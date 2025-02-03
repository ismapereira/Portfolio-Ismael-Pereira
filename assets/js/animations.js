// Animações de Entrada e Rolagem
document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar animações de entrada
    function addScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.classList.add('pre-animate');
            observer.observe(section);
        });
    }

    // Adiciona estilos para animações
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .pre-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    // Inicializa animações
    addScrollAnimations();
});
