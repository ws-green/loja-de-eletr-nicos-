const produtos = [
    { id: 1, nome: "iPhone 15 Pro", preco: 7299, img: "https://m.media-amazon.com/images/I/81SigNoY8xL._AC_SL1500_.jpg" },
    { id: 2, nome: "Apple Watch S9", preco: 3499, img: "https://m.media-amazon.com/images/I/71XvD6Y5KXL._AC_SL1500_.jpg" },
    { id: 3, nome: "Sony WH-1000XM5", preco: 2100, img: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SL1000_.jpg" },
    { id: 4, nome: "MacBook Air M2", preco: 8499, img: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg" }
];

let carrinho = [];

function changeScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    // Mostrar a tela escolhida
    document.getElementById(screenId).classList.remove('hidden');

    // Lógica para Header e Nav (Só aparecem fora da Welcome)
    const header = document.getElementById('app-header');
    const nav = document.getElementById('bottom-nav');

    if (screenId === 'screen-welcome') {
        header.classList.add('hidden');
        nav.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
        nav.classList.remove('hidden');
    }

    if (screenId === 'screen-cart') renderCart();
}

function renderHome() {
    const grid = document.getElementById('product-list');
    grid.innerHTML = produtos.map(p => `
        <div class="card">
            <img src="${p.img}">
            <h4>${p.nome}</h4>
            <p class="price">R$ ${p.preco.toFixed(2)}</p>
            <button class="btn-add-small" onclick="addCart(${p.id})">+</button>
        </div>
    `).join('');
}

function addCart(id) {
    const prod = produtos.find(p => p.id === id);
    carrinho.push(prod);
    document.getElementById('cart-count').innerText = carrinho.length;
    alert(`${prod.nome} adicionado!`);
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('total-price');
    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding:50px;'>Seu carrinho está vazio.</p>";
    } else {
        container.innerHTML = carrinho.map(item => {
            total += item.preco;
            return `
                <div style="background:white; padding:15px; border-radius:15px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                    <span>${item.nome}</span>
                    <strong>R$ ${item.preco.toFixed(2)}</strong>
                </div>
            `;
        }).join('');
    }
    totalEl.innerText = `R$ ${total.toFixed(2)}`;
}

// Inicialização
window.onload = () => {
    renderHome();
};