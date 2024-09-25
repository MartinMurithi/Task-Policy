import express from "express";
import createClient from "../controllers/clientController";

const router = express.Router();

router.post("/insurance/api/new-client", createClient);

export default router;