document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Carregado');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    console.log('Menu Toggle:', menuToggle);
    console.log('Mobile Menu:', mobileMenu);

    if (!menuToggle || !mobileMenu) {
        console.error('Elementos do menu não encontrados');
        console.error('Elementos na página:', {
            menuToggle: !!document.querySelector('.menu-toggle'),
            mobileMenu: !!document.querySelector('.mobile-menu')
        });
        return;
    }

    const menuLinks = mobileMenu.querySelectorAll('a');
    console.log('Links do menu:', menuLinks);

    // Função para alternar o menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        console.log('Classes atuais:', {
            menuToggle: menuToggle.classList.toString(),
            mobileMenu: mobileMenu.classList.toString(),
            body: document.body.classList.toString()
        });
    }

    // Toggle menu
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        console.log('Menu toggle clicado');
        toggleMenu();
    });

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link do menu clicado');
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu if clicked outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevent scroll when menu is open
    mobileMenu.addEventListener('touchmove', (event) => {
        if (mobileMenu.classList.contains('active')) {
            event.preventDefault();
        }
    }, { passive: false });
});
