# Graph Report - Hindustan Yathra  (2026-11-01)

## Corpus Check
- Corpus is ~37,712 words - fits in a single context window. You may not need a graph.

## Summary
- 720 nodes · 1289 edges · 98 communities (38 shown, 60 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Tour Parsing and Routes
- Lead Administration Pages
- Localization and Destinations
- Backend Authentication Flow
- Project Guidance and Architecture
- Admin Session and Auth Routes
- Flask App Configuration
- MySQL Compose Services
- TypeScript Compiler Settings
- Admin Tour Operations
- Frontend Auth API
- Frontend Package Configuration
- Localized Layout Components
- Backend Tour Catalog
- Frontend Runtime Dependencies
- Marketing and Dashboard Pages
- Landing Page and Social Feed
- Backend CI Workflow
- Social Media API
- Admin Tour Management
- Contact and Lead UI
- Destination and Tour APIs
- Backend Route Handlers
- Production Compose and Nginx
- Lead Capture and Search
- Tour Media Editing
- Gallery and Object Storage
- Navigation and Language Switching
- Locale Routing Middleware
- Excel Tour Import
- Social Links Administration
- Frontend Build Scripts
- S3 Image Upload API
- Excel Upload Interface
- Authentication Domain Types
- In-Memory Cache Store
- Next.js Configuration
- Tailwind Design Tokens
- Social API Proxy
- Frontend Typography
- Tour Request Schema
- React Dependency Overrides
- Lead Validation API
- Booking Dashboard Mock
- CSS Autoprefixing
- Class Name Utilities
- JWT Runtime Library
- MySQL Client Driver
- PostCSS Configuration
- Three.js Scene Helpers
- React Three Fiber
- Analytics Chart Library
- TypeScript Toolchain
- OTP In-Memory Store
- Hindustan Yathra Brand Mark
- IRCTC Partner Mark
- ISO Certification Badge
- Karnataka Tourism Logo
- Varanasi Ghat Photograph
- Since 2018 Brand Banner
- Andaman Coastline Photograph
- Uluwatu Sunset Illustration
- Bali Honeymoon Illustration
- Kedarnath Dawn Illustration
- Badrinath Road Illustration
- Char Dham Route Illustration
- Travel App Icon
- Desktop Travel Hero Artwork
- Mobile Travel Hero Artwork
- Co-founder Portrait
- Earth Globe Map Texture
- Earth Relief Bump Texture JPG
- Earth Relief Bump Texture WebP
- Earth Cloud Layer Texture
- Earth Day Map Texture
- Earth Day Map PNG
- Earth Day Map WebP
- Equirectangular Earth Map
- Earth Specular Map
- Earth Cloud Map
- Founder Portrait
- Desktop Hero Composite
- Mobile Hero Composite
- Desktop Travel Illustration
- Mobile Travel Illustration
- Travel Promotion Banner

## God Nodes (most connected - your core abstractions)
1. `next` - 48 edges
2. `next-intl` - 43 edges
3. `Tour` - 28 edges
4. `lucide-react` - 26 edges
5. `react` - 25 edges
6. `Link` - 25 edges
7. `compilerOptions` - 19 edges
8. `getPathname` - 17 edges
9. `useAppStore` - 13 edges
10. `normalizeImageUrl()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Project Scope and Repository Guidance` --references--> `Next.js Travel Frontend Scaffold`  [EXTRACTED]
  .github/copilot-instructions.md → frontend/README.md
- `Cross-Cutting Security Cautions` --conceptually_related_to--> `Production Readiness Blockers`  [INFERRED]
  .github/copilot-instructions.md → HY -  Backend/docs/cloud-run-deployment.md
- `JSON Tour Data Source` --conceptually_related_to--> `Tour Management API`  [INFERRED]
  frontend/README.md → HY -  Backend/README.md
- `OTP and JWT Authentication` --conceptually_related_to--> `Authentication Endpoints`  [INFERRED]
  frontend/README.md → HY -  Backend/docs/api.md
- `Excel Tour Content Pipeline` --conceptually_related_to--> `Excel Upload Endpoint`  [INFERRED]
  frontend/README.md → HY -  Backend/docs/api.md

## Import Cycles
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/models/leads.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/excelparse.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/auth.py -> HY -  Backend/app/models/user.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/excel.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/slug_details.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/social_media.py -> HY -  Backend/app/models/social_media.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/destinations.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/leads.py -> HY -  Backend/app/services/leads.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/search.py -> HY -  Backend/app/services/search_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/excelparse.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/tour_admin_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/auth.py -> HY -  Backend/app/models/user.py -> HY -  Backend/app/models/base.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/tours.py -> HY -  Backend/app/services/tour_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/leads.py -> HY -  Backend/app/services/leads.py -> HY -  Backend/app/models/leads.py -> HY -  Backend/app/__init__.py`
- 5-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/tour_admin_service.py -> HY -  Backend/app/services/tour_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`

## Hyperedges (group relationships)
- **Travel Brand and Trust Marks** — frontend_public_images_hindustan_yathra_logo_hindustan_yathra_brand_mark, frontend_public_images_irctc_logo_irctc_mark, frontend_public_images_iso_certified_company_iso_badge, frontend_public_images_karnataka_state_tourism_logo_karnataka_tourism_mark, frontend_public_images_logo_since_2018_brand_tenure [EXTRACTED 1.00]
- **Destination and Tour Artwork** — frontend_public_images_kashi_varanasi_ghats, frontend_public_images_tours_andaman_andaman_hero_andaman_island_coast, frontend_public_images_tours_bali_1_ulu_watu_sunset_route, frontend_public_images_tours_bali_hero_bali_honeymoon_escape, frontend_public_images_tours_chardham_1_kedarnath_at_dawn, frontend_public_images_tours_chardham_2_badrinath_road, frontend_public_images_tours_chardham_hero_chardham_yatra_route [EXTRACTED 1.00]
- **3D Globe Texture Set** — frontend_public_textures_earth_clouds_earth_cloud_layer, frontend_public_textures_earth_day_new_earth_day_map_png, frontend_public_textures_earth_day_new_earth_day_map_webp, frontend_public_textures_earth_day_earth_day_map, frontend_public_textures_earth_1_earth_globe_map, frontend_public_textures_earth_bump_earth_relief_map_jpg, frontend_public_textures_earth_bump_earth_relief_map_webp, frontend_public_textures_earth_daymap_earth_day_map, frontend_public_textures_earth_specular_earth_specular_map, frontend_public_textures_earthcloudmap_earth_cloud_map_texture [INFERRED 0.85]
- **Responsive Travel Hero Art** — frontend_public_textures_background_mobile_mobile_hero_art, frontend_public_textures_background_desktop_hero_art, frontend_public_textures_hero_background_desktop_desktop_travel_composite, frontend_public_textures_hero_background_mobile_mobile_travel_composite, frontend_public_textures_hero_desktop_desktop_travel_illustration, frontend_public_textures_hero_mobile_mobile_travel_illustration, frontend_public_textures_hindustan_yatra_image_travel_promotion_banner [EXTRACTED 1.00]

## Communities (98 total, 60 thin omitted)

### Community 0 - "Tour Parsing and Routes"
Cohesion: 0.07
Nodes (40): buildTours(), main(), OUTPUT_PATH, parseOptionalPrice(), readSheet(), Row, splitList(), toBool() (+32 more)

### Community 1 - "Lead Administration Pages"
Cohesion: 0.07
Nodes (34): LeadStatusButton(), Props, AdminLeadsPage(), getLeads(), Lead, ProfilePage(), SavedToursPage(), CLOUD_GEOMETRY (+26 more)

### Community 2 - "Localization and Destinations"
Cohesion: 0.11
Nodes (27): jakarta, kannada, metadata, playfair, RootLayout(), DestinationsPage(), getTours(), Params (+19 more)

### Community 3 - "Backend Authentication Flow"
Cohesion: 0.12
Nodes (10): _get_phone(), login(), me(), refresh(), verify(), upload_excel(), create_token(), generate_csrf_token() (+2 more)

### Community 4 - "Project Guidance and Architecture"
Cohesion: 0.09
Nodes (22): Project Scope and Repository Guidance, Excel Tour Content Pipeline, Next.js Travel Frontend Scaffold, JSON Tour Data Source, English and Kannada Routing, OTP and JWT Authentication, React Three Fiber Hero, SEO and Accessibility Foundation (+14 more)

### Community 6 - "Flask App Configuration"
Cohesion: 0.11
Nodes (5): login(), logout(), create_app(), test_login_flow(), test_health_endpoint()

### Community 7 - "MySQL Compose Services"
Cohesion: 0.08
Nodes (23): environment, image, ports, volumes, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, MYSQL_USER (+15 more)

### Community 8 - "TypeScript Compiler Settings"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+13 more)

### Community 9 - "Admin Tour Operations"
Cohesion: 0.15
Nodes (8): get_leads(), get_tour(), list_tours(), update_handled_status(), update_status(), update_tour_media(), Lead, get_tours_admin()

### Community 10 - "Frontend Auth API"
Cohesion: 0.16
Nodes (10): zod@^3.23.8, bodySchema, GET(), bodySchema, bodySchema, AUTH_COOKIE, requireAdmin(), sessionCookieOptions (+2 more)

### Community 11 - "Frontend Package Configuration"
Cohesion: 0.15
Nodes (18): devDependencies, eslint@^8.57.0, eslint-config-next@15.5.19, tsx@^4.19.0, @types/jsonwebtoken@^9.0.6, @types/node@^22.5.4, @types/react@^18.3.5, @types/react-dom@^18.3.0 (+10 more)

### Community 12 - "Localized Layout Components"
Cohesion: 0.20
Nodes (10): DashboardLayout(), dynamic, LocaleLayout(), revalidate, FloatingDestinations(), FloatingContact(), Footer(), Link (+2 more)

### Community 13 - "Backend Tour Catalog"
Cohesion: 0.27
Nodes (13): categories(), featured_tours(), list_tours(), related_tours(), tour_by_slug(), tours_by_category(), get_categories(), get_featured_tours() (+5 more)

### Community 14 - "Frontend Runtime Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, framer-motion@^11.18.2, lucide-react@^0.436.0, next@15.5.19, next-intl@^4.13.2, react@18.3.1, react-dom@18.3.1, @tanstack/react-query@^5.101.2 (+9 more)

### Community 15 - "Marketing and Dashboard Pages"
Cohesion: 0.28
Nodes (7): AboutPage(), CTA(), GoogleReviewSummary(), Hero(), Leadership(), Story(), next-intl

### Community 16 - "Landing Page and Social Feed"
Cohesion: 0.22
Nodes (11): HomePage(), HeroSection, Props, SocialMediaFeed(), SocialMediaItem, StoryRail(), VideoCard(), copy (+3 more)

### Community 17 - "Backend CI Workflow"
Cohesion: 0.14
Nodes (13): jobs, test, name, on, pull_request, push, branches, run (+5 more)

### Community 18 - "Social Media API"
Cohesion: 0.26
Nodes (6): add_link(), delete_link(), get_links(), get_social_links(), update_link(), SocialMediaLink

### Community 19 - "Admin Tour Management"
Cohesion: 0.24
Nodes (8): AdminToursPage(), AddTourButton(), Props, TourStatusButton(), handleActivate(), handleClick(), handleDeactivate(), getAllToursAdmin()

### Community 20 - "Contact and Lead UI"
Cohesion: 0.21
Nodes (10): generateMetadata(), ContactPage(), generateMetadata(), Params, generateMetadata(), generateMetadata(), ContactSection(), FormStatus() (+2 more)

### Community 21 - "Destination and Tour APIs"
Cohesion: 0.23
Nodes (5): list_destinations(), create_tour(), get_tour(), list_tours(), Tour

### Community 22 - "Backend Route Handlers"
Cohesion: 0.17
Nodes (3): dashboard(), create_booking(), list_testimonials()

### Community 23 - "Production Compose and Nginx"
Cohesion: 0.17
Nodes (11): FLASK_ENV, image, ports, volumes, services, nginx, web, version (+3 more)

### Community 24 - "Lead Capture and Search"
Cohesion: 0.27
Nodes (4): create_lead(), search(), lead_insertion(), search_tours()

### Community 25 - "Tour Media Editing"
Cohesion: 0.27
Nodes (6): EditTourMedia(), findImages(), ImageItem, Props, PageProps, TourEditPage()

### Community 26 - "Gallery and Object Storage"
Cohesion: 0.29
Nodes (7): GalleryPage(), generateMetadata(), Params, InfiniteGallery(), Props, getAllGalleryImages(), s3

### Community 27 - "Navigation and Language Switching"
Cohesion: 0.39
Nodes (7): LanguageSwitcher(), locales, BadgeId, Navbar(), TrustBadge, usePathname, useRouter

### Community 28 - "Locale Routing Middleware"
Cohesion: 0.36
Nodes (5): redirect, routing, config, intlMiddleware, middleware()

### Community 29 - "Excel Tour Import"
Cohesion: 0.50
Nodes (5): upload_tour(), import_tour_excel(), optional_price(), safe_list(), safe_str()

### Community 30 - "Social Links Administration"
Cohesion: 0.43
Nodes (6): AdminSocialMediaPage(), fetchLinks(), handleAdd(), handleDelete(), toggleActive(), SocialLink

### Community 31 - "Frontend Build Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, parse:excel, start

### Community 32 - "S3 Image Upload API"
Cohesion: 0.40
Nodes (3): @aws-sdk/client-s3@^3.1085.0, s3, @aws-sdk/client-s3

### Community 33 - "Excel Upload Interface"
Cohesion: 0.40
Nodes (3): ExcelUploader(), ExcelUploaderProps, UploadResult

### Community 34 - "Authentication Domain Types"
Cohesion: 0.40
Nodes (4): Booking, JwtPayload, Lead, User

### Community 37 - "Tailwind Design Tokens"
Cohesion: 0.50
Nodes (3): tailwindcss@^3.4.10, config, tailwindcss

### Community 38 - "Social API Proxy"
Cohesion: 0.83
Nodes (3): GET(), headers(), POST()

### Community 39 - "Frontend Typography"
Cohesion: 0.50
Nodes (3): fraunces, inter, notoSansKannada

### Community 41 - "React Dependency Overrides"
Cohesion: 0.67
Nodes (3): overrides, react, react-dom

## Ambiguous Edges - Review These
- `PostgreSQL Architecture Description` → `Cloud SQL for MySQL`  [AMBIGUOUS]
  HY -  Backend/docs/architecture.md · relation: conceptually_related_to

## Knowledge Gaps
- **40 isolated node(s):** `Documented System Architecture`, `Google Secret Manager`, `Workload Identity Federation`, `R2 Object Storage`, `Backend Python Dependencies` (+35 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 276 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Session and Auth Routes` to `Tour Parsing and Routes`, `Lead Administration Pages`, `Localization and Destinations`, `Frontend Auth API`, `Frontend Package Configuration`, `Localized Layout Components`, `Frontend Runtime Dependencies`, `Marketing and Dashboard Pages`, `Landing Page and Social Feed`, `Admin Tour Management`, `Contact and Lead UI`, `Tour Media Editing`, `Gallery and Object Storage`, `Navigation and Language Switching`, `Locale Routing Middleware`, `Social API Proxy`, `Frontend Typography`, `Admin Tour Record API`, `Lead Validation API`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `Tour` (e.g. with `get_tour()` and `update_status()`) actually correct?**
  _`Tour` has 15 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Documented System Architecture`, `Google Secret Manager`, `Workload Identity Federation` to the rest of the system?**
  _40 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tour Parsing and Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.07058001397624039 - nodes in this community are weakly interconnected._
- **Why does `next-intl` connect `Marketing and Dashboard Pages` to `Tour Parsing and Routes`, `Lead Administration Pages`, `Localization and Destinations`, `Next.js Configuration`, `Frontend Package Configuration`, `Localized Layout Components`, `Booking Dashboard Mock`, `Frontend Runtime Dependencies`, `Landing Page and Social Feed`, `Contact and Lead UI`, `Gallery and Object Storage`, `Navigation and Language Switching`, `Locale Routing Middleware`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `Lead Administration Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.06848357791754019 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `PostgreSQL Architecture Description` and `Cloud SQL for MySQL`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._