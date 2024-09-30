### Instructions for Testing the Insurance System API

#### 1. **Clone the Project from GitHub**
   - Open your terminal or command prompt.
   - Run the following command to clone the project repository to your local machine:
            git clonehttps://github.com/MartinMurithi/Task-Policy.git
     
   - Navigate into the project directory:
        cd insurance-system

#### 2. **Install Dependencies**
   - Before running the project, ensure all required dependencies are installed. Run:
         npm install

#### 3. **Set Up MongoDB Connection**
   - Ensure you have MongoDB installed locally, or have access to a remote MongoDB instance.
   - In the root of the project, create a `.env` file .
   - Add the following MongoDB URI to the `.env` file:

#### 4. **Run the Project**
   - To start the project, run:
     npm start
   - This will start the Node.js server, and the API will be available locally on the specified port (e.g., `http://localhost:8080`).

---

### **Testing the API Endpoints**

#### 5. **Create a Client**
   - **Endpoint**: `POST /insurance/api/new-client`
   - Use this endpoint to create a new client in the system.
   - Once the client is created, copy the `clientId` (_id) from the response, as it will be needed in the following steps.

#### 6. **Fetch Clients**
   - **Endpoint**: `GET /insurance/api/clients`
   - Use this endpoint to fetch all clients in the system.

#### 7. **Create a Policy**
   - **Endpoint**: `POST /insurance/api/new-policy`
   - Use this endpoint to create a new insurance policy.
   - Include the copied `clientId` (_id) in the request body.
   - Once the policy is created, the response will contain the `policyNumber`. Copy this for the next step.

#### 8. **Fetch Policies**
   - **Endpoint**: `GET /insurance/api/policies`
   - Use this endpoint to view all the policies.

#### 9. **Submit a Claim**
   - **Endpoint**: `POST /insurance/api/submit-claim-policy`
   - Use this endpoint to submit a claim for the policy.
   - Include the `policyNumber` from the previous step in the request body.

#### 10. **Fetch Submitted Claims**
   - **Endpoint**: `GET /insurance/api/submitted-claims`
   - Use this endpoint to fetch all claims with a "submitted" status.
   - Copy the `_id` of the claim you want to process. You will need this for the next step.

#### 11. **Process a Claim**
   - **Endpoint**: `PATCH /insurance/api/process-policy-claim/:claimId`
   - Use this endpoint to process a submitted claim.
   - Copy the `_id` of the specific claim you want to process from the list of **Submitted Claims**.
   - **Important**: Paste the copied `_id` into the controllers folder in the `processClaimController` file, inside the variable `claimId`, before sending the request.
   - Additionally, ensure the `claimId` in the URL matches the `_id` retrieved from the list of submitted claims you want to process.

### **Final Notes**
Here's the updated instruction:

- **Testing the APIs**: All API endpoints are accessible through Postman .[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/24639175-10d4af9e-3015-4ac0-b80b-5fa87eef4a1a?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24639175-10d4af9e-3015-4ac0-b80b-5fa87eef4a1a%26entityType%3Dcollection%26workspaceId%3D264c52e3-c381-4a65-8315-2e90789b69a5)

