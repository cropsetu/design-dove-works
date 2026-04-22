
# Star Security & Bouncer — Full Marketing Site + Admin

A premium, SEO-optimized marketing website for Pune-based Star Security & Bouncer, with a built-in admin panel for managing leads, event photos, and videos. Inspired by globesecurity.co.in but more modern (navy + gold, Playfair + Inter, smooth scroll reveals).

## Brand & Design System
- **Palette**: brand-dark `#0B1F3A`, brand-gold `#C9A14A`, brand-cream `#F7F7F5`, brand-gray `#4A4A4A`, alert red, WhatsApp green
- **Type**: Playfair Display (headings), Inter (body), Space Grotesk (numbers)
- **Feel**: Generous whitespace, subtle scroll-triggered reveals, sticky header, gold CTA buttons, dark navy hero with overlay

## Public Site Structure

**Global**
- Top utility strip: "Police Permitted | ISO Certified | 18+ Years" + phone, WhatsApp, email, Quote CTA
- Sticky header: logo, nav (Home, About, Services dropdown, Training, Clients, Gallery, Contact), gold "Get a Quote"
- Footer: address, contact, quick links, 19 services, Pune locality SEO links, social
- Floating WhatsApp + Call buttons on mobile
- "Request a Quote" modal triggerable from any CTA (Name, Phone, Email, City, Service, Duration, Personnel, Message → saves to DB)

**Pages**
1. **Home** — Hero ("It's time to upgrade your security — SWITCH TO STAR"), trust strip, About preview, Services grid (19 services), Stats counter (18+ Years, 500+ Clients, 24/7, ISO), Many Concerns / One Solution, Industries (8 tiles), Why Choose Us, Awards timeline, Testimonials carousel, Client logos, Gallery teaser, Final CTA
2. **About** — Story, founder Late Anil Kamble, MD Sonali Kamble, Vision/Mission/Values, certifications, awards
3. **Services overview** — All 19 services as cards
4. **19 Service detail pages** — Hero, what's included, who it's for, process, FAQ, CTA (Manned Guarding, Bouncer/Bodyguard, Event, Corporate, Industrial, Residential/Society, Personal/VVIP, Mall/Retail, Warehouse, Bank/ATM, Hospital, Education, Hotel/Restaurant, Banking Institutional, Secure Transit, Real Estate, Women Safety Transport, VVIP, +1)
5. **Training** — Training programs, certifications
6. **Clients** — Logo wall + case mentions
7. **Gallery** — Event albums (placeholder security imagery initially) + YouTube videos section
8. **Contact** — Form, full address, phones, map, hours
9. **60+ Pune locality SEO pages** — auto-generated from a template (`/security-services-in-[locality]`) for Kothrud, Hinjewadi, Baner, Wakad, Aundh, Hadapsar, etc.
10. **8+ service × city combo pages** — e.g. `/bouncer-services-in-pune`, `/event-security-in-pune`
11. **Privacy / Terms** pages

## Admin Panel (`/admin`, email/password login via Lovable Cloud)
- **Login** — single super-admin
- **Dashboard** — stat tiles (leads this month, new leads, albums, photos, videos) + recent 5 leads
- **Leads** — table with Date/Name/Phone/Email/City/Service/Status, filters, status update (New/Contacted/Converted/Lost), CSV export, detail view
- **Events & Photos** — create albums, upload/caption/reorder/delete photos (Lovable Cloud Storage)
- **Videos** — paste YouTube URL, auto-fetch thumbnail, reorder, delete
- **Testimonials & Clients** — add/edit/delete (logos uploaded)
- **Site Settings** — phones, emails, hero headline, WhatsApp number, social links, maintenance toggle

## Backend (Lovable Cloud)
- Tables: `leads`, `events`, `event_photos`, `videos`, `testimonials`, `clients`, `site_settings`, `user_roles`
- Storage bucket: `event-photos` (public read)
- RLS: public can INSERT into `leads`; public SELECT on published content; only `admin` role (via `user_roles` table + `has_role()` security definer) can manage
- Email notification to admin on new lead (via Lovable transactional email)

## SEO & Performance
- `react-helmet-async` per-page meta + Open Graph
- LocalBusiness + Service + FAQ JSON-LD schema
- Auto-generated `sitemap.xml` and `robots.txt` including all locality + service pages
- WebP images, lazy loading, route-based code splitting, font preload
- Target: Lighthouse Perf 90+, SEO 100, A11y 95+

## Build Approach
Single end-to-end build covering everything above. After delivery, expect a few rounds of polish on copy, imagery, and any service pages that need deeper content.

## Setup You'll Need to Do After Build
- Create your admin user in Lovable Cloud → Users
- Replace placeholder gallery images via /admin
- Connect a custom domain when ready
