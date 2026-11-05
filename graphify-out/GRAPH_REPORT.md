# Graph Report - Hindustan Yathra  (2026-11-05)

## Corpus Check
- 208 files · ~422,486 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: .css 5, (none) 3, .db 1)

## Summary
- 1382 nodes · 2345 edges · 135 communities (91 shown, 44 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 76 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70c110f7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next-intl
- TourCard.tsx
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
- routing.ts
- Backend Tour Catalog
- dependencies
- [locale]/destinations/page.tsx
- getPathname
- Backend CI Workflow
- Social Media API
- tours-repository.ts
- assets.mjs
- Destination and Tour APIs
- Backend Route Handlers
- Production Compose and Nginx
- Lead Capture and Search
- Tour Media Editing
- Gallery and Object Storage
- draw.mjs
- 6. Recipes
- inspect.mjs
- Social Links Administration
- Frontend Build Scripts
- S3 Image Upload API
- lucide-react
- Authentication Domain Types
- In-Memory Cache Store
- Next.js Configuration
- Tailwind Design Tokens
- Social API Proxy
- Frontend Typography
- Tour Request Schema
- React Dependency Overrides
- verify-otp/route.ts
- charts.js
- xlsx
- Class Name Utilities
- app-draw.mjs
- Imagery
- Lead
- Three.js Scene Helpers
- The run
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
- The study
- HeroSection.tsx
- Co-founder Portrait
- Page
- lint.mjs
- Layout
- Colour
- Scroll scenes
- scenes.mjs
- App screens
- Tells — the dated registry
- Type
- Product
- Founder Portrait
- Stage
- 7. Tables and lists
- Words
- react
- 2. The run for an app screen
- Critique — judging the render
- cdp.mjs
- rules.mjs
- parse-excel.ts
- Animation implementation plans
- 001 — Decouple hero scroll motion from React renders
- 002 — Preserve useful feedback in reduced-motion mode
- 003 — Shorten browse-card image hover motion
- leads/page.tsx
- tasteskill v2 (`design-taste-frontend`)
- app.json
- 9. Type and colour
- kinds
- 3. The shell
- 4. The canvas and the page title
- 6. Charts
- Hindustan Yatra homepage copy deck (existing content retained)
- builder
- commerce
- community
- creator
- devtools
- finance
- markets
- report
- smb-admin
- support
- wallet
- workspace
- 8. Forms and settings
- extends
- admin/layout.tsx
- GalleryMasonry.tsx
- react-dom@18.3.1
- @tanstack/react-query
- three@^0.185.1

## God Nodes (most connected - your core abstractions)
1. `next` - 54 edges
2. `next-intl` - 44 edges
3. `getOne()` - 31 edges
4. `Tour` - 28 edges
5. `react` - 28 edges
6. `lucide-react` - 27 edges
7. `Link` - 27 edges
8. `getPathname` - 24 edges
9. `search()` - 22 edges
10. `getVideo()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `Steps` --references--> `InfiniteGallery()`  [INFERRED]
  plans/003-shorten-browse-card-hover-motion.md → frontend/src/components/gallery/InfiniteGallery.tsx
- `Steps` --references--> `TourFAQ()`  [INFERRED]
  plans/002-preserve-useful-reduced-motion-feedback.md → frontend/src/components/sections/TourFAQ.tsx
- `Steps` --references--> `TourGallery()`  [INFERRED]
  plans/003-shorten-browse-card-hover-motion.md → frontend/src/components/sections/TourGallery.tsx
- `6.4 Marks` --references--> `short()`  [INFERRED]
  frontend/.agents/skills/design-taste-frontend/references/app-screens.md → frontend/.agents/skills/design-taste-frontend/scripts/assets.mjs
- `uploadImage()` --indirect_call--> `slug()`  [INFERRED]
  frontend/src/app/admin/tours/[slug]/EditTourMedia.tsx → frontend/.agents/skills/design-taste-frontend/scripts/assets.mjs

## Import Cycles
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/leads.py -> HY -  Backend/app/services/leads.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/models/leads.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/excelparse.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/auth.py -> HY -  Backend/app/models/user.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/destinations.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/slug_details.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/social_media.py -> HY -  Backend/app/models/social_media.py -> HY -  Backend/app/__init__.py`
- 3-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/excel.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/leads.py -> HY -  Backend/app/services/leads.py -> HY -  Backend/app/models/leads.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/excelparse.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/tour_admin_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/auth.py -> HY -  Backend/app/models/user.py -> HY -  Backend/app/models/base.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/search.py -> HY -  Backend/app/services/search_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 4-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints/tours.py -> HY -  Backend/app/services/tour_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`
- 5-file cycle: `HY -  Backend/app/__init__.py -> HY -  Backend/app/blueprints_admin/updateTours.py -> HY -  Backend/app/services/tour_admin_service.py -> HY -  Backend/app/services/tour_service.py -> HY -  Backend/app/models/tour.py -> HY -  Backend/app/__init__.py`

## Hyperedges (group relationships)
- **Travel Brand and Trust Marks** — frontend_public_images_hindustan_yathra_logo_hindustan_yathra_brand_mark, frontend_public_images_irctc_logo_irctc_mark, frontend_public_images_iso_certified_company_iso_badge, frontend_public_images_karnataka_state_tourism_logo_karnataka_tourism_mark, frontend_public_images_logo_since_2018_brand_tenure [EXTRACTED 1.00]
- **Destination and Tour Artwork** — frontend_public_images_kashi_varanasi_ghats, frontend_public_images_tours_andaman_andaman_hero_andaman_island_coast, frontend_public_images_tours_bali_1_ulu_watu_sunset_route, frontend_public_images_tours_bali_hero_bali_honeymoon_escape, frontend_public_images_tours_chardham_1_kedarnath_at_dawn, frontend_public_images_tours_chardham_2_badrinath_road, frontend_public_images_tours_chardham_hero_chardham_yatra_route [EXTRACTED 1.00]

## Communities (135 total, 44 thin omitted)

### Community 0 - "next-intl"
Cohesion: 0.13
Nodes (21): dynamicParams, generateMetadata(), Params, revalidate, TourDetailPage(), TourBookingCard(), TourFAQ(), NormalizedGalleryImage (+13 more)

### Community 1 - "TourCard.tsx"
Cohesion: 0.25
Nodes (10): ProfilePage(), SavedToursPage(), Status, TourCard(), fetchJson(), useAllTours(), useFeaturedTours(), useToursByCategory() (+2 more)

### Community 2 - "Localization and Destinations"
Cohesion: 0.21
Nodes (16): categoryIcons, compactSearchText(), containsPhrase(), DestinationsExplorer(), editDistance(), fuzzyWordMatch(), getSearchScore(), getSummary() (+8 more)

### Community 3 - "Backend Authentication Flow"
Cohesion: 0.16
Nodes (9): _get_phone(), login(), me(), refresh(), verify(), create_token(), generate_csrf_token(), BaseModel (+1 more)

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
Nodes (11): get_leads(), get_tour(), list_tours(), update_handled_status(), update_status(), update_tour_media(), upload_tour(), import_tour_excel() (+3 more)

### Community 10 - "Frontend Auth API"
Cohesion: 0.21
Nodes (7): bodySchema, GET(), bodySchema, AUTH_COOKIE, requireAdmin(), sessionCookieOptions, verifySession()

### Community 11 - "Frontend Package Configuration"
Cohesion: 0.15
Nodes (18): devDependencies, eslint@^8.57.0, eslint-config-next@15.5.19, tsx@^4.19.0, @types/jsonwebtoken@^9.0.6, @types/node@^22.5.4, @types/react@^18.3.5, @types/react-dom@^18.3.0 (+10 more)

### Community 12 - "routing.ts"
Cohesion: 0.11
Nodes (23): DashboardLayout(), dynamic, LocaleLayout(), revalidate, FloatingDestinations(), FloatingContact(), ContactPrompt(), Footer() (+15 more)

### Community 13 - "Backend Tour Catalog"
Cohesion: 0.19
Nodes (16): list_destinations(), categories(), featured_tours(), list_tours(), related_tours(), tour_by_slug(), tours_by_category(), Tour (+8 more)

### Community 14 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, framer-motion@^11.18.2, jsonwebtoken@^9.0.2, lucide-react@^0.436.0, mysql2@^3.11.3, next@15.5.19, next-intl@^4.13.2, postcss@^8.4.41 (+9 more)

### Community 15 - "[locale]/destinations/page.tsx"
Cohesion: 0.13
Nodes (15): brochureHead, brochureScript, jakarta, kannada, metadata, playfair, RootLayout(), DestinationsPage() (+7 more)

### Community 16 - "getPathname"
Cohesion: 0.06
Nodes (44): AboutPage(), generateMetadata(), CancellationPolicyPage(), generateMetadata(), Params, ContactPage(), generateMetadata(), Params (+36 more)

### Community 17 - "Backend CI Workflow"
Cohesion: 0.14
Nodes (13): jobs, test, name, on, pull_request, push, branches, run (+5 more)

### Community 18 - "Social Media API"
Cohesion: 0.26
Nodes (6): add_link(), delete_link(), get_links(), get_social_links(), update_link(), SocialMediaLink

### Community 19 - "tours-repository.ts"
Cohesion: 0.12
Nodes (22): AdminToursPage(), GET(), generateStaticParams(), revalidate, sitemap(), AddTourButton(), Props, TourStatusButton() (+14 more)

### Community 20 - "assets.mjs"
Cohesion: 0.07
Nodes (85): AIC_FIELDS, AIC_HEADERS, applyThumb(), ARCHIVE_LICENCE, args, argv, base(), clock() (+77 more)

### Community 21 - "Destination and Tour APIs"
Cohesion: 0.29
Nodes (3): create_tour(), get_tour(), list_tours()

### Community 22 - "Backend Route Handlers"
Cohesion: 0.13
Nodes (4): dashboard(), create_booking(), upload_excel(), list_testimonials()

### Community 23 - "Production Compose and Nginx"
Cohesion: 0.17
Nodes (11): FLASK_ENV, image, ports, volumes, services, nginx, web, version (+3 more)

### Community 25 - "Tour Media Editing"
Cohesion: 0.27
Nodes (8): EditTourMedia(), uploadImage(), uploadItinerary(), findImages(), ImageItem, Props, PageProps, TourEditPage()

### Community 26 - "Gallery and Object Storage"
Cohesion: 0.33
Nodes (6): GalleryPage(), Params, InfiniteGallery(), Props, getAllGalleryImages(), s3

### Community 27 - "draw.mjs"
Cohesion: 0.10
Nodes (41): adjustments(), argv, assetQueries(), ASSETS_PATH, briefStop(), briefWords(), deal(), dealHero() (+33 more)

### Community 28 - "6. Recipes"
Cohesion: 0.06
Nodes (31): 10. Rules for motion, 1. The budget, 2. What strong pages do with motion, 3. Four questions before any animation, 4. Tokens, 5. Scroll behaviours, ranked, 6. Recipes, 7. Signature moves (+23 more)

### Community 29 - "inspect.mjs"
Cohesion: 0.09
Nodes (21): allow, appMode, args, asJson, dealtFonts, fails, film, HEIGHT (+13 more)

### Community 30 - "Social Links Administration"
Cohesion: 0.70
Nodes (5): AdminSocialMediaPage(), fetchLinks(), handleAdd(), handleDelete(), toggleActive()

### Community 31 - "Frontend Build Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, parse:excel, start

### Community 32 - "S3 Image Upload API"
Cohesion: 0.40
Nodes (3): @aws-sdk/client-s3@^3.1085.0, s3, @aws-sdk/client-s3

### Community 33 - "lucide-react"
Cohesion: 0.13
Nodes (10): SocialLink, mockBookings, ExcelUploader(), ExcelUploaderProps, UploadResult, Status, CustomTour, CustomTourCategory (+2 more)

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

### Community 44 - "verify-otp/route.ts"
Cohesion: 0.29
Nodes (3): bodySchema, leadSchema, zod

### Community 45 - "charts.js"
Cohesion: 0.21
Nodes (24): axes(), bars(), dayHeads(), diverging(), frame(), hits(), kindStyle(), lane() (+16 more)

### Community 49 - "xlsx"
Cohesion: 0.33
Nodes (4): autoprefixer@^10.4.20, xlsx@^0.18.5, autoprefixer, xlsx

### Community 51 - "app-draw.mjs"
Cohesion: 0.11
Nodes (22): argv, deal(), dealScreen(), dealShell(), dealStyle(), fontLink(), HERE, kebab() (+14 more)

### Community 52 - "Imagery"
Cohesion: 0.09
Nodes (22): 10. Markup and credits, 11. Video, 12. Where pictures and footage go, 1. What the study measured, 2. Decide what imagery exists, 3. Real pictures from the open collections, 4. The dealt photographs, 5. Cropping and placing (+14 more)

### Community 53 - "Lead"
Cohesion: 0.16
Nodes (9): create_lead(), Lead, _clean(), lead_insertion(), client(), test_database_failure_is_reported(), test_lead_is_saved_with_long_message(), test_missing_required_fields_are_rejected() (+1 more)

### Community 55 - "The run"
Cohesion: 0.11
Nodes (17): 10. Report, 1. Read the brief and the project, 2. Write the argument, 3. Draw the direction, 4. Find the idea, 5. Write the words, 6. Build it, still, 7. Gate (+9 more)

### Community 77 - "The study"
Cohesion: 0.12
Nodes (15): 10. The 25 highest-scored sites and their ideas, 11. How the skill was tested, 12. The October 2026 study: 100 Sites of the Day, 13. The app-screen study, 1. Method and its limits, 2. Scores, 3. Where the idea comes from, 4. Headlines (+7 more)

### Community 78 - "HeroSection.tsx"
Cohesion: 0.19
Nodes (13): DESKTOP_SLIDES, FRAME_SIZES, HeroAlbum, HeroAlbumComponent(), HeroAlbumProps, MOBILE_SLIDES, Orientation, Slide (+5 more)

### Community 80 - "Page"
Cohesion: 0.25
Nodes (3): Browser, Page, sleep()

### Community 81 - "lint.mjs"
Cohesion: 0.14
Nodes (13): APP_LEVEL, appMode, args, asJson, byId, EXT, files, findings (+5 more)

### Community 82 - "Layout"
Cohesion: 0.15
Nodes (12): 10. How pages fail, 1. What strong pages do, 2. Margins and the grid, 3. Where text sits, 4. Empty space, 5. The frame: margins, balance and titles, 6. Sections: carry the idea, vary the arrangement, 7. Navigation (+4 more)

### Community 83 - "Colour"
Cohesion: 0.17
Nodes (11): 1. What the study measured, 2. The roles, 3. Proportion, 4. Surfaces without lines or shadows, 5. Colour fields, 6. Dark pages, 7. Colour and photographs, 8. Contrast (+3 more)

### Community 84 - "Scroll scenes"
Cohesion: 0.17
Nodes (11): 1. What a scene is, 2. Putting a scene on a page, 3. Filling it, 4. Fitting it to the page, 5. The phone, reduced motion, no script, 6. Checking it, 7. Rules for scenes, 8. When no scene in the library fits (+3 more)

### Community 85 - "scenes.mjs"
Cohesion: 0.21
Nodes (9): args, go(), only, outDir, problems, rel(), run(), sheet() (+1 more)

### Community 86 - "App screens"
Cohesion: 0.18
Nodes (10): 10. Density, 11. Empty, zero, loading and error states, 12. The phone, 13. House rules for app screens, 14. Tells of generated dashboards, 1. When this applies, 5. KPIs, App screens (+2 more)

### Community 87 - "Tells — the dated registry"
Cohesion: 0.18
Nodes (10): 1. First wave (2023–2024), 2. Second wave (2025), 3. Third wave (2025–2026): the "fix" that became the look, 4. Gallery fashion, banned as house style, 5. Structural tells, 6. Copy tells, 7. Motion tells, 8. Why removal is not enough (+2 more)

### Community 88 - "Type"
Cohesion: 0.18
Nodes (10): 1. What the study measured, 2. The scale: few sizes, far apart, 3. Setting display type, 4. Setting text, 5. Loading the fonts properly, 6. One family or two, 7. Details that separate set type from typed text, 8. Mistakes the inspector cannot see (+2 more)

### Community 89 - "Product"
Cohesion: 0.18
Nodes (10): Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles (+2 more)

### Community 92 - "7. Tables and lists"
Cohesion: 0.20
Nodes (10): 7.1 Rows, 7.2 Header, 7.3 Dividers, 7.4 Figures and alignment, 7.5 Ink inside rows, 7.6 Status pills, 7.7 Media, 7.8 Actions and paging (+2 more)

### Community 93 - "Words"
Cohesion: 0.20
Nodes (9): 1. Write the argument first, 2. The two-line headline, 3. Headline shapes that work, 4. Supporting line, body, buttons, 5. Proof without inventing it, 6. Things that read as generated, 7. Micro-typography, Contents (+1 more)

### Community 94 - "react"
Cohesion: 0.38
Nodes (6): FeaturedToursSearch(), performSearch(), useDebouncedValue(), searchTours(), Tour, react

### Community 95 - "2. The run for an app screen"
Cohesion: 0.22
Nodes (9): 2.1 Inventory the data and the jobs, 2.2 Name the screen's one question, 2.3 Choose a style, 2.4 Build the shell, 2.5 Put in the data, 2.6 Build the states, 2.7 The check, 2.8 Report (+1 more)

### Community 98 - "Critique — judging the render"
Cohesion: 0.22
Nodes (8): 1. How to look, 2. The score, 3. Caps, 4. Writing the critique, 5. What to fix first, 6. When to stop, Contents, Critique — judging the render

### Community 99 - "cdp.mjs"
Cohesion: 0.28
Nodes (3): alive(), findChrome(), sweepProfiles()

### Community 100 - "rules.mjs"
Cohesion: 0.31
Nodes (8): APP_SKIP, colourFamily(), hexToHsl(), inRange(), judge(), judgeApp(), judgeLayout(), RULE_IDS

### Community 101 - "parse-excel.ts"
Cohesion: 0.36
Nodes (8): buildTours(), main(), OUTPUT_PATH, parseOptionalPrice(), readSheet(), Row, splitList(), toBool()

### Community 102 - "Animation implementation plans"
Cohesion: 0.22
Nodes (5): Additional audited UX opportunities implemented, Animation implementation plans, Dependencies, Overall status, Recommended execution order

### Community 103 - "001 — Decouple hero scroll motion from React renders"
Cohesion: 0.22
Nodes (9): 001 — Decouple hero scroll motion from React renders, Accessibility, Boundaries, Performance considerations, Problem, Repo conventions to follow, Steps, Target (+1 more)

### Community 104 - "002 — Preserve useful feedback in reduced-motion mode"
Cohesion: 0.22
Nodes (9): 002 — Preserve useful feedback in reduced-motion mode, Accessibility, Boundaries, Performance considerations, Problem, Repo conventions to follow, Steps, Target (+1 more)

### Community 105 - "003 — Shorten browse-card image hover motion"
Cohesion: 0.22
Nodes (9): 003 — Shorten browse-card image hover motion, Accessibility, Boundaries, Performance considerations, Problem, Repo conventions to follow, Steps, Target (+1 more)

### Community 106 - "leads/page.tsx"
Cohesion: 0.36
Nodes (5): LeadStatusButton(), Props, AdminLeadsPage(), getLeads(), Lead

### Community 107 - "tasteskill v2 (`design-taste-frontend`)"
Cohesion: 0.29
Nodes (6): Contents, How it works, Install, Notes, Requirements, tasteskill v2 (`design-taste-frontend`)

### Community 108 - "app.json"
Cohesion: 0.33
Nodes (5): about, patterns, shells, styles, version

### Community 109 - "9. Type and colour"
Cohesion: 0.33
Nodes (6): 9.1 Type, 9.2 Colour on light screens, 9.3 Colour on dark screens, 9.4 Surfaces, radius, icons, spacing, 9.5 Default tokens, 9. Type and colour

### Community 110 - "kinds"
Cohesion: 0.40
Nodes (5): note, screens, styles, kinds, analytics

### Community 111 - "3. The shell"
Cohesion: 0.40
Nodes (5): 3.1 Five archetypes, 3.2 Sidebar, 3.3 Top bar, 3.4 Right rail and pinned columns, 3. The shell

### Community 112 - "4. The canvas and the page title"
Cohesion: 0.40
Nodes (5): 4.1 Width and gutters, 4.2 One left edge, one right edge, 4.3 The title, 4.4 Tabs, filters and the date range, 4. The canvas and the page title

### Community 113 - "6. Charts"
Cohesion: 0.40
Nodes (5): 6.1 Which chart for which question, 6.2 One question, one series, 6.3 Axes and gridlines, 6.4 Marks, 6. Charts

### Community 114 - "Hindustan Yatra homepage copy deck (existing content retained)"
Cohesion: 0.40
Nodes (4): Claim order and proof, Hindustan Yatra homepage copy deck (existing content retained), Idea and image rule, Reader and action

### Community 115 - "builder"
Cohesion: 0.50
Nodes (4): note, screens, styles, builder

### Community 116 - "commerce"
Cohesion: 0.50
Nodes (4): note, screens, styles, commerce

### Community 117 - "community"
Cohesion: 0.50
Nodes (4): note, screens, styles, community

### Community 118 - "creator"
Cohesion: 0.50
Nodes (4): note, screens, styles, creator

### Community 119 - "devtools"
Cohesion: 0.50
Nodes (4): note, screens, styles, devtools

### Community 120 - "finance"
Cohesion: 0.50
Nodes (4): note, screens, styles, finance

### Community 121 - "markets"
Cohesion: 0.50
Nodes (4): markets, note, screens, styles

### Community 122 - "report"
Cohesion: 0.50
Nodes (4): report, note, screens, styles

### Community 123 - "smb-admin"
Cohesion: 0.50
Nodes (4): smb-admin, note, screens, styles

### Community 124 - "support"
Cohesion: 0.50
Nodes (4): support, note, screens, styles

### Community 125 - "wallet"
Cohesion: 0.50
Nodes (4): wallet, note, screens, styles

### Community 126 - "workspace"
Cohesion: 0.50
Nodes (4): workspace, note, screens, styles

### Community 127 - "8. Forms and settings"
Cohesion: 0.50
Nodes (4): 8.1 Fields, 8.2 Settings layout, 8.3 Buttons, 8. Forms and settings

### Community 128 - "extends"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

## Ambiguous Edges - Review These
- `PostgreSQL Architecture Description` → `Cloud SQL for MySQL`  [AMBIGUOUS]
  HY -  Backend/docs/architecture.md · relation: conceptually_related_to

## Knowledge Gaps
- **25 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `English and Kannada Routing`, `React Three Fiber Hero`, `SEO and Accessibility Foundation` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 663 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Session and Auth Routes` to `next-intl`, `admin/layout.tsx`, `Localization and Destinations`, `GalleryMasonry.tsx`, `TourCard.tsx`, `Frontend Auth API`, `Frontend Package Configuration`, `routing.ts`, `dependencies`, `[locale]/destinations/page.tsx`, `getPathname`, `tours-repository.ts`, `Tour Media Editing`, `Gallery and Object Storage`, `lucide-react`, `Social API Proxy`, `Frontend Typography`, `Admin Tour Record API`, `verify-otp/route.ts`, `HeroSection.tsx`, `leads/page.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `Tour` (e.g. with `get_tour()` and `update_status()`) actually correct?**
  _`Tour` has 15 INFERRED edges - model-reasoned connections that need verification._
- **What connects `next/core-web-vitals`, `next/typescript`, `English and Kannada Routing` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next-intl` be split into smaller, more focused modules?**
  _Cohesion score 0.12701612903225806 - nodes in this community are weakly interconnected._
- **Why does `Tour` connect `react` to `next-intl`, `TourCard.tsx`, `Localization and Destinations`, `parse-excel.ts`, `[locale]/destinations/page.tsx`, `tours-repository.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Project Guidance and Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `PostgreSQL Architecture Description` and `Cloud SQL for MySQL`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._