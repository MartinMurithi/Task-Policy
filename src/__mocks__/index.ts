import { Request, Response } from "express";

export const mockRequest = (body: any = {}): Request => ({
    body,
} as Request);

export const mockResponse = () : Response => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
};