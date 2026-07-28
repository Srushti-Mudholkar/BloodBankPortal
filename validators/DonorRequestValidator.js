import { z } from "zod";

export const createDonorRequestSchema = z.object({
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood group is required",
  }),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .min(1, "Minimum 1 unit required"),
  targetDonor: z.string({ required_error: "Target donor is required" }),
  message: z.string().optional(),
});

export const respondDonorRequestSchema = z.object({
  status: z.enum(["accepted", "rejected"], {
    required_error: "Status is required",
  }),
  responseMessage: z.string().optional(),
});
