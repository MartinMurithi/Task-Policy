import express from "express";
import createClient from "../controllers/clientController";
import createPolicy from "../controllers/createPolicyController";

const router = express.Router();

router.post("/insurance/api/new-client", createClient);
router.post("/insurance/api/new-policy", createPolicy);

export default router;