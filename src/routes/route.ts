import express from "express";
import {createClient, getClients} from "../controllers/clientController";
import createPolicy from "../controllers/createPolicyController";
import submitClaim from "../controllers/submitClaimController";
import processClaim from "../controllers/processClaimController";
import getPolicies from "../controllers/getPolicies";
import fetchSubmittedClaims from "../controllers/getSubmittedClaims";
import retrieveClientClaims from "../controllers/clientClaims";

const router = express.Router();

router.post("/insurance/api/new-client", createClient);
router.post("/insurance/api/new-policy", createPolicy);
router.post("/insurance/api/submit-claim-policy", submitClaim);
router.patch("/insurance/api/process-policy-claim/:claimId", processClaim);

router.get("/insurance/api/clients", getClients);
router.get("/insurance/api/policies", getPolicies);
router.get("/insurance/api/submitted-claims", fetchSubmittedClaims);

export default router;