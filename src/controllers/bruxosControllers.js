//aqui vai logica tratativa de erros e regras de negocio

//importa model
import { json } from 'express';
import * as bruxoModel from '../models/bruxoModel.js'

export const listarTodos = async(req, res) => {
    try {
        const bruxos = await bruxoModel.findAll();

        if(!bruxos || bruxos.length === 0) {
            res.status(404).json({
                total:bruxos.length,
                mensagem:"não há bruxos na lista",
                bruxos
            })
    }

        res.status(200).json({
            total:bruxos.length,
            mensagem:`lista de bruxos`,
            bruxos
        })

    } catch (error){
        res.status(500).json({
            erro:`erro interno de servidor`,
            detalhes:error.message,
            status:500
        })
    }
}

export const listarUm = async (req, res) => {
    try{
        const {id} = req.params;
        const bruxo = await bruxoModel.findByid(id);

        if(!bruxo){
            return res.status(404).json({
                erro: ' Bruxo não encontrado!',
                mensagem:'verifique se o id do bruxo existe',
                id: id,
            })
        }
        res.status(200).json({
            mensagem: 'Bruxo encontrado',
            bruxo
        })

    } catch (error){
        res.status(500).json({
            erro: 'Erro ao buscar bruxo por id',
            detalhes: error.message
        })
    }
}
export const criarBruxo = async (req, res) => {
    try {
        const { nome, casa, patrono, varinha, anoMatricula } = req.body;

        const dado = req.body;

        const camposObrigatorios = ['nome', 'casa', 'varinha', 'anoMatricula'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(casa)) {
            return res.status(400).json({
                erro: `Casa inválida.`,
                casasValidas
            })
        }

        const novoBruxo = await bruxoModel.create(dado);

    res.status(201).json({
        mensagem: 'Novo bruxo criado com sucesso.',
        bruxo: novoBruxo
    })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar novo bruxo.',
            detalhes: error.message
        })
    }
}

export const apagar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const bruxoExiste = await bruxoModel.findById(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado.',
                mensagem: "Verifique se o ID do bruxo existe.",
                id: id,
            })
        }

        await bruxoModel.deleteBruxo(id);

        res.status(200).json({
            mensagem: "Bruxo apagado com sucesso.",
            bruxoRemovido: bruxoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar o bruxo.',
            detalhes: error.message
        })
    }
}

export const atualizar = async (req, res) => {
    try {

        const id = parseInt(req.params.id);
        const dados = req.body;

        const bruxoExiste = await bruxoModel.findById(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado.',
                mensagem: "Verifique se o ID do bruxo existe.",
                id: id,
            })
        }

        if (dados.casa) {
            const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
            if (!casasValidas.includes(dados)) {
                return res.status(400).json({
                    erro: `Casa inválida.`,
                    casasValidas
            })
        }
    }

        const bruxoAtualizado = await bruxoModel.updateBruxo(id, dados);

        res.status(200).json({
            mensagem: 'Bruxo atualizado com sucesso.',
            bruxo: bruxoAtualizado
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar o bruxo.',
            detalhes: error.message
        })
        
    }
}