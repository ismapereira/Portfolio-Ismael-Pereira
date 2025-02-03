// Formulário de Contato com EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Máscara para telefone usando IMask
    const telefoneInput = document.getElementById('telefone');
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
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Inicializar EmailJS (adicione suas credenciais)
    emailjs.init("J3NvibQuHD_o_q_8Y"); // Substitua pelo seu User ID do EmailJS

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validação de campos
        if (!validateForm()) return;

        // Desabilitar botão durante o envio
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Coleta dados do formulário
        const formData = {
            from_name: form.nome.value.trim(),
            from_email: form.email.value.trim(),
            from_phone: telefoneMask.unmaskedValue, // Valor sem máscara
            message: form.mensagem.value.trim()
        };

        // Log de depuração
        console.log('Dados enviados para EmailJS:', {
            name: formData.from_name,
            email: formData.from_email,
            phone: formData.from_phone,
            message: formData.message
        });

        // Enviar email usando EmailJS
        emailjs.send(
            "email_ismaelportifolio",    // Substitua pelo seu Service ID
            "template_i1c5xzj",   // Substitua pelo seu Template ID
            formData
        ).then(
            function(response) {
                // Sucesso no envio
                Swal.fire({
                    icon: 'success',
                    title: 'Mensagem Enviada!',
                    text: 'Obrigado por entrar em contato. Retornarei em breve.',
                    confirmButtonColor: '#0A9396'
                });
                form.reset();
                telefoneMask.value = ''; // Limpar máscara
            },
            function(error) {
                // Erro no envio
                Swal.fire({
                    icon: 'error',
                    title: 'Ops! Algo deu errado',
                    text: 'Não foi possível enviar a mensagem. Por favor, tente novamente.',
                    confirmButtonColor: '#EE9B00'
                });
                console.error('Erro no EmailJS:', error);
            }
        ).finally(() => {
            // Reabilitar botão
            submitButton.textContent = 'Enviar Mensagem';
            submitButton.disabled = false;
        });
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
                confirmButtonColor: '#EE9B00'
            });
            return false;
        }

        if (!isValidEmail(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Email Inválido',
                text: 'Por favor, insira um email válido.',
                confirmButtonColor: '#EE9B00'
            });
            return false;
        }

        if (!isValidPhone(telefone)) {
            Swal.fire({
                icon: 'warning',
                title: 'Telefone Inválido',
                text: 'Por favor, insira um número de telefone válido.',
                confirmButtonColor: '#EE9B00'
            });
            return false;
        }

        if (mensagem.length < 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Mensagem Muito Curta',
                text: 'Por favor, escreva uma mensagem mais detalhada.',
                confirmButtonColor: '#EE9B00'
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
