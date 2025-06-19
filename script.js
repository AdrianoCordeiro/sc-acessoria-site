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
        },
           {
            nome:'Larissa Kato',
            texto:'Contar com a Suelen no meu casamento foi como ter um porto seguro durante todo o processo, do início ao fim. Além de todo o profissionalismo, gentileza e paciência, destaco sua transparência também: a Su é extremamente justa e transparente. Um dos momentos que mais me marcou foi perto do dia do casamento, quando bateram várias dúvidas tudo ser suficiente, contratar ou não itens extras, enfim… neste caso, a questão era sobre a contratação ou não de um telão, perguntei a opinião dela e ela me devolveu com uma outra pergunta “mas lari, você sabe o que você quer passar nesse telão? Porque ele é legal quando os noivos têm same day ou algum outro vídeo produzido. Talvez, contratar pra só passar fotos estáticas não seja tão interessante”.Dito e feito, parei pra pensar e realmente eu não tinha nada pra passar, era só o calor/desespero do momento. Isso me marcou muito, porque o fornecedor desse telão era MUITO parceiro da assessoria - e, sim, ela poderia ter me dado um empurrãozinho pra contratar e ajudar ele, mas no lugar disso me fez ponderar. Por isso digo que a Su é ju ta, ela preza pelo que é melhor para o evento e não para agradar os noivos ou fornecedor Poder confiar em alguém assim fez todo o processo ser diferente, sinto saudades dessa época e confio nela de olhos fechados até hoje 🤍.',
            data:'2025-05-17'
        },
        {
            nome:'Phelipe Lira',
            texto:'Assessora sensacional! Profissional totalmente competente, sempre disponível para dar suporte ao noivos durante todo o pré evento, durante ele e após também! Profissional que vale cada centavo do investimento!',
            data:'2025-05-17'
        },
        
           {
            nome:'Andressa Bonfim',
            texto:'Tivemos a honra dê tê-la em nosso dia também, um serviço impecável, muito cuidado, amor, atenção e comprometimento, escolheríamos mais 100000x, obrigada por tanto!',
            data:'2025-05-17'
        },
        {
            nome:'Rafael Monteiro',
            texto:'Assessora de extrema competência, sempre pronta para tirar suas duvidas e auxiliar com TUDO que você precisará em seu evento. Tivemos o prazer de ter a Suelen na equipe de nosso casamento em set/24 RECOMENDO PARA TODOSS !! ',
            data:'2025-05-17'
        },
         {
            nome:'Vitor e Millena',
            texto:'O nosso dia não poderia ser tão perfeito se não tivesse a Suelen e sua equipe nos auxiliando durante o casamento. Tivémos um imprevisto bem na semana do evento e mesmo assim ela aceitou o desafio, somos gratos pelo profissionalismo e dedicação que ela teve conosco. 05/10/2025',
            data:'2025-06-09'
        },
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