import dados from "../models/dados.js";
const { bruxos } = dados;

const getALLBruxos = (req,res) => {
    const resultado = bruxos;

    res.status(200).json({
        total:bruxos.length,
        bruxos:resultado
    })
}

export {getALLBruxos};