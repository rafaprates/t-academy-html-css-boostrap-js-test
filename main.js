inicializarLocalStorage();
carregarArraysComLocalStorage();

function atualizarTabelaSegmentos() {
  var dados = "";
  for (s of segmentos) {
    dados += `<tr>
                <td>${s.nome}</td>
                </tr>`;
  }

  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function atualizarTabelaProdutos(tabelaProdutos = produtos) {
  var dados = "";
  for (p of tabelaProdutos) {
    dados += `<tr>
                <td>${p.nome}</td>
                <td>${p.segmento}</td>
                <td>${p.estoque}</td>
                <td>R$ ${p.preco}</td>
                <td><button onclick="addCarrinho(${produtos.indexOf(
                  p
                )})" class="btn btn-outline-info btn-sm">Carrinho</button></td>
                </tr>`;
  }
  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function gerarProdutosFiltrados() {
  console.log("produtosFiltrados()");

  let segmento = document.getElementById("selecionar-segmento").value;
  console.log(segmento);

  let = produtosFiltrados = [];

  for (p of produtos) {
    if (p.segmento == segmento) {
      produtosFiltrados.push(p);
    }
  }

  atualizarTabelaProdutos(produtosFiltrados);
}

function gerarProdutosAleatorios() {
  let produtosAleatorios = [];
  let indicesAleatorios = [];
  while (indicesAleatorios.length < 12) {
    indexAleatorio = Math.floor(Math.random() * produtos.length);

    if (indicesAleatorios.indexOf(indexAleatorio) === -1) {
      indicesAleatorios.push(indexAleatorio);
    }
  }
  console.log(indicesAleatorios);

  for (i of indicesAleatorios) {
    produtosAleatorios.push(produtos[i]);
  }

  atualizarTabelaProdutos(produtosAleatorios);
}

function produtoEmEstoque(nomeProduto, retirarQuantidade) {
  console.log("produtoEmEstoque()");
  for (p of produtos) {
    if (p.nome == nomeProduto) {
      var quantidadeEmEstoque = p.estoque;
    }
  }

  if (quantidadeEmEstoque - retirarQuantidade >= 0) {
    return true;
  }
  return false;
}

function pesquisarProduto() {
  let termoProcura = document.getElementById("termo-procura").value;
  document.getElementById("selecionar-segmento").value = "todos";
  produtosComTermo = [];
  for (p of produtos) {
    if (p.nome.indexOf(termoProcura) >= 0) {
      produtosComTermo.push(p);
      console.log(p.nome);
    }
  }

  atualizarTabelaProdutos(produtosComTermo);
}

function addCarrinho(idProduto) {
  console.log("addCarrinho()");
  // encontrar produto no array de Produtos
  let p = produtos[idProduto];
  console.log(p);

  // descontar a quantidade do estoque
  // atualizar localStorage

  if (p.estoque - 1 >= 0) {
    p.estoque = p.estoque - 1;
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Construir objeto que vai para carrinho
    if (existeProdutoEmCarrinho(p.nome)) {
      c = carrinho.find((element, index) => {
        return element.nomeProduto === p.nome;
      });
      c.quantidade = c.quantidade + 1;
    } else {
      c = {
        nomeProduto: p.nome,
        segmentoProduto: p.segmento,
        precoProduto: p.preco,
        quantidade: 1,
        precoProduto: p.preco,
      };
      carrinho.push(c);
    }
    // adicionar produto ao carrinho com o estoque descontado
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } else {
    alert("fora de estoque");
  }
}

function subtrairCarrinho(idProduto) {
  console.log(carrinho);
  let p = produtos[idProduto];

  c = carrinho.find((element, index) => {
    return element.nomeProduto === p.nome;
  });

  console.log("quantidade");
  console.log(c.quantidade);

  if (c.quantidade === 0) {
    console.log("É 0");
    excluirProdutoCarrinho(produtos.indexOf(produtos[idProduto]));
  } else {
    p.estoque = p.estoque + 1;
    localStorage.setItem("produtos", JSON.stringify(produtos));
    if (existeProdutoEmCarrinho(p.nome)) {
      c = carrinho.find((element, index) => {
        return element.nomeProduto === p.nome;
      });
      c.quantidade = c.quantidade - 1;
    }
    // carrinho.push(c);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}

function atualizarTabelaCarrinho() {
  console.log("foi chamada");
  var dados = "";
  for (c of carrinho) {
    let p = produtos.find((element, index) => {
      return element.nome == c.nomeProduto;
    });

    let indexProduto = produtos.indexOf(p);
    console.log(indexProduto);

    console.log(c);
    dados += `<tr>
                <td>${c.nomeProduto}</td>
                <td>${c.segmentoProduto}</td>
                <td>R$ ${c.precoProduto}</td>
                <td> 
                <button id='subtrair' class='atualizarProduto' onclick="subtrairCarrinho(${indexProduto}); atualizarTabelaCarrinho()">-</button>
                ${c.quantidade}
                <button id='add' class='atualizarProduto' onclick="addCarrinho(${indexProduto}); atualizarTabelaCarrinho()">+</button>
                </td>
                <td><button onclick="excluirProdutoCarrinho(${carrinho.indexOf(
                  c
                )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
                </tr>`;
  }
  document.getElementById(
    "total-carrinho"
  ).innerHTML = `Total carrinho: R$ ${totalCarrinho()}`;
  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function excluirProdutoCarrinho(indice) {
  item = carrinho[indice];
  quantidadeItem = item.quantidade;

  // Atualizar estoque do produto
  console.log(item.quantidade);
  var p = produtos.find((element, index) => {
    return element.nome === item.nomeProduto;
  });

  indiceProduto = produtos.indexOf(p);
  produtos[indiceProduto].estoque += quantidadeItem;
  localStorage.setItem("produtos", JSON.stringify(produtos));

  // Remover do carrinho
  carrinho.splice(indice, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarTabelaCarrinho();
}

function atualizarProdutoCarrinho(idProduto) {
  let quantidadeAtualizada = document.getElementById(
    `qtd-carrinho-produto-${idProduto}`
  ).value;

  console.log(quantidadeAtualizada);

  addCarrinho(idProduto, quantidadeAtualizada);
}

function totalCarrinho() {
  var total = 0;
  for (c of carrinho) {
    total += c.precoProduto * c.quantidade;
  }
  return total;
}

function existeProdutoEmCarrinho(nomeProduto) {
  for (c of carrinho) {
    if (c.nomeProduto == nomeProduto) {
      return true;
    }
  }
  return false;
}

function carregarArraysComLocalStorage() {
  if (localStorage.getItem("segmentos") != null) {
    segmentos = JSON.parse(localStorage.getItem("segmentos"));
  }

  if (localStorage.getItem("produtos") != null) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

  if (localStorage.getItem("carrinho") != null) {
    carrinho = JSON.parse(localStorage.getItem("carrinho"));
  }
}

function inicializarLocalStorage() {
  var segmentos = [
    { nome: "telefonia" },
    { nome: "vestuario" },
    { nome: "alimetício" },
  ];

  if (localStorage.getItem("segmentos") == null) {
    localStorage.setItem("segmentos", JSON.stringify(segmentos));
  }

  if (localStorage.getItem("produtos") == null) {
    var produtos = [
      { nome: "iPhone 4", segmento: "telefonia", preco: 1000, estoque: 100 },
      { nome: "iPhone 4s", segmento: "telefonia", preco: 1050, estoque: 100 },
      { nome: "iPhone 5", segmento: "telefonia", preco: 1100, estoque: 100 },
      { nome: "iPhone 5s", segmento: "telefonia", preco: 1250, estoque: 100 },
      { nome: "iPhone 6", segmento: "telefonia", preco: 1200, estoque: 100 },
      { nome: "iPhone 6s", segmento: "telefonia", preco: 1250, estoque: 100 },
      { nome: "iPhone 7", segmento: "telefonia", preco: 1400, estoque: 100 },
      { nome: "iPhone 7s", segmento: "telefonia", preco: 1500, estoque: 100 },
      { nome: "iPhone 12", segmento: "telefonia", preco: 3000, estoque: 100 },
      { nome: "iPhone 2089", segmento: "telefonia", preco: 3800, estoque: 2 },

      { nome: "camiseta", segmento: "vestuario", preco: 249, estoque: 100 },
      { nome: "bandeira", segmento: "vestuario", preco: 100, estoque: 100 },
      { nome: "short", segmento: "vestuario", preco: 59, estoque: 100 },
      { nome: "tenis", segmento: "vestuario", preco: 300, estoque: 100 },
      { nome: "chinelo", segmento: "vestuario", preco: 39, estoque: 100 },
      { nome: "colar", segmento: "vestuario", preco: 99, estoque: 100 },
      { nome: "calça", segmento: "vestuario", preco: 199, estoque: 100 },
      { nome: "boné", segmento: "vestuario", preco: 79, estoque: 100 },
      { nome: "cinto", segmento: "vestuario", preco: 89, estoque: 100 },
      { nome: "sunga", segmento: "vestuario", preco: 69, estoque: 100 },

      { nome: "sardinha", segmento: "alimentos", preco: 8.99, estoque: 5 },
      { nome: "arroz", segmento: "alimentos", preco: 18.99, estoque: 5 },
      { nome: "feijão", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "macarrão", segmento: "alimentos", preco: 4.99, estoque: 5 },
      { nome: "café", segmento: "alimentos", preco: 15.99, estoque: 5 },
      { nome: "açúcar", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "sal", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "óleo", segmento: "alimentos", preco: 8.99, estoque: 5 },
      { nome: "ovo", segmento: "alimentos", preco: 11.99, estoque: 5 },
      { nome: "carne", segmento: "alimentos", preco: 30.99, estoque: 5 },
    ];
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  if (localStorage.getItem("carrinho") == null) {
    var carrinho = [];
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}
