  // Efeito de header ao rolar
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Função para criar coração flutuante
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'floating-hearts';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.position = 'fixed';
    heart.style.animation = 'floatHeart 1.5s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

// Adiciona corações ao movimento do mouse
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // 10% chance de criar um coração
        createFloatingHeart(e.clientX, e.clientY);
    }
});

function showLove() {
    const messages = [
        "Você ilumina o mundo com sua força e delicadeza! ✨💖",
        "Hoje é seu dia, mas você brilha todos os dias! 🌟",
        "Sua força e sua doçura inspiram a todos ao seu redor! 💕",
        "Feliz Dia da Mulher! Você merece todo amor e reconhecimento! ❤️🌷",
        "Seu poder e sua beleza vão muito além do que os olhos podem ver! 💪🌸",
        "Com você, o mundo se torna mais especial! 💖",
        "Mulher, você é incrível, única e insubstituível! 💎",
        "Juntas, somos mais fortes! 💪❤️"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Cria um elemento de alerta personalizado
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(229, 9, 20, 0.9);
        padding: 20px;
        border-radius: 10px;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    // Criar explosão de corações
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart(
                Math.random() * window.innerWidth,
                window.innerHeight
            );
        }, i * 100);
    }
    
    setTimeout(() => {
        alertBox.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            alertBox.remove();
        }, 300);
    }, 3000);
}

// Animação suave para items da galeria
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0) rotate(0deg)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px) rotate(-5deg)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});

function toggleMusic() {
    const audio = document.getElementById('loveSong');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}






 // Função para confirmar se ela já viu tudo
 function confirmRead() {
    const response = confirm("Você já viu tudo antes de ir para a surpresa final? ❤️");
    if (response) {
        // Se respondeu "Sim", esconde o botão de confirmação e exibe o botão de surpresa
        document.querySelector('.confirm-button').style.display = 'none';
        document.querySelector('.surprise-button').style.display = 'block';
        // Adiciona efeito de pulsação ao botão de surpresa
        setTimeout(() => {
            document.querySelector('.surprise-button').classList.add('pulse');
        }, 200);
    } else {
        // Se respondeu "Não", alerta para ela aproveitar cada detalhe
        alert("Então volte e aproveite cada detalhe primeiro! 😢💕");
    }
}

 // Função para iniciar a surpresa final
 function startSurprise() {
    const button = document.querySelector('.surprise-button');
    const loader = document.querySelector('.netflix-loader');
    const progressBar = document.querySelector('.progress');
    const percentage = document.querySelector('.percentage');
    const loadingText = document.querySelector('.loading-text');
    const finalMessage = document.querySelector('.final-message');
    
    const messages = [
        "Preparando algo especial...",
        "Quase lá...",
        "Carregando muito amor...",
        "Reunindo momentos especiais...",
        "Preparando seu coração...",
        "Fazendo mágica acontecer...",
        "Um momento único chegando...",
        "Algo incrível está por vir...",
        "Preparando uma surpresa inesquecível..."
    ];

    button.style.display = 'none';
    loader.style.display = 'block';

    let progress = 0;
    const duration = 50; // minutos em segundos
    const interval = 50; // Atualiza a cada 50ms
    const increment = 100 / (duration * (1000 / interval));

    const updateProgress = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(updateProgress);
            showFinalMessage();
        }
        progressBar.style.width = `${progress}%`;
        percentage.textContent = `${Math.min(Math.round(progress), 100)}%`;
        
        // Atualiza a mensagem aleatoriamente (10% de chance a cada intervalo)
        if (Math.random() < 0.1) {
            loadingText.textContent = messages[Math.floor(Math.random() * messages.length)];
        }
    }, interval);

    // Efeito de "shake" na porcentagem em pontos específicos
    const shakePoints = [25, 50, 75, 90];
    const progressCheck = setInterval(() => {
        const currentProgress = Math.round(progress);
        if (shakePoints.includes(currentProgress)) {
            percentage.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                percentage.style.animation = '';
            }, 500);
        }
    }, 100);
}

// Função para exibir a mensagem final após o carregamento
function showFinalMessage() {
    const loader = document.querySelector('.netflix-loader');
    const finalMessage = document.querySelector('.final-message');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        finalMessage.style.display = 'block';
        // Cria explosão de corações
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    window.innerHeight
                );
            }, i * 100);
        }
    }, 1000);
}

// Função para criar corações flutuantes (pode ser adaptada conforme seu código anterior)
function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.animation = 'floatHeart 1.5s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

// Adiciona animações necessárias via CSS, se ainda não estiverem definidas
const styleElem = document.createElement('style');
styleElem.innerHTML = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(styleElem);



let isPlaying = false;

function toggleMedia() {
    let video = document.getElementById("video");
    let audio = document.getElementById("loveSong");
    let overlay = document.getElementById("video-overlay");
    let button = document.getElementById("toggleButton");

    if (!isPlaying) {
        overlay.style.display = "none"; // Esconde a tela preta
        video.classList.remove("hidden"); // Mostra o vídeo
        video.play(); // Inicia o vídeo
        audio.play(); // Inicia a música
        button.innerHTML = "⏸️ Pausar Música"; // Muda o botão
    } else {
        video.pause(); // Pausa o vídeo
        audio.pause(); // Pausa a música
        button.innerHTML = "🎶 Tocar Música"; // Muda o botão
    }

    isPlaying = !isPlaying; // Alterna entre tocar e pausar
}