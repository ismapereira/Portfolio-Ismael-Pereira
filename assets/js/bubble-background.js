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

        // Tamanho aleatório
        const size = Math.random() * 150 + 50; // 50-200px
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
            bubbleContainer.removeChild(bubble);
            bubbleContainer.appendChild(createBubble());
        });
    }

    // Criar múltiplas bolhas
    for (let i = 0; i < 20; i++) {
        createBubble();
    }
});
