// Formulário de Contato com EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Máscara para telefone usando IMask
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        const telefoneMask = IMask(telefoneInput, {
            mask: [
                {
                    mask: '(00) 0 0000-0000',
                    startsWith: '',
                    lazy: false,
                    country: 'Brazil'
                }
            ],
            dispatch: function (appended, dataMask) {
                const number = (dataMask.value + appended).replace(/\D/g, '');
                return dataMask.compiledMasks.find(function (m) {
                    return number.indexOf(m.startsWith) === 0;
                });
            }
        });

        const form = document.getElementById('contact-form');
        if (form) {
            const submitButton = form.querySelector('button[type="submit"]');
            
            // Inicializar EmailJS com a chave pública
            // Usando try/catch para evitar erros caso o EmailJS não esteja carregado
            try {
                (function() {
                    // https://dashboard.emailjs.com/admin/account
                    emailjs.init({
                        publicKey: "J3NvibQuHD_o_q_8Y",
                    });
                })();
                console.log("EmailJS inicializado com sucesso");
            } catch (error) {
                console.error("Erro ao inicializar EmailJS:", error);
            }

            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Validação de campos
                if (!validateForm()) return;

                // Verificar se o EmailJS está disponível
                if (typeof emailjs !== 'undefined') {
                    // Desabilitar botão durante o envio
                    submitButton.textContent = 'Enviando...';
                    submitButton.disabled = true;
                    
                    // Configuração personalizada do SweetAlert2
                    const sweetAlertCustomStyle = {
                        title: 'Mensagem Enviada!',
                        text: 'Obrigado por entrar em contato. Retornarei em breve.',
                        icon: 'success',
                        background: '#0a192f',
                        color: '#ccd6f6',
                        confirmButtonColor: '#64ffda',
                        confirmButtonText: 'Fechar',
                        showClass: {
                            popup: 'animate__animated animate__fadeIn'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOut'
                        },
                        customClass: {
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-button'
                        }
                    };

                    // Enviar email usando EmailJS (sintaxe da versão 3)
                    emailjs.sendForm('email_ismaelportfolio', 'template_i1c5xzj', form, 'J3NvibQuHD_o_q_8Y')
                        .then(function(response) {
                            console.log("Email enviado com sucesso:", response);
                            // Sucesso no envio
                            Swal.fire(sweetAlertCustomStyle);
                            form.reset();
                            telefoneMask.value = ''; // Limpar máscara
                        }, function(error) {
                            console.error("Erro detalhado do EmailJS:", error);
                            // Erro no envio
                            Swal.fire({
                                icon: 'error',
                                title: 'Ops! Algo deu errado',
                                text: 'Não foi possível enviar a mensagem. Por favor, tente novamente.',
                                background: '#0a192f',
                                color: '#ccd6f6',
                                confirmButtonColor: '#ee9b00',
                                confirmButtonText: 'Tentar novamente',
                                customClass: {
                                    title: 'swal-title',
                                    content: 'swal-content',
                                    confirmButton: 'swal-button'
                                }
                            });
                            console.error('Erro no EmailJS:', error);
                        }).finally(() => {
                            // Reabilitar botão
                            submitButton.textContent = 'Enviar Mensagem';
                            submitButton.disabled = false;
                        });
                } else {
                    // Se o EmailJS não estiver disponível
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro de Configuração',
                        text: 'O serviço de email não está disponível no momento.',
                        confirmButtonColor: '#ee9b00'
                    });
                    submitButton.textContent = 'Enviar Mensagem';
                    submitButton.disabled = false;
                }
            });

            // Função de validação de formulário
            function validateForm() {
                const nome = form.nome.value.trim();
                const email = form.email.value.trim();
                const telefone = telefoneMask.unmaskedValue; // Valor sem máscara
                const mensagem = form.mensagem.value.trim();
                
                // Validações
                if (nome.length < 2) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Nome Inválido',
                        text: 'Por favor, insira um nome válido.',
                        confirmButtonColor: '#ee9b00'
                    });
                    return false;
                }

                if (!isValidEmail(email)) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email Inválido',
                        text: 'Por favor, insira um email válido.',
                        confirmButtonColor: '#ee9b00'
                    });
                    return false;
                }

                if (!isValidPhone(telefone)) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Telefone Inválido',
                        text: 'Por favor, insira um número de telefone válido.',
                        confirmButtonColor: '#ee9b00'
                    });
                    return false;
                }

                if (mensagem.length < 10) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Mensagem Muito Curta',
                        text: 'Por favor, escreva uma mensagem mais detalhada.',
                        confirmButtonColor: '#ee9b00'
                    });
                    return false;
                }

                return true;
            }

            // Função para validar email
            function isValidEmail(email) {
                const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return re.test(String(email).toLowerCase());
            }

            // Função para validar telefone brasileiro
            function isValidPhone(phone) {
                // Remove todos os caracteres não numéricos
                const cleanPhone = phone.replace(/\D/g, '');
                
                // Verifica se tem 10 ou 11 dígitos
                return cleanPhone.length === 10 || cleanPhone.length === 11;
            }
        }
    }
});

// Script para filtrar projetos por categoria
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            button.classList.add('active');
            
            // Obter categoria a ser filtrada
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrar projetos
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Animar a entrada do card
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                } else {
                    // Animar a saída do card
                    gsap.to(card, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});

// Função para adicionar efeito de rolagem suave
function setupSmoothScroll() {
    // Atualizado para selecionar os links de navegação no novo layout
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializa rolagem suave quando o DOM carregar
document.addEventListener('DOMContentLoaded', setupSmoothScroll);

// Botão Voltar ao Topo
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
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
    }
});
