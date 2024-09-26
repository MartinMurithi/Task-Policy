import express from "express";
import createClient from "../controllers/clientController";
import createPolicy from "../controllers/createPolicyController";
import submitClaim from "../controllers/submitClaimController";

const router = express.Router();

router.post("/insurance/api/new-client", createClient);
router.post("/insurance/api/new-policy", createPolicy);
router.post("/insurance/api/claim-policy", submitClaim);

export default router;