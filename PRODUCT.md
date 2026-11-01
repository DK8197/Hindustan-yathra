# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Travelers, primarily in Hubballi and North Karnataka, seeking affordable pilgrimage journeys and other domestic or international trips. They need to discover suitable tours and get help discussing a plan that fits their dates, group, and budget.

## Product Purpose

Hindustan Yatra / Hindustan Yathra is a Hubballi-based travel agency that helps people explore and plan tours across India and internationally, with pilgrimage travel as a priority. The website supports discovery and makes it easier to contact the team to discuss trip arrangements. Success means travelers can find a relevant option, understand its details and terms, and make an informed enquiry or booking decision with the team.

## Positioning

Budget-conscious, team-assisted tour planning across India and international destinations, with a particular focus on pilgrimage journeys. Travelers can discuss itinerary choices and arrangements with the team rather than relying only on a self-service booking flow.

## Operating Context

- Travelers browse and search tours and destinations, review tour details such as itineraries and package terms, and contact the team through an enquiry form or the site's contact channels.
- Planning discussions may cover destination, dates, group size, budget, itinerary, price, inclusions, and booking or cancellation terms. Availability and package details depend on the selected trip and must be confirmed before a booking decision.
- The public experience is available in English and Kannada.
- The project also contains customer login/dashboard and administrative workflows; some areas remain scaffolded or incomplete and should not be represented as fully operational without checking the implementation.

## Capabilities and Constraints

- The site presents pilgrimage tours, family holidays, group trips, and international vacations, with tour and destination discovery, tour details, enquiry/contact, and saved-tour UI.
- Mobile OTP authentication, a customer dashboard, and admin tools exist in the application, but not every related backend or persistence workflow is complete. Online payments are not currently in scope; do not imply that a booking or payment can be completed online unless that capability is verified.
- Tour data and itinerary materials are maintained in project data and source artifacts; the frontend and Flask API are separate applications. Preserve the existing repository seams and contracts when changing how tour data is served.
- Prices, availability, inclusions, visa requirements, and booking terms vary by destination and package. Do not invent guarantees; direct travelers to the specific tour details and team for confirmation. Visa decisions belong to the relevant issuing authority.
- Keep English/Kannada localization and translated routes intact. Do not expose server-side credentials or weaken existing security controls.
- The implementation includes semantic landmarks, a skip link, and reduced-motion handling. A complete WCAG 2.2 audit is still outstanding.

## Brand Commitments

- The business uses both “Hindustan Yatra” and “Hindustan Yathra” intentionally; preserve the spelling appropriate to the existing brand asset or context rather than silently normalizing it.
- Keep product and promotional claims factual. The owner confirmed that the site's existing claims and facts are genuine.

## Evidence on Hand

- Tour and destination content is present in `frontend/src/data/` and `Artifacts/South_india_5days/`, including tour source documents and spreadsheet artifacts.
- English and Kannada UI content is present in `frontend/src/messages/en.json` and `frontend/src/messages/kn.json`.
- The existing site presents claims including “Since 2018,” authorization by the Ministry of Tourism, Government of India, recognition by the Department of Tourism, Government of Karnataka, authorized IRCTC travel-partner status, and ISO certification. The owner confirmed that the existing claims are genuine; retain the exact wording and scope from approved source material rather than embellishing them.
- Brand imagery and logo assets are present under `frontend/public/`.

## Product Principles

- Prioritize affordable travel planning, especially pilgrimage journeys.
- Make it easy to compare real trip details and reach the team for personal planning help.
- Be explicit that package contents, prices, availability, and terms vary; let travelers review them before deciding.
- Preserve the English and Kannada experience and the business's established identity.
