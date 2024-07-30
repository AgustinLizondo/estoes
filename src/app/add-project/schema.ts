import { z } from "zod";

export const addProjectSchema = z.object({
  projectName: z.string().min(1, { message: "This field is required" }),
  description: z.string().min(1, { message: "This field is required"}),
  projectManager: z.string().min(1, { message: "This field is required"}),
  assignedTo: z.string().min(1, { message: "This field is required"}),
  status: z.string().min(1, { message: "This field is required"}),
});
