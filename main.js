var segmentos = [
  { nome: "telefonia" },
  { nome: "vestuario" },
  { nome: "alimetício" },
];

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
  { nome: "iPhone 12 Pro", segmento: "telefonia", preco: 3800, estoque: 100 },

  { nome: "camiseta", segmento: "vestuario", preco: 249, estoque: 100 },
  { nome: "bandeira", segmento: "vestuario", preco: 100, estoque: 100 },
  { nome: "short ", segmento: "vestuario", preco: 59, estoque: 100 },
  { nome: "tenis ", segmento: "vestuario", preco: 300, estoque: 100 },
  { nome: "chinelo ", segmento: "vestuario", preco: 39, estoque: 100 },
  { nome: "camiseta regata ", segmento: "vestuario", preco: 99, estoque: 100 },
  { nome: "calça ", segmento: "vestuario", preco: 199, estoque: 100 },
  { nome: "boné ", segmento: "vestuario", preco: 79, estoque: 100 },
  { nome: "cinto ", segmento: "vestuario", preco: 89, estoque: 100 },
  { nome: "sunga ", segmento: "vestuario", preco: 69, estoque: 100 },
];

var carrinho = [];

console.log("INCIALIZOU");

inicializarLocalStorage();
carregarArraysComLocalStorage();

function existeSegmento() {}
function validarSegmento() {}
function excluirSegmento() {}

function atualizarTabelaSegmentos() {
  var dados = "";
  for (s of segmentos) {
    dados += `<tr>
                <td>${s.nome}</td>
                <td><button onclick="excluirMarca(${segmentos.indexOf(
                  s
                )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
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
                <td><button onclick="excluirMarca(${produtos.indexOf(
                  p
                )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
                </tr>`;

    document.getElementsByTagName("tbody")[0].innerHTML = dados;
  }
}

function atualizarTabelaProdutosAleatorios() {
  var dados = "";

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
    dados += `<tr>
   <td>${produtos[i].nome}</td>
   <td>${produtos[i].segmento}</td>
   <td>${produtos[i].estoque}</td>
   <td>R$ ${produtos[i].preco}</td>
   <td><button onclick="excluirMarca(
   )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
   </tr>`;
  }
  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function pesquisarProduto() {
  let termoProcura = document.getElementById("termo-procura").value;
  produtosComTermo = [];
  for (p of produtos) {
    if (p.nome.indexOf(termoProcura) >= 0) {
      produtosComTermo.push(p);
      console.log(p.nome);
    }
  }

  atualizarTabelaProdutos(produtosComTermo);
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
  localStorage.setItem("segmentos", JSON.stringify(segmentos));
  localStorage.setItem("produtos", JSON.stringify(produtos));
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  // if (localStorage.getItem("segmentos") == null) {
  // localStorage.setItem("segmentos", JSON.stringify(segmentos));
  // }

  // if (localStorage.getItem("produtos") == null) {
  // localStorage.setItem("produtos", JSON.stringify(produtos));
  // }

  // if (localStorage.getItem("carrinho") == null) {
  // localStorage.setItem("carrinho", JSON.stringify(carrinho));
  // }
}
