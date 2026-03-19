const games = [
    {
        title: "Forza Horizon 6",
        price: "R$ 299,00",
        image: "img/Forza Horizon 6.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["image/Forza Horizon 1.png", "image/Forza Horizon 2.png", "image/Forza Horizon 3.png"]
    },
    {
        title: "Assassin's Creed Black Flag",
        price: "R$ 119,99",
        image: "img/Assassins Creed Black Flag.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["image/Assassins Creed 1.png", "image/Assassins Creed 2.png", "image/Assassins Creed 3.png"]
    },
    {
        title: "ARC Raiders",
        price: "R$ 171,80",
        image: "img/ARC Raiders00.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["image/ARC Raiders 1.png", "image/ARC Raiders 2.png", "image/ARC Raiders 3.png"]
    },
    {
        title: "FC 26",
        price: "R$ 299,00",
        image: "img/EA FC 26.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["image/FC 26 1.png", "image/FC 26 2.png", "image/FC 26 3.png"]
    },
    {
        title: "Need For Speed Heat",
        price: "R$ 26,99",
        image: "img/Need For Speed Heat.jpeg",
        onSale: true, //indicar promoção
        platform: "Steam",
        system: "Windows",
        gallery: ["image/Need For Speed 1.png", "image/Need For Speed 2.png", "image/Need For Speed 3.png"]
    },
    {
        title: "Euro Truck Simulator",
        price: "R$ 15,99",
        image: "img/Euro Truck Simulator.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["image/ETS2 1.png", "image/ETS2 2.png", "image/ETS2 3.png"]
    },
    {
        title: "GTA VI",
        price: "Em Breve!",
        image: "img/GTA VI 0.jpg",
        platform: "Steam e Rockstar",
        system: "Windows",
        gallery: ["image/GTA VI 1.png", "image/GTA VI 2.png", "image/GTA VI 3.png"]
    },
    {
        title: "Batman Arkham Knight",
        price: "R$ 26,99",
        image: "img/Batman Arkham Knight.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["image/Batman Arkham Knight 1.png", "image/Batman Arkham Knight 2.png", "image/Batman Arkham Knight 3.png"]
    },
    {
        title: "Assetto Corsa",
        price: "R$ 59,99",
        image: "img/Assetto Corsa.jpg",
        platform: "Steam",
        system: "Windows",
        gallery: ["image/Assetto Corsa 1.png", "image/Assetto Corsa 2.png", "image/Assetto Corsa 3.png"]
    },
    {
        title: "GTA V",
        price: "R$ 74,99",
        image: "img/GTA V.jpg",
        onSale: true,
        platform: "Steam",
        system: "Windows",
        gallery: ["image/GTA V 1.png", "image/GTA V 2.png", "image/GTA V 3.png"]
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

// Controle da Galeria de Imagens do Produto
// Variável global para controlar qual foto está aparecendo
let productImgIndex = 0;

function loadProductDetails() {
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));

    if (gameData) {
        document.querySelector('.game-title').innerText = gameData.title;
        document.querySelector('.price-tag').innerHTML = `<span class="currency">R$</span>${gameData.price}`;
        document.getElementById('current-img').src = gameData.image;
        document.querySelector('.platform-text strong').innerText = gameData.platform;
        
        // Criar as miniaturas dinamicamente
        const thumbContainer = document.querySelector('.thumb-list');
        thumbContainer.innerHTML = ""; 

        if (gameData.gallery && gameData.gallery.length > 0) {
            gameData.gallery.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                // A primeira foto começa com a borda de "ativa"
                img.className = index === 0 ? "thumb active" : "thumb"; 
                img.onclick = () => selectImg(imgSrc, index);
                thumbContainer.appendChild(img);
            });
        }
    }
}

// Função para mudar a imagem principal
function selectImg(src, index) {
    const mainImg = document.getElementById('current-img');
    if (mainImg) {
        mainImg.src = src;
        productImgIndex = index;
        
        // Atualiza qual miniatura parece selecionada
        const thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach(t => t.classList.remove('active'));
        if (thumbs[index]) thumbs[index].classList.add('active');
    }
}

// Função das SETAS (Agora usa as fotos do jogo selecionado)
function moveGallery(step) {
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));
    
    if (gameData && gameData.gallery) {
        productImgIndex += step;
        
        // Carrossel infinito: volta ao início ou fim
        if (productImgIndex >= gameData.gallery.length) productImgIndex = 0;
        if (productImgIndex < 0) productImgIndex = gameData.gallery.length - 1;
        
        selectImg(gameData.gallery[productImgIndex], productImgIndex);
    }
}


//Cards Clicaveis
function loadGames() {
    const container = document.getElementById('games-container');
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.style.cursor = "pointer"; // Indica que é clicável

        // Quando clicar no card...
        card.onclick = () => {
            // Salva os dados do jogo clicado na memória do navegador
            localStorage.setItem('selectedGame', JSON.stringify(game));
            // Vai para a página de produto
            window.location.href = "telaGame.html";
        };

        const promoHTML = game.onSale ? `<span class="promo-badge">Promoção</span>` : '';
        card.innerHTML = `
            ${promoHTML}
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p class="price">R$ ${game.price}</p>
        `;
        container.appendChild(card);
    });
}

// Função para carregar os detalhes do produto
function loadProductDetails() {
    // Recupera os dados do jogo que foi clicado na Home
    const gameData = JSON.parse(localStorage.getItem('selectedGame'));

    if (gameData) {
        // Preenche o Título
        document.querySelector('.game-title').innerText = gameData.title;
        
        // Preenche o Preço (usando a nova estrutura de spans)
        document.querySelector('.price-section .value').innerText = gameData.price;
        
        // Preenche a Imagem Principal
        document.getElementById('current-img').src = gameData.image;
        
        // Preenche a Plataforma (genérico)
        document.querySelector('.info-text strong').innerText = gameData.platform;
        
        // Monta as miniaturas (thumbnails)
        const thumbContainer = document.querySelector('.thumb-list');
        thumbContainer.innerHTML = ""; // Limpa antigas
        
        if (gameData.gallery && gameData.gallery.length > 0) {
            gameData.gallery.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = index === 0 ? "thumb active" : "thumb";
                img.onclick = () => selectImg(imgSrc, index);
                thumbContainer.appendChild(img);
            });
        }
    }
}

// Chame essa função apenas se estiver na página de produto
if (window.location.pathname.includes("telaGame.html")) {
    window.onload = loadProductDetails;
}

