import { z } from "zod";

export const CONTACT_RECIPIENT = "the9jacurator@gmail.com";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your brand or company name.")
    .max(160, "Brand name must be 160 characters or fewer."),
  category: z.enum(
    [
      "Gadgets & Tech Accessories",
      "Skincare Products",
      "Fashion Accessories",
      "Multi-category / Other",
    ],
    { message: "Please select a product category." },
  ),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters about the collaboration.")
    .max(5000, "Message must be 5,000 characters or fewer."),
  packageName: z.string().trim().max(120).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
