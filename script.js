// Simulação de dados de produtos (poderia vir de um backend)
const produtos = [
    { id: 1, nome: 'Polystation 1', preco: 49.99, descricao: 'Polystation 1 com 2 controles, 1 arma (Brinquedo), cabo de energia, jogo contra(trilogia) e console. 3 meses de garantia, e 256 mb de memória.', imagem: '../po1.jfif' },
    { id: 2, nome: 'Polystation 2', preco: 99.99, descricao: 'Polystation 2 com 2 controles, cabo de energia, god of hope jogo e console. 3 meses de garantia, e 1024 mb de memória.', imagem: '../po2.jpg' },
    { id: 3, nome: 'Polystation 3', preco: 149.99, descricao: 'Polystation 3 com 2 controles, cabo de energia e console. 3 meses de garantia, e 2 gb de memória. SUPORTE A JOGOS COOP ONLINE.', imagem: '../po3.jpg' },
    { id: 4, nome: 'Polystation 4', preco: 199.99, descricao: 'Polystation 4 com 2 controles, cabo de energia e console. 3 meses de garantia, e 4 GB de memória....', imagem: '../po4.webp' },
];

// Carrinho de compras (simulação de um carrinho virtual)
let carrinho = [];

// Função para exibir os produtos na página
function mostrarProdutos() {
    const produtosLista = document.querySelector('.produtos-lista');
    produtosLista.innerHTML = ''; // Limpar a lista antes de adicionar novamente os produtos

    produtos.forEach(produto => {
        const cardProduto = document.createElement('div');
        cardProduto.classList.add('produto');
        cardProduto.innerHTML = `
            <h3>${produto.nome}</h3>
            <img src="imagens/${produto.imagem}" alt="${produto.nome}">
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            <button onclick="abrirDetalhesProduto(${produto.id})">Detalhes do Produto</button>
        `;
        produtosLista.appendChild(cardProduto);
    });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(id) {
    // Encontrar o produto pelo ID nos dados de produtos
    const produtoSelecionado = produtos.find(produto => produto.id === id);

    if (produtoSelecionado) {
        // Verificar se o produto já está no carrinho
        const produtoNoCarrinho = carrinho.find(item => item.id === id);
        if (produtoNoCarrinho) {
            produtoNoCarrinho.quantidade++; // Incrementar a quantidade se já estiver no carrinho
        } else {
            carrinho.push({ // Adicionar o produto ao carrinho (simulação de um objeto com detalhes do produto)
                id: produtoSelecionado.id,
                nome: produtoSelecionado.nome,
                preco: produtoSelecionado.preco,
                quantidade: 1,
                imagem: produtoSelecionado.imagem // Adicionando imagem ao carrinho
            });
        }

        // Exemplo de mensagem de confirmação (poderia ser substituído por uma funcionalidade de UI real)
        alert(`Produto ${produtoSelecionado.nome} adicionado ao carrinho!`);

        // Poderíamos atualizar a interface do carrinho aqui, se necessário
        atualizarCarrinho();
    }
}

// Função para atualizar a interface do carrinho
function atualizarCarrinho() {
    const carrinhoLista = document.querySelector('.carrinho-lista');
    carrinhoLista.innerHTML = ''; // Limpar a lista antes de adicionar novamente os itens do carrinho

    if (carrinho.length === 0) {
        carrinhoLista.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const cardItem = document.createElement('div');
            cardItem.classList.add('carrinho-item');
            cardItem.innerHTML = `
                <div class="carrinho-item-detalhes">
                    <img src="imagens/${item.imagem}" alt="${item.nome}">
                    <h4>${item.nome}</h4>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
                    <p>Total: R$ ${(item.quantidade * item.preco).toFixed(2)}</p>
                </div>
            `;
            carrinhoLista.appendChild(cardItem);
        });
    }
}

// Função para abrir o modal de Produto
function abrirDetalhesProduto(id) {
    const produtoSelecionado = produtos.find(produto => produto.id === id);
    if (produtoSelecionado) {
        const modalProduto = document.getElementById('modal-produto');
        const modalContent = modalProduto.querySelector('.modal-content');
        modalContent.innerHTML = `
            <span class="fechar-modal" onclick="fecharProdutos()">&times;</span>
            <div id="produto-detalhes">
                <h2>${produtoSelecionado.nome}</h2>
                <img src="imagens/${produtoSelecionado.imagem}" alt="${produtoSelecionado.nome}">
                <p>${produtoSelecionado.descricao}</p>
                <p>Preço: R$ ${produtoSelecionado.preco.toFixed(2)}</p>
            </div>
        `;
        modalProduto.style.display = 'block';
    }
}

// Função para fechar o modal de Produto
function fecharProdutos() {
    const modalProduto = document.getElementById('modal-produto');
    modalProduto.style.display = 'none';
}

// Função para abrir o modal de Compra
function abrirCompra() {
    const modalCompra = document.getElementById('modal-compra');
    modalCompra.style.display = 'block';
}

// Função para fechar o modal de Compra
function fecharCompra() {
    const modalCompra = document.getElementById('modal-compra');
    modalCompra.style.display = 'none';
}

// Função para confirmar a compra (submeter o formulário)
function confirmarCompra(event) {
    event.preventDefault(); // Impede o envio do formulário (comportamento padrão)

    // Aqui você poderia implementar a lógica para processar a compra, enviar os dados para um servidor, etc.

    alert('Compra confirmada! Dados enviados: ' +
        '\nNome: ' + document.getElementById('nome').value +
        '\nEmail: ' + document.getElementById('email').value +
        '\nEndereço: ' + document.getElementById('endereco').value);

    // Limpar o formulário após a confirmação
    document.getElementById('form-compra').reset();

    // Fechar o modal após a confirmação
    fecharCompra();

    // Poderíamos adicionar mais ações aqui, como limpar o carrinho, atualizar o histórico de compras do usuário, etc.
}

// Chamar a função para mostrar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProdutos();
    atualizarCarrinho(); // Atualizar o carrinho ao carregar a página
});
cardProduto.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="imagens/${produto.imagem}" alt="${produto.nome}">
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button class="botao-carrinho" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    <button class="botao-detalhes" onclick="abrirDetalhesProduto(${produto.id})">Detalhes do Produto</button>
`;
