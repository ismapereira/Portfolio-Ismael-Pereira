document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const bubbleContainer = document.createElement('div');
    bubbleContainer.classList.add('bubble-container');
    heroSection.appendChild(bubbleContainer);

    // Paleta de cores vibrantes com transição
    const bubbleColors = [
        { start: 'rgba(76, 175, 80, 0.3)', end: 'rgba(76, 175, 80, 0)' },     // Verde
        { start: 'rgba(0, 188, 212, 0.3)', end: 'rgba(0, 188, 212, 0)' },     // Azul Turquesa
        { start: 'rgba(139, 195, 74, 0.3)', end: 'rgba(139, 195, 74, 0)' },   // Verde Limão
        { start: 'rgba(0, 150, 136, 0.3)', end: 'rgba(0, 150, 136, 0)' },     // Verde Azulado
        { start: 'rgba(33, 150, 243, 0.3)', end: 'rgba(33, 150, 243, 0)' }    // Azul
    ];

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // Tamanho responsivo baseado na largura da tela
        const screenWidth = window.innerWidth;
        let maxSize, minSize;

        if (screenWidth > 1200) {
            maxSize = 200;
            minSize = 50;
        } else if (screenWidth > 768) {
            maxSize = 150;
            minSize = 40;
        } else if (screenWidth > 480) {
            maxSize = 100;
            minSize = 30;
        } else {
            maxSize = 80;
            minSize = 20;
        }

        const size = Math.random() * (maxSize - minSize) + minSize;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Posição horizontal aleatória
        const left = Math.random() * 100;
        bubble.style.left = `${left}%`;

        // Velocidade e cor
        const duration = Math.random() * 15 + 10; // 10-25s
        const colorScheme = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        
        // Gradiente de cor
        bubble.style.background = `radial-gradient(circle, ${colorScheme.start}, ${colorScheme.end})`;

        // Animação de flutuação
        bubble.style.animation = `float-bubble linear ${duration}s infinite`;

        bubbleContainer.appendChild(bubble);

        // Remover e recriar bolha após animação
        bubble.addEventListener('animationiteration', () => {
            // Verificação de segurança antes de remover e adicionar
            if (bubble.parentNode === bubbleContainer) {
                bubbleContainer.removeChild(bubble);
                const newBubble = createBubble();
                if (newBubble instanceof Node) {
                    bubbleContainer.appendChild(newBubble);
                }
            }
        });

        return bubble;
    }

    // Ajustar número de bolhas baseado no tamanho da tela
    function adjustBubbleCount() {
        const screenWidth = window.innerWidth;
        let bubbleCount;

        if (screenWidth > 1200) {
            bubbleCount = 20;
        } else if (screenWidth > 768) {
            bubbleCount = 15;
        } else if (screenWidth > 480) {
            bubbleCount = 10;
        } else {
            bubbleCount = 5;
        }

        // Limpar bolhas existentes
        bubbleContainer.innerHTML = '';

        // Criar novas bolhas
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = createBubble();
            if (bubble instanceof Node) {
                bubbleContainer.appendChild(bubble);
            }
        }
    }

    // Chamar no carregamento e ao redimensionar
    adjustBubbleCount();
    window.addEventListener('resize', adjustBubbleCount);
});
