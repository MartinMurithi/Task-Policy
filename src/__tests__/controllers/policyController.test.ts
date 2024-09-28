import { mockRequest, mockResponse } from "../../__mocks__/index";

import policyModel from "../../models/policyModel";

import createPolicy from "../../controllers/createPolicyController";
import getPolicies from "../../controllers/getPolicies";


// mock the policy model
jest.mock("../../models/policyModel");

describe("Policy API", () => {
   
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should create a new insurance policy", async () => {
        
        const mockPolicy = {
            clientId: "66f698b06c2280668cf91b98",
            policyType: "health",
            startDate: "2024/08/21",
            endDate: "2026/08/21",
            premiumAmount: 30000,
            coverageAmount: 60000
        };

        // mock the save method of the policy model
        const mockSave = jest.fn().mockResolvedValue(mockPolicy);

        // mock the policy model constructor to create a new of policy in the db
        (policyModel as unknown as jest.Mock).mockImplementation(() => ({
            save : mockSave
        }));

        const req = mockRequest({
            clientId: "66f698b06c2280668cf91b98",
            policyType: "health",
            startDate: "2024/08/21",
            endDate: "2026/08/21",
            premiumAmount: 30000,
            coverageAmount: 60000
        });

        const res = mockResponse();

        await createPolicy(req, res);

        // assertions
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            message: "New policy created successfully.",
            policy: mockPolicy
        });

    });

    it("It should return an array of insurance policies", async () => {
        const mockPoliciesArray = [
            {
                "policyId": "66f697c16c2280668cf91b8c",
                "clientId": "66f697706c2280668cf91b8a",
                "policyNumber": "0360e4bd-7e7a-485a-a1f6-fa75b65c2094",
                "policyType": "health",
                "startDate": "2020-11-22T00:00:00.000Z",
                "endDate": "2030-11-22T00:00:00.000Z",
                "premiumAmount": 8000,
                "coverageAmount": 32000,
                "status": "active"
            },
            {
                "policyId": "66f697ff6c2280668cf91b8f",
                "clientId": "66f697706c2280668cf91b8a",
                "policyNumber": "8684a669-d161-4c45-8faa-0c300180fe37",
                "policyType": "auto",
                "startDate": "2021-08-20T00:00:00.000Z",
                "endDate": "2030-08-20T00:00:00.000Z",
                "premiumAmount": 70000,
                "coverageAmount": 210000,
                "status": "active"
            },
            {
                "policyId": "66f698636c2280668cf91b92",
                "clientId": "66f583ead1439e8918904755",
                "policyNumber": "36ac9237-40c5-4156-b634-b2075d58eb26",
                "policyType": "life",
                "startDate": "2009-08-20T00:00:00.000Z",
                "endDate": "2029-08-20T00:00:00.000Z",
                "premiumAmount": 90000,
                "coverageAmount": 900000,
                "status": "active"
            },
            {
                "policyId": "66f6ae16d1dd75ba859e313e",
                "clientId": "66f583ead1439e8918904755",
                "policyNumber": "5a19daed-43aa-4143-b5f2-f1aae6fe3411",
                "policyType": "life",
                "startDate": "2009-08-20T00:00:00.000Z",
                "endDate": "2029-08-20T00:00:00.000Z",
                "premiumAmount": 90000,
                "coverageAmount": 900000,
                "status": "active"
            }
        ];

        // Mock the find method of the clientModel
        (policyModel.find as any as jest.Mock).mockResolvedValue(mockPoliciesArray);
        
        const req = mockRequest();
        const res = mockResponse();

        await getPolicies(req, res);

        // assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            Policies: mockPoliciesArray
        });
    });

});
