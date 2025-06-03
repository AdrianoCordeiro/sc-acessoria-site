const slides = document.querySelectorAll('#hero-slider .slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentSlide = 0;

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

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Opcional: trocar slide automaticamente a cada 5 segundos
setInterval(nextSlide, 5000);

// Mostrar o primeiro slide no começo
showSlide(currentSlide);

// Manipulação do modal para vídeos rotacionados e imagens
const modal = document.getElementById('mediaModal');
const modalVideo = document.getElementById('modalVideo');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close');

// Manipulação de vídeos rotacionados
document.querySelectorAll('.rotate-video').forEach(video => {
  video.addEventListener('click', () => {
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.src = video.src;
    modalVideo.play();
    modal.style.display = 'flex';
  });
});

// Manipulação de imagens
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.src = img.src;
    modal.style.display = 'flex';
  });
});

// Fechar o modal
closeModal.addEventListener('click', () => {
  modalVideo.pause();
  modalVideo.src = '';
  modalImage.src = '';
  modal.style.display = 'none';
});