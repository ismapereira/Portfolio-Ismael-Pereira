document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');

    // Inicialmente tornar os elementos invisíveis
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.visibility = 'hidden';
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.visibility = 'hidden';
    }

    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Adicionar um pequeno delay para garantir que a página esteja carregada
    setTimeout(() => {
        if (heroTitle) {
            typeWriter(heroTitle, heroTitle.textContent);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                typeWriter(heroSubtitle, heroSubtitle.textContent, 30);
            }, 1500); // Delay entre o título e subtítulo
        }
    }, 500);
});
