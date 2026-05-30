let cotacaoDolar = 0;
let cotacaoEuro = 0;
let cotacaoLibra = 0;
let cotacaoIene = 0;
let cotacaoYuan = 0;

async function buscarCotacoesDoDia() {
    const url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,CNY-BRL';
    
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        cotacaoDolar = parseFloat(dados.USDBRL.bid);
        cotacaoEuro = parseFloat(dados.EURBRL.bid);
        cotacaoLibra = parseFloat(dados.GBPBRL.bid);
        cotacaoIene = parseFloat(dados.JPYBRL.bid);
        cotacaoYuan = parseFloat(dados.CNYBRL.bid);

        let dataAPI = dados.USDBRL.create_date; 
        let dataPartes = dataAPI.split(" ");
        let dataFormatada = dataPartes[0].split("-").reverse().join("/") + " às " + dataPartes[1];

        const formatarBRL = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

        document.getElementById("painelCotacoes").innerHTML = `
            <strong>Cotações Baseadas no Real (R$):</strong><br>
            🇺🇸 US$: ${formatarBRL(cotacaoDolar)} | 🇪🇺 €: ${formatarBRL(cotacaoEuro)}<br>
            🇬🇧 £: ${formatarBRL(cotacaoLibra)} | 🇯🇵 ¥: ${formatarBRL(cotacaoIene)}<br>
            🇨🇳 ¥: ${formatarBRL(cotacaoYuan)}
            <span class="data-atualizacao">Última atualização: ${dataFormatada}</span>
        `;
    } catch (erro) {
        console.error("Erro ao buscar cotações:", erro);
        document.getElementById("painelCotacoes").innerHTML = "Erro ao conectar com o mercado financeiro.";
    }
}

buscarCotacoesDoDia();

// --- NOVA FUNÇÃO: Máscara de Dinheiro em Tempo Real ---
function mascaraDinheiro(elemento) {
    // 1. Remove tudo que não for dígito numérico
    let valorCru = elemento.value.replace(/\D/g, "");
    
    if (valorCru === "") {
        elemento.value = "";
        return;
    }
    
    // 2. Divide por 100 para criar os centavos (Ex: 100099 vira 1000.99)
    let valorNumerico = parseFloat(valorCru) / 100;
    
    // 3. Formata para o padrão brasileiro (1.000,99) e joga de volta na tela
    elemento.value = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorNumerico);
}

// --- FUNÇÃO AUXILIAR: Transforma "1.000,99" do texto de volta para 1000.99 do computador ---
function lerValorDigitado() {
    let valorTexto = document.getElementById("valorInput").value;
    if (valorTexto === "") return NaN;
    
    // Tira os pontos separadores de milhar e troca a vírgula dos centavos por ponto
    let valorLimpo = valorTexto.replace(/\./g, "").replace(",", ".");
    return parseFloat(valorLimpo);
}

// --- CONTROLE DE FLUXO ---
function avancarParaEtapa2() {
    var valorNumerico = lerValorDigitado();
    var moedaOrigem = document.getElementById("moedaOrigem").value;

    if (isNaN(valorNumerico)) {
        return alert("Erro: Por favor, digite um valor antes de continuar!");
    } else if (valorNumerico <= 0) {
        return alert("Erro: O valor a ser convertido deve ser maior que zero!");
    }
    
    if (cotacaoDolar === 0) {
        return alert("Aguarde um segundo para as cotações carregarem...");
    }

    let valorFormatado = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: moedaOrigem 
    }).format(valorNumerico);

    document.getElementById("resumoOperacao").innerHTML = `Valor a converter: <strong>${valorFormatado}</strong>`;

    document.getElementById("labelCheckBRL").style.display = "flex";
    document.getElementById("labelCheckUSD").style.display = "flex";
    document.getElementById("labelCheckEUR").style.display = "flex";
    document.getElementById("labelCheckGBP").style.display = "flex";
    document.getElementById("labelCheckJPY").style.display = "flex";
    document.getElementById("labelCheckCNY").style.display = "flex";

    document.getElementById("labelCheck" + moedaOrigem).style.display = "none";
    document.getElementById("check" + moedaOrigem).checked = false;

    document.getElementById("etapa1").style.display = "none";
    document.getElementById("etapa2").style.display = "block";
    document.getElementById("areaResultados").innerHTML = "";
}

function voltarEtapa1() {
    document.getElementById("etapa2").style.display = "none";
    document.getElementById("etapa1").style.display = "block";
    document.getElementById("areaResultados").innerHTML = "";
}

// --- LÓGICA MATEMÁTICA MULTIMOEDAS ---
function calcularEExibir() {
    var valorOriginal = lerValorDigitado();
    var moedaOrigem = document.getElementById("moedaOrigem").value;
    var areaResultados = document.getElementById("areaResultados");
    
    areaResultados.innerHTML = "";

    var checkBRL = document.getElementById("checkBRL").checked;
    var checkUSD = document.getElementById("checkUSD").checked;
    var checkEUR = document.getElementById("checkEUR").checked;
    var checkGBP = document.getElementById("checkGBP").checked;
    var checkJPY = document.getElementById("checkJPY").checked;
    var checkCNY = document.getElementById("checkCNY").checked;

    if (!checkBRL && !checkUSD && !checkEUR && !checkGBP && !checkJPY && !checkCNY) {
        return alert("Selecione pelo menos uma moeda de destino para ver o resultado!");
    }

    var valorEmReais = 0;
    
    if (moedaOrigem === "BRL") valorEmReais = valorOriginal;
    else if (moedaOrigem === "USD") valorEmReais = valorOriginal * cotacaoDolar;
    else if (moedaOrigem === "EUR") valorEmReais = valorOriginal * cotacaoEuro;
    else if (moedaOrigem === "GBP") valorEmReais = valorOriginal * cotacaoLibra;
    else if (moedaOrigem === "JPY") valorEmReais = valorOriginal * cotacaoIene;
    else if (moedaOrigem === "CNY") valorEmReais = valorOriginal * cotacaoYuan;

    function criarLinhaResultado(texto) {
        var h2 = document.createElement("h2");
        h2.innerHTML = texto;
        areaResultados.appendChild(h2);
    }

    const formatarMoedaFinal = (valor, siglaMoeda) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: siglaMoeda }).format(valor);
    };

    if (checkBRL) {
        criarLinhaResultado("🇧🇷 Real: " + formatarMoedaFinal(valorEmReais, 'BRL'));
    }
    if (checkUSD) {
        let resUSD = valorEmReais / cotacaoDolar;
        criarLinhaResultado("🇺🇸 Dólar: " + formatarMoedaFinal(resUSD, 'USD'));
    }
    if (checkEUR) {
        let resEUR = valorEmReais / cotacaoEuro;
        criarLinhaResultado("🇪🇺 Euro: " + formatarMoedaFinal(resEUR, 'EUR'));
    }
    if (checkGBP) {
        let resGBP = valorEmReais / cotacaoLibra;
        criarLinhaResultado("🇬🇧 Libra: " + formatarMoedaFinal(resGBP, 'GBP'));
    }
    if (checkJPY) {
        let resJPY = valorEmReais / cotacaoIene;
        criarLinhaResultado("🇯🇵 Iene: " + formatarMoedaFinal(resJPY, 'JPY'));
    }
    if (checkCNY) {
        let resCNY = valorEmReais / cotacaoYuan;
        criarLinhaResultado("🇨🇳 Yuan: " + formatarMoedaFinal(resCNY, 'CNY'));
    }
}