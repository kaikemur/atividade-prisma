import express from "express";
import { getALLBruxos } from "../controllers/bruxoscontroller.js";

const router = express.Router();

router.get("/",getALLBruxos);

export default router;