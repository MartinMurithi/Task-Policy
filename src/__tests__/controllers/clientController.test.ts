import { mockRequest, mockResponse } from "../../__mocks__/index";
import { createClient, getClients } from "../../controllers/clientController";
import clientModel from "../../models/clientModel";

// mock the client model
jest.mock("../../models/clientModel");

describe("Client API", () => {

    afterEach(() => {
        jest.clearAllMocks(); // Reset mocks after each test
    });

    it("It should create a client", async () => {
        const mockClient = {
            name: "Elon Musk",
            email: "musk@gmail.com",
            dateOfBirth: "1972/09/12",
            address: "South Africa"
        };
        
        // Mock the save method of the clientModel, mimics the actual behaviour of save()
        const mockSave = jest.fn().mockResolvedValue(mockClient);
        
        // Mock the clientModel constructor to return an object with a save method, i.e, creating a new instance in the db
        (clientModel as unknown as jest.Mock).mockImplementation(() => ({
            save: mockSave
        }));

        const req = mockRequest({
            clientId: "mockClientId123",
            name: "Elon Musk",
            email: "musk@gmail.com",
            dateOfBirth: "1972/09/12",
            address: "South Africa"
        });
        
        const res = mockResponse();

        await createClient(req, res);

        // assertions
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            message: "Client created successfully.",
            Client: mockClient
        });
    });

    it("It should return an array of clients", async () => {
        const mockClientsArray = [
            {
                clientId: "client1",
                name: "Elon Musk",
                email: "musk@gmail.com",
                dateOfBirth: "1972/09/12",
                address: "South Africa",
            },
            {
                clientId: "client2",
                name: "Jeff Bezos",
                email: "bezos@gmail.com",
                dateOfBirth: "1964/01/12",
                address: "USA",
            }
        ];

        // Mock the find method of the clientModel
        (clientModel.find as any as jest.Mock).mockResolvedValue(mockClientsArray);
        
        const req = mockRequest();
        const res = mockResponse();

        await getClients(req, res);

        // assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            clients: mockClientsArray
        });
    });


});