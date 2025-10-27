import { Router } from "express";
import * as BruxosController from './../controllers/bruxosControllers.js'

const router = Router();

//rota getall em /
router.get("/", BruxosController.listarTodos);
//rota getbyid em /
router.get("/:id", BruxosController.listarUm);

router.post("/",BruxosController.criarBruxo)

router.delete("/:id",BruxosController.apagar)

router.put("/:id",BruxosController.atualizar)
export default router