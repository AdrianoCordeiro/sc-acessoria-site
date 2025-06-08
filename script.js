document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.querySelector('header nav');

    if (menuIcon && nav) {
        menuIcon.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // Slider
    const slides = document.querySelectorAll('#hero-slider .slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentSlide = parseInt(dot.dataset.slide);
                showSlide(currentSlide);
                stopSlider();
                startSlider();
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        const slider = document.querySelector('#hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);
        }

        showSlide(currentSlide);
        startSlider();
    }

    // Modal para Galeria
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    if (modal && modalImage && modalVideo && closeModal) {
        galeriaItems.forEach(item => {
            const img = item.querySelector('img');
            const video = item.querySelector('.modal-video'); // Apenas vídeos com classe modal-video

            if (img || video) {
                item.addEventListener('click', () => {
                    if (img) {
                        modalImage.src = img.src;
                        modalImage.style.display = 'block';
                        modalVideo.style.display = 'none';
                        modalVideo.pause();
                    } else if (video) {
                        modalVideo.src = video.querySelector('source').src;
                        modalVideo.style.display = 'block';
                        modalImage.style.display = 'none';
                        modalVideo.load();
                        modalVideo.play();
                    }
                    
                    modal.classList.add('active');
                });
            }
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            modalImage.style.display = 'none';
            modalVideo.style.display = 'none';
            modalVideo.pause();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modalImage.style.display = 'none';
                modalVideo.style.display = 'none';
                modalVideo.pause();
            }
        });
    }

    // Depoimentos
    const depoimentos = [
        {
            nome: 'Ana e João',
            texto: 'A Suélen transformou nosso casamento em um momento mágico! Cada detalhe foi pensado com carinho, e tudo saiu perfeito. Recomendamos de olhos fechados!',
            data: '2023-10-15'
        },
        {
            nome: 'Mariana e Pedro',
            texto: 'Profissionalismo e dedicação incríveis! A SC Assessoria fez nosso dia ser inesquecível, com organização impecável e muito amor envolvido.',
            data: '2023-12-20'
        },
        {
            nome: 'Mariá Teixeira',
            texto: 'Deixando aqui a minha experiência com a assessoria da Suellen. Foi tudo impecável, Suellen desde o dia em que contratamos teve uma importância surreal, em contratações, negociações com nossos fornecedores e etc Sempre disponível para resolver os pepinos pré casamento. E no dia do casamento ficou 100% ali cmg, me ajudando, orientando, dizendo o que estava acontecendo, me acalmou E claro ajudou nos mínimos detalhes desse sonho  uma experiência super experiência, e um carinho enorme Mesmo ela fazendo um evento no dia anterior, foi extremamente pontual, chegou sorrindo e agilizando tudo o que era necessário. Me acompanhou até a minha entrada Su você tem um espaço no nosso coração e você sabe disso Quem tiver dúvidas sobre, pode fechar os olhos fechados  Eu super indico. ',
            data: '2023-12-20'
        }

        // Adicione mais depoimentos aqui conforme receber e aprovar
    ];

    function displayDepoimentos() {
        const container = document.getElementById('lista-depoimentos');
        if (!container) return;

        if (depoimentos.length === 0) {
            container.innerHTML = `
                <div class="no-depoimentos">
                    <p>Ainda não há depoimentos. Seja o primeiro a compartilhar sua experiência!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = depoimentos.map(dep => `
            <div class="depoimento-item">
                <p class="depoimento-author">${dep.nome}</p>
                <p class="depoimento-text">"${dep.texto}"</p>
                <span class="depoimento-date">${new Date(dep.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
        `).join('');
    }

    displayDepoimentos();

    // Scroll Suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação ao Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servico-card, .galeria-item, .depoimento-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };

    document.querySelectorAll('.servico-card, .galeria-item, .depoimento-item').forEach(element => {
        element.classList.add('animate');
    });

    setTimeout(animateOnScroll, 300);
    window.addEventListener('scroll', animateOnScroll);
});