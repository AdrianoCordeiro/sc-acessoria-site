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
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
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
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const video = item.querySelector('video');
                
                if (img) {
                    modalImage.src = img.src;
                    modalImage.style.display = 'block';
                    modalVideo.style.display = 'none';
                    modalVideo.pause();
                } else if (video) {
                    modalVideo.src = video.src;
                    modalVideo.style.display = 'block';
                    modalImage.style.display = 'none';
                    modalVideo.load();
                    modalVideo.play();
                }
                
                modal.classList.add('active');
            });
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
    class DepoimentoManager {
        constructor() {
            this.localStorageKey = 'sc_assessoria_depoimentos';
            this.loadDepoimentos();
            this.setupForm();
        }

        async loadDepoimentos() {
            const localDepoimentos = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
            this.displayDepoimentos(localDepoimentos);
        }

        displayDepoimentos(depoimentos) {
            const container = document.getElementById('lista-depoimentos');
            if (!container) return;

            const approved = depoimentos.filter(d => d.status === 'approved');

            if (approved.length === 0) {
                container.innerHTML = `
                    <div class="no-depoimentos">
                        <p>Ainda não há depoimentos. Seja o primeiro a compartilhar sua experiência!</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = approved.map(depoimento => `
                <div class="depoimento-item">
                    <p class="depoimento-author">${depoimento.nome}</p>
                    <p class="depoimento-text">"${depoimento.texto}"</p>
                    <span class="depoimento-date">${this.formatDate(depoimento.data)}</span>
                </div>
            `).join('');
        }

        formatDate(dateString) {
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        }

        async saveDepoimento(depoimento) {
            depoimento = {
                ...depoimento,
                data: new Date().toISOString(),
                status: 'pending',
                ip: await this.getIP()
            };

            const depoimentos = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
            depoimentos.unshift(depoimento);
            localStorage.setItem(this.localStorageKey, JSON.stringify(depoimentos));
            
            this.showMessage('Obrigado pelo seu depoimento! Ele será publicado após aprovação.', 'success');
            return true;
        }

        async getIP() {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                return data.ip || 'unknown';
            } catch {
                return 'unknown';
            }
        }

        showMessage(text, type) {
            const existing = document.querySelector('.form-message');
            if (existing) existing.remove();

            const form = document.getElementById('form-depoimento');
            if (!form) return;

            const message = document.createElement('div');
            message.className = `form-message ${type}`;
            message.textContent = text;
            
            form.prepend(message);
            
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            }, 5000);
        }

        setupForm() {
            const form = document.getElementById('form-depoimento');
            if (!form) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const nome = document.getElementById('nome').value.trim();
                const texto = document.getElementById('texto').value.trim();
                const email = document.getElementById('email').value.trim();

                if (!nome || !texto) {
                    this.showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                    return;
                }

                const success = await this.saveDepoimento({ nome, texto, email });
                if (success) {
                    form.reset();
                    this.loadDepoimentos();
                }
            });
        }
    }

    new DepoimentoManager();

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