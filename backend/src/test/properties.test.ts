import { Request, Response } from "express";
import { property, status, status_history } from "../models/init-models";
import { get } from "../controllers/properties.controller"; 
import * as jest from "jest";

describe("get", () => {
  it("should return all properties", async () => {
    // Mock request and response objects
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the data that the function expects
    jest.spyOn(property, "findAll").mockResolvedValue([
      {
        address: "123 Main St",
        city: "Anytown",
        price: 100000,
        description: "A nice house",
        status_history: [
          {
            status: {
              id: 1,
              name: "Available",
              label: "For Sale",
            },
          },
        ],
      },
    ]);

    // Call the function
    await get(req, res);

    // Verify that the function returns the expected data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Se obtuvieron las propiedades",
      data: [
        {
          address: "123 Main St",
          city: "Anytown",
          price: 100000,
          description: "A nice house",
        },
      ],
    });
  });

  it("should return an empty array if no properties match the filters", async () => {
    // Mock request and response objects
    const req = {
      query: {
        address: "456 Oak St",
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the data that the function expects
    jest.spyOn(property, "findAll").mockResolvedValue([]);

    // Call the function
    await get(req, res);

    // Verify that the function returns the expected data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Se obtuvieron las propiedades",
      data: [],
    });
  });

  it("should handle errors", async () => {
    // Mock request and response objects
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Mock the function to throw an error
    jest.spyOn(property, "findAll").mockRejectedValue(new Error("Some error"));

    // Call the function
    await get(req, res);

    // Verify that the function returns the expected data
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Some error",
      data: [],
    });
  });
});
