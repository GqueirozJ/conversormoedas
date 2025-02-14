function Converter() {
  var valorElemento = document.getElementById("valorEmReais");
  var valor = valorElemento.value;
  var valorEmRealNumerico = parseFloat(valor);
  if (valor === "") {
    return alert("Digite um valor!");
  } else if (valor <= 0) {
    return (document.getElementById("valorConvertidoEmLibra").innerHTML =
      "Digite um valor maior que 0!");
  }
  var valorEmDolarNumerico = valorEmRealNumerico * 0.17;
  var valorEmLibraNumerico = valorEmRealNumerico * 0.16;
  var valorEmBitCoinNumerico = valorEmRealNumerico * 0.1;

  var rasultadoDolar = valorEmDolarNumerico.toFixed(2);
  var resultadoLibra = valorEmLibraNumerico.toFixed(2);
  var resultadoBitCoin = valorEmBitCoinNumerico.toFixed(2);

  var elementoValorConvertidoEmDolar = document.getElementById(
    "valorConvertidoEmDolar"
  );
  var elementoValorConvertidoEmLibra = document.getElementById(
    "valorConvertidoEmLibra"
  );
  var elementoValorConvertidoEmBitCoin = document.getElementById(
    "valorConvertidoEmBitCoin"
  );
  var valorConvertidoEmDolar =
    "R$" + valorEmRealNumerico + " vale $" + rasultadoDolar + "!";
  var valorConvertidoEmLibra =
    "R$" + valorEmRealNumerico + " vale £" + resultadoLibra + "!";
  var valorConvertidoEmBitcoin =
    "R$" + valorEmRealNumerico + " vale " + resultadoBitCoin + " BitCoins !";
  elementoValorConvertidoEmDolar.innerHTML = valorConvertidoEmDolar;
  elementoValorConvertidoEmLibra.innerHTML = valorConvertidoEmLibra;
  elementoValorConvertidoEmBitCoin.innerHTML = valorConvertidoEmBitcoin;
}
