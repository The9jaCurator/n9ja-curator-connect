import { describe, expect, it } from "vitest";
import { CONTACT_RECIPIENT, contactSchema } from "@/lib/contact-schema";

const validContact = {
  name: "Ada Okafor",
  company: "Ada Living",
  email: "ada@example.com",
  category: "Skincare Products",
  message: "We would like to discuss a launch campaign for our new serum.",
};

describe("collaboration brief rules", () => {
  it("always targets the approved team inbox", () => {
    expect(CONTACT_RECIPIENT).toBe("myrdpa@gmail.com");
  });

  it("accepts a complete brief", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it.each(["name", "company", "email", "category", "message"] as const)(
    "rejects an invalid %s",
    (field) => {
      expect(contactSchema.safeParse({ ...validContact, [field]: "" }).success).toBe(false);
    },
  );
});
