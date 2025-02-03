// Formulário de Contato com Serviço de Email Gratuito
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Previne envio padrão do formulário

        // Coleta dados do formulário
        const nome = form.nome.value;
        const email = form.email.value;
        const mensagem = form.mensagem.value;

        // Usa o serviço gratuito EmailJS
        // NOTA: Será necessário se registrar no EmailJS e configurar
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: nome,
            from_email: email,
            message: mensagem
        }).then(
            function(response) {
                alert('Mensagem enviada com sucesso!');
                form.reset(); // Limpa o formulário
            },
            function(error) {
                alert('Falha ao enviar mensagem. Tente novamente.');
                console.error('Erro:', error);
            }
        );
    });
});

// Função para adicionar efeito de rolagem suave
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Inicializa rolagem suave quando o DOM carregar
document.addEventListener('DOMContentLoaded', setupSmoothScroll);

// Botão Voltar ao Topo
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
