# MLocalize Website Rebuild

## Current State
Full single-page localization services website (App.tsx) with: Header, Hero, Services, Languages, Process, Testimonials, and Contact/Footer sections. Company name is "MLocalization".

## Requested Changes (Diff)

### Add
- SEO meta tags in index.html: title, description, og:title, og:description, og:type, canonical, structured data (JSON-LD for LocalBusiness)
- Chatbot widget: floating button (bottom-right), opens a chat panel with pre-scripted FAQ responses about services, languages, pricing, turnaround. Fully frontend/static — no backend needed.
- WhatsApp floating button: bottom-left corner linking to wa.me with a pre-filled message. Opens in new tab.
- Additional SEO services section (Website Localization, Interpretation, DTP) to enrich content
- Proper semantic HTML: use article, section, aside, h1/h2/h3 hierarchy correctly

### Modify
- Replace every instance of "MLocalization" → "MLocalize" throughout App.tsx and index.html
- Update email/contact details to reflect new brand name (hello@mlocalize.com)
- Page title and description to reflect MLocalize brand
- Testimonials to reference MLocalize

### Remove
- Nothing removed, only renamed

## Implementation Plan
1. Update index.html: title, meta description, og tags, JSON-LD structured data, canonical URL
2. Global rename MLocalization → MLocalize in App.tsx
3. Add WhatsApp floating button component (bottom-left, green, links to wa.me)
4. Add Chatbot widget component (bottom-right, opens slide-up panel with FAQ bot)
5. Validate and build
