var marcas = [];
var segmentos = [];
var carrinho = [];

console.log("INCIALIZOU");

inicializarLocalStorage();
carregarArraysComLocalStorage();
// localStorage.setItem("usuarios", JSON.stringify(usuarios));
// localStorage.setItem("marcas", JSON.stringify(marcas));
// localStorage.setItem("produtos", JSON.stringify(produtos));
// localStorage.setItem("carrinho", JSON.stringify(carrinho));

function cadastrarSegmento() {
  console.log("teste");
  let nomeSegmentoInformado = document.getElementById(
    "input-segmento-nome"
  ).value;

  s = {
    nome: nomeSegmentoInformado,
  };

  segmentos.push(s);
  localStorage.setItem("segmentos", JSON.stringify(segmentos));
}

function existeSegmento() {}
function validarSegmento() {}
function excluirSegmento() {}
function atualizarTabelaSegmentos() {}
function cadastrarProduto() {}
function validarProduto() {}
function existeProduto() {}
function excluirProduto() {}
function atualizarTabelaProdutos() {}

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
  if (localStorage.getItem("segmentos") == null) {
    localStorage.setItem("segmentos", JSON.stringify(segmentos));
  }

  if (localStorage.getItem("produtos") == null) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }

  if (localStorage.getItem("carrinho") == null) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}
