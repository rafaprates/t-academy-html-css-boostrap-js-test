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
  let segmento = document.getElementById("selecionar-segmento").value;
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
  for (i of indicesAleatorios) {
    produtosAleatorios.push(produtos[i]);
  }
  atualizarTabelaProdutos(produtosAleatorios);
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
  let p = produtos[idProduto];
  if (p.estoque - 1 >= 0) {
    p.estoque = p.estoque - 1;
    localStorage.setItem("produtos", JSON.stringify(produtos));

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
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  } else {
    alert("Fora de estoque");
  }
}

function subtrairCarrinho(idProduto) {
  let p = produtos[idProduto];

  c = carrinho.find((element, index) => {
    return element.nomeProduto === p.nome;
  });

  if (c.quantidade === 1) {
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
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}

function atualizarTabelaCarrinho() {
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

  var p = produtos.find((element, index) => {
    return element.nome === item.nomeProduto;
  });

  indiceProduto = produtos.indexOf(p);
  produtos[indiceProduto].estoque += quantidadeItem;
  localStorage.setItem("produtos", JSON.stringify(produtos));

  carrinho.splice(indice, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarTabelaCarrinho();
}

function totalCarrinho() {
  var total = 0;
  for (c of carrinho) {
    total += c.precoProduto * c.quantidade;
  }
  return total.toFixed(2);
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
    { nome: "alimet??cio" },
  ];

  if (localStorage.getItem("segmentos") == null) {
    localStorage.setItem("segmentos", JSON.stringify(segmentos));
  }

  if (localStorage.getItem("produtos") == null) {
    var produtos = [
      { nome: "iPhone 4", segmento: "telefonia", preco: 1000, estoque: 10 },
      { nome: "iPhone 4s", segmento: "telefonia", preco: 1050, estoque: 10 },
      { nome: "iPhone 5", segmento: "telefonia", preco: 1100, estoque: 10 },
      { nome: "iPhone 5s", segmento: "telefonia", preco: 1250, estoque: 10 },
      { nome: "iPhone 6", segmento: "telefonia", preco: 1200, estoque: 10 },
      { nome: "iPhone 6s", segmento: "telefonia", preco: 1250, estoque: 10 },
      { nome: "iPhone 7", segmento: "telefonia", preco: 1400, estoque: 10 },
      { nome: "iPhone 7s", segmento: "telefonia", preco: 1500, estoque: 10 },
      { nome: "iPhone 12", segmento: "telefonia", preco: 3000, estoque: 10 },
      { nome: "iPhone 2089", segmento: "telefonia", preco: 3800, estoque: 2 },

      { nome: "camiseta", segmento: "vestuario", preco: 249, estoque: 10 },
      { nome: "bandeira", segmento: "vestuario", preco: 100, estoque: 10 },
      { nome: "short", segmento: "vestuario", preco: 59, estoque: 10 },
      { nome: "tenis", segmento: "vestuario", preco: 300, estoque: 10 },
      { nome: "chinelo", segmento: "vestuario", preco: 39, estoque: 10 },
      { nome: "colar", segmento: "vestuario", preco: 99, estoque: 10 },
      { nome: "cal??a", segmento: "vestuario", preco: 199, estoque: 10 },
      { nome: "bon??", segmento: "vestuario", preco: 79, estoque: 10 },
      { nome: "cinto", segmento: "vestuario", preco: 89, estoque: 10 },
      { nome: "sunga", segmento: "vestuario", preco: 69, estoque: 10 },

      { nome: "sardinha", segmento: "alimentos", preco: 8.99, estoque: 5 },
      { nome: "arroz", segmento: "alimentos", preco: 18.99, estoque: 5 },
      { nome: "feij??o", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "macarr??o", segmento: "alimentos", preco: 4.99, estoque: 5 },
      { nome: "caf??", segmento: "alimentos", preco: 15.99, estoque: 5 },
      { nome: "a????car", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "sal", segmento: "alimentos", preco: 10.99, estoque: 5 },
      { nome: "??leo", segmento: "alimentos", preco: 8.99, estoque: 5 },
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
