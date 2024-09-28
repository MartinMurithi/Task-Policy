import { mockRequest, mockResponse } from "../../__mocks__/index";

import submitClaim from "../../controllers/submitClaimController";
import submitClaimModel from "../../models/submitClaimModel";

// mock the submit claim model
jest.mock("../../models/submitClaimModel");

describe("Submit Policy API", () => {
   
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should submit a claim for an insurance policy", async () => {
        
        const mockSubmitClaim = {
            "policyNumber" : "0360e4bd-7e7a-485a-a1f6-fa75b65c2094",
            "claimAmount" : 14000,
            "description" : "Claim submitted for health insurance"
        };

        // mock the save method of the submitClaimModel
        const mockSave = jest.fn().mockResolvedValue(mockSubmitClaim);

        // mock the policy model constructor to create a new of policy in the db
        (submitClaimModel as unknown as jest.Mock).mockImplementation(() => ({
            save : mockSave
        }));

        const req = mockRequest({
            "policyNumber" : "0360e4bd-7e7a-485a-a1f6-fa75b65c2094",
            "claimAmount" : 14000,
            "description" : "Claim submitted for health insurance"
        });

        const res = mockResponse();

        await submitClaim(req, res);

        // assertions
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            message: "Claim submitted successfully.",
            claim: mockSubmitClaim
        });

    }, 100000);

});