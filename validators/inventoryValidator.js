import { z } from "zod";

export const createInventorySchema = z.object({
  inventoryType: z.enum(["in", "out"], {
    required_error: "Inventory type is required",
  }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Blood group is required",
  }),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1"),
  email: z.string().email("Invalid email address"),
});
