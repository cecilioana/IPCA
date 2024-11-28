import express from 'express';
import { buscarIPCA, buscarAno, buscarId, calcularIPCA, validarParametros } from './servico/servico.js';

const app = express();

app.get('/historicoIPCA', (req,res)  => {
    const ano = req.query.ano;
    const resultado = ano ? buscarAno(ano) : buscarIPCA();
    if (resultado.length > 0) {
        res.json(resultado);
    }
    else{
        res.status(404).send({"erro":"Nenhum histórico encontrado para esse ano"})
    }
})

app.get('/historicoIPCA/calculo', (req, res) => {
    const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;

    const valorInicial = parseFloat(valor);
    const mesInicialInt = parseInt(mesInicial);
    const anoInicialInt = parseInt(anoInicial);
    const mesFinalInt = parseInt(mesFinal);
    const anoFinalInt = parseInt(anoFinal);

    if (anoInicialInt > anoFinalInt) {
        return res.status(400).send({"erro": "Dados inválidos"});
    }

    if (validaParametros(valorInicial,  mesInicialInt, anoInicialInt, mesFinalInt, anoFinalInt) === false) {
        return res.status(400).send({"erro": "D inválidos"});
    } 
    else {
        const resultado = calcularIPCA(valorInicial, mesInicialInt, anoInicialInt, mesFinalInt, anoFinalInt);

        if (!isNaN(resultado)) {
            res.json({ "resultado": resultado.toFixed(2) });
        }
    }
});

app.get('/historicoIPCA/:idIpca', (req,res) => {
    const id = buscarId(req.params.idIpca);

    if(id) {
        res.json(id);
    } else {
        res.status(404).send({"erro":"ID não encontrado"})
    }
})

app.listen (8080, () => {
    console.log('Servidor iniciado na porta 8080')
})