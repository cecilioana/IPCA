import historicoInflacao from '../dados/dados.js'

export const buscarIPCA = () => {
    return historicoInflacao
}

export const buscarIpcaPorAno = (ano) => {
    return historicoInflacao.filter(u => u.ano.toString().includes(ano.toString()))
}

export const buscarId = (id) => {
    const id = parseInt(id);
    return historicoInflacao.find(u => u.id === id)
}

export const calculoIPCA = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    let dados = historicoInflacao.filter(item => 
        (item.ano > anoInicial || (item.ano === anoInicial && item.mes >= mesInicial)) &&
        (item.ano < anoFinal || (item.ano === anoFinal && item.mes <= mesFinal))
    );

    if (dados.length === 0) {
        return null;
    }

    let resultado = valor;
    for (let i = 0; i < dadosIpca.length; i++) {
        const ipca = dadosIpca[i].ipca;
        resultado *= (1 + (ipca / 100));
    }

    return resultado;
}

export const validarParametros = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    if (Number.isNaN(valor) || Number.isNaN(mesInicial) || Number.isNaN(anoInicial) || Number.isNaN(mesFinal) || Number.isNaN(anoFinal)) {
        return false;
    }

    if (anoInicial < 2015 || anoInicial > 2023 || anoFinal < 2015 || anoFinal > 2023) {
        return false;
    }

    if (mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12) {
        return false;
    }

    if ((anoInicial === 2023 && mesInicial > 5 || mesInicial < 0) || (anoFinal === 2023 && mesFinal > 5 || mesFinal < 0)) {
        return false;
    }

    return true;
};