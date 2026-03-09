const games = [
    {
        title: "Forza Horizon 6",
        price: "R$ 299,00",
       image: "img/Forza Horizon 6.jpg"
    },
    {
        title: "Assassin's Creed Black Flag",
        price: "R$ 119,99",
        image: "img/Assassins Creed Black Flag.jpg"
    },
    {
        title: "ARC Raiders",
        price: "R$ 171,80",
        image: "img/ARC Raiders00.jpg"
    },
    {
        title: "FC 26",
        price: "R$ 299,00",
        image: "img/EA FC 26.jpg"
    },
    {
        title: "Need For Speed Heat",
        price: "R$ 26,99",
        image: "img/Need For Speed Heat.jpeg",
        onSale: true //indicar promoção
    },
    {
        title: "Euro Truck Simulator",
        price: "R$ 15,99",
        image: "img/Euro Truck Simulator.jpg",
        onSale: true 
    },
    {
        title: "GTA VI",
        price: "Em Breve!",
        image: "img/GTA VI 0.jpg"
    },
    {
        title: "Batman Arkham Knight",
        price: "R$ 26,99",
        image: "img/Batman Arkham Knight.jpg",
        onSale: true
    },
    {
        title: "Assetto Corsa",
        price: "R$ 59,99",
        image: "img/Assetto Corsa.jpg"
    },
    {
        title: "GTA V",
        price: "R$ 74,99",
        image: "img/GTA V.jpg",
        onSale: true
    }
];

function loadGames() {
    const container = document.getElementById('games-container');
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        // Verifica se o jogo está em promoção para mostrar a etiqueta
        const promoHTML = game.onSale ? `<span class="promo-badge">Promoção</span>` : '';
        
        card.innerHTML = `
            ${promoHTML}
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p class="price">${game.price}</p>
        `;
        
        container.appendChild(card);
    });
}

let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    
    // Remove a classe active do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Calcula o próximo slide
    currentSlide += direction;
    
    // Volta para o início se chegar no fim, ou vice-versa
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Adiciona a classe active no novo slide
    slides[currentSlide].classList.add('active');
}

// Opcional: Troca de slide automática a cada 5 segundos
setInterval(() => changeSlide(1), 5000);

function toggleMenu() {
    // Busca o menu e o fundo escuro pelos IDs
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // O comando toggle 'liga' ou 'desliga' a classe active
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleMenu() {
    // Seleciona o menu lateral e o fundo escuro
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Verifica se os elementos existem para evitar erros
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}


window.onload = loadGames;