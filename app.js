let titulo = 'h1';
let paragrafo = 'p';
let numeroFinal = 50;
let tentativas = 0;
let valoresSorteados = [];
let numerovalido = false;

alterarTexto(titulo, 'Jogo do número secreto');
alterarTexto(paragrafo, `Escolha um número entre 1 e ${numeroFinal}`);

let numeroSecreto = gerarNumeroAleatorio(numeroFinal);
let btnChutar = document.getElementById('chutar');
let btnNovoJogo = document.getElementById('reiniciar');
let inputChute = document.querySelector('input');
btnNovoJogo.hidden = true;

console.log(`numero secreto: ${numeroSecreto}`);
console.log(valoresSorteados);

function verificarChute() {
    let valorChute = parseInt(inputChute.value);
    tentativas++;
    if (isNaN(valorChute) || valorChute > numeroFinal || valorChute < 1) {
        alterarTexto(paragrafo, `Você deve informar um numero entre 1 e ${numeroFinal}`);
    } else if (numeroSecreto == valorChute) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        alterarTexto(titulo, `Você acertou com ${tentativas} ${palavraTentativa}!`);
        alterarTexto(paragrafo, `O número secreto era ${numeroSecreto}!`);
        btnChutar.hidden = true;
        inputChute.hidden = true;
        btnNovoJogo.hidden = false;
        btnNovoJogo.disabled = false;
        inputChute.value = '';
    } else {
        alterarTexto(titulo, 'Voce errou!');
        let maiorMenor = valorChute > numeroSecreto ? 'menor' : 'maior';
        alterarTexto(paragrafo, `O número secreto é ${maiorMenor} que o número ${valorChute}`);
        inputChute.value = '';
    }
}

function reiniciarJogo() {
    alterarTexto(titulo, 'Jogo do número secreto');
    alterarTexto(paragrafo, `Escolha um número entre 1 e ${numeroFinal}`);
    btnChutar.hidden = false;
    inputChute.hidden = false;
    inputChute.value = '';
    btnNovoJogo.disabled = true;
    btnNovoJogo.hidden = true;
    numeroSecreto = gerarNumeroAleatorio(numeroFinal);
    console.log(`numero secreto: ${numeroSecreto}`);
    tentativas = 0;
    console.log(valoresSorteados);
}

function alterarTexto(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function gerarNumeroAleatorio(numeroFinal) {
    let numeroSorteado = parseInt(Math.random() * numeroFinal) + 1;
    if (valoresSorteados.length == numeroFinal) {
        valoresSorteados = [];
    }
    if (valoresSorteados.length != 0) {
        let cont = 0
        while (cont < valoresSorteados.length) {
            if (valoresSorteados[cont] == numeroSorteado) {
                numeroSorteado = parseInt(Math.random() * (numeroFinal - 1)) + 1;
                cont = 0;
            } else {
                cont++;
            }
        }
        valoresSorteados.push(numeroSorteado);    
    } else {
        valoresSorteados.push(numeroSorteado);
    }
    return numeroSorteado;
}