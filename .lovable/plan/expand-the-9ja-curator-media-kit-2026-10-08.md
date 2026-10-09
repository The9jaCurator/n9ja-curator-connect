# Expand The 9ja Curator media kit

## Outcome

Add a genuine email-delivered collaboration form, prominent social access points, a dedicated filterable Curation Gallery, and a stronger trust signal while preserving the existing emerald-and-gold brand experience.

## Homepage and navigation

- Add a restrained trust badge reading “Trusted Partner for Global Brands Entering the Nigerian Consumer Market.” near the opening experience.
- Add a Curation Gallery link to desktop and mobile navigation.
- Add compact TikTok, Instagram, Telegram, X, and WhatsApp/email icon positions in the header and footer.
- Until the real profile details are supplied, keep those social positions visibly marked as pending rather than linking visitors to invented or incorrect accounts. The links will be driven by one shared profile list so the real URLs can be added in one place later.

## Collaboration form and email delivery

- Replace the simulated local-only submission with a real server-side email action addressed to **myrdpa@gmail.com**.
- Validate name, brand, email, category, and message in both the page and the server action, with clear field-level feedback, length limits, disabled/loading behavior, and a recoverable error state.
- Send one branded collaboration-brief email per valid submission; the browser will never choose the recipient or email template.
- Show the requested confirmation only after the email service accepts the submission: “Thank you! The 9ja Curator team has received your brief. We will respond within 24 hours.”
- Preserve entered details after delivery errors so a brand can retry without retyping.

## New Curation Gallery page

- Create a dedicated `/gallery` page with its own title and sharing metadata.
- Generate a cohesive set of polished sample visuals across Gadgets, Skincare, and Fashion, presented clearly as sample styling concepts rather than completed client campaigns.
- Add accessible All, Gadgets, Skincare, and Fashion filter tabs with responsive image grids and concise example captions covering product styling, unboxing, benefit-led reviews, and lifestyle placement.
- Reuse the site’s brand header/footer patterns and provide direct paths back to partnership packages and the collaboration form.

## Quality and verification

- Keep imagery optimized and lazy-loaded below the initial view.
- Verify homepage and gallery layouts at desktop and mobile sizes, keyboard/filter behavior, form validation, successful and failed submission states, navigation, and horizontal overflow.
- Add focused tests for server validation and the fixed delivery recipient, then confirm the preview builds without errors.

## Required setup

Real email delivery needs a sender domain owned by you. No email domain is currently configured. The page and email flow can be built now, but sends will begin only after the domain is added and verified in Lovable’s email settings.

Social profile URLs remain an explicit follow-up: the UI positions will be ready, but no fake external links will be published.

## Technical details

- Use a TanStack server function and a fixed branded app-email template; user content is escaped and validated with Zod.
- Keep the contact recipient server-controlled and use an idempotency key to prevent duplicate delivery on retries.
- Add the gallery as a proper TanStack route and keep all colors, spacing, shadows, and interaction states in existing semantic design tokens and shared variants.
