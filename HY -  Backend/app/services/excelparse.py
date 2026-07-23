import pandas as pd

from app import db
from app.models.tour import Tour


def safe_str(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


def safe_list(value):
    if pd.isna(value):
        return []

    return [
        x.strip()
        for x in str(value).split(",")
        if x.strip()
    ]


def import_tour_excel(file, slug_request):

    workbook = pd.ExcelFile(file)

    tour_df = pd.read_excel(
        workbook,
        sheet_name="TOUR"
    )

    itinerary_df = pd.read_excel(
        workbook,
        sheet_name="ITINERARY"
    )

    faq_df = pd.read_excel(
        workbook,
        sheet_name="FAQS"
    )

    gallery_df = pd.read_excel(
        workbook,
        sheet_name="GALLERY"
    )

    highlights_df = pd.read_excel(
        workbook,
        sheet_name="HIGHLIGHTS"
    )

    tour = tour_df.iloc[0]

    slug = safe_str(
        tour["slug"]
    )

    if (
        slug != slug_request
        and slug_request != "new_creation"
    ):
        return {
            "action": "not created",
            "slug": slug
        }

    # -----------------------------------
    # ITINERARY
    # -----------------------------------

    itinerary = []

    for _, row in itinerary_df.iterrows():

        itinerary.append({
            "day": int(row["day"]),
            "title": safe_str(
                row.get("title")
            ),
            "description": safe_str(
                row.get("description")
            ),
            "meals": safe_list(
                row.get("meals")
            ),
            "stayLocation": safe_str(
                row.get("stay_location")
            )
        })

    # -----------------------------------
    # FAQS
    # -----------------------------------

    faqs = []

    for _, row in faq_df.iterrows():

        faqs.append({
            "question": safe_str(
                row.get("question")
            ),
            "answer": safe_str(
                row.get("answer")
            )
        })

    # -----------------------------------
    # GALLERY
    # Supports:
    #
    # row1.jpg
    #
    # OR
    #
    # row1.jpg,row2.jpg,row3.jpg
    # -----------------------------------

    gallery = []

    for _, row in gallery_df.iterrows():

        raw_url = safe_str(
            row.get("url")
        )

        if not raw_url:
            continue

        urls = [
            x.strip()
            for x in raw_url.split(",")
            if x.strip()
        ]

        for url in urls:

            gallery.append({
                "alt": safe_str(
                    row.get("alt")
                ),
                "url": url,
                "width": int(
                    row.get(
                        "width",
                        1600
                    )
                ),
                "height": int(
                    row.get(
                        "height",
                        1067
                    )
                )
            })

    # -----------------------------------
    # HIGHLIGHTS
    # -----------------------------------

    highlights_en = []

    highlights_kn = []

    for _, row in highlights_df.iterrows():

        if safe_str(
            row.get("title_en")
        ):
            highlights_en.append(
                safe_str(
                    row.get("title_en")
                )
            )

        if safe_str(
            row.get("title_kn")
        ):
            highlights_kn.append(
                safe_str(
                    row.get("title_kn")
                )
            )

    # -----------------------------------
    # INCLUSIONS
    # -----------------------------------

    inclusions_en = safe_list(
        tour.get("inclusions_en")
    )

    inclusions_kn = safe_list(
        tour.get("inclusions_kn")
    )

    # -----------------------------------
    # EXCLUSIONS
    # -----------------------------------

    exclusions_en = safe_list(
        tour.get("exclusions_en")
    )

    exclusions_kn = safe_list(
        tour.get("exclusions_kn")
    )

    # -----------------------------------
    # DESTINATIONS
    # -----------------------------------

    destinations = safe_list(
        tour.get(
            "destinations"
        )
    )

    region = tour.get("region")
    # -----------------------------------
    # MAP
    # -----------------------------------

    map_center = {
        "lat": float(
            tour.get(
                "latitude",
                0
            )
        ),
        "lng": float(
            tour.get(
                "longitude",
                0
            )
        )
    }

    # -----------------------------------
    # JSON STRUCTURE
    # -----------------------------------

    json_data = {
        "id": slug,
        "slug": slug,

        "title": {
            "en": safe_str(
                tour["title_en"]
            ),
            "kn": safe_str(
                tour.get(
                    "title_kn"
                )
            )
        },

        "summary": {
            "en": safe_str(
                tour["summary_en"]
            ),
            "kn": safe_str(
                tour.get(
                    "summary_kn"
                )
            )
        },

        "seo": {
            "title": {
                "en": safe_str(
                    tour.get(
                        "seo_title_en",
                        tour["title_en"]
                    )
                ),
                "kn": safe_str(
                    tour.get(
                        "seo_title_kn"
                    )
                )
            },

            "description": {
                "en": safe_str(
                    tour.get(
                        "seo_description_en",
                        tour["summary_en"]
                    )
                ),
                "kn": safe_str(
                    tour.get(
                        "seo_description_kn"
                    )
                )
            },

            "ogImage": safe_str(
                tour["hero_image"]
            )
        },

        "heroImage": safe_str(
            tour["hero_image"]
        ),

        "gallery": gallery,

        "category": safe_str(
            tour["category"]
        ),

        "currency": safe_str(
            tour.get(
                "currency",
                "INR"
            )
        ),

        "priceFrom": int(
            tour["price_from"]
        ),

        "durationDays": int(
            tour["duration_days"]
        ),

        "durationNights": int(
            tour["duration_nights"]
        ),

        "featured": bool(
            tour["featured"]
        ),

        "active": True,

        "isDomestic": bool(
            tour["is_domestic"]
        ),

        "destinations": destinations,

        "highlights": {
            "en": highlights_en,
            "kn": highlights_kn
        },

        "inclusions": {
            "en": inclusions_en,
            "kn": inclusions_kn
        },

        "exclusions": {
            "en": exclusions_en,
            "kn": exclusions_kn
        },

        "itinerary": itinerary,

        "faqs": faqs,

        "reviews": [],

        "mapCenter": map_center
    }

    existing = Tour.query.filter_by(
        slug=slug
    ).first()

    if existing:

        existing.category = json_data["category"]
        existing.featured = json_data["featured"]
        existing.active = True
        existing.is_domestic = json_data["isDomestic"]
        existing.price_from = json_data["priceFrom"]
        existing.currency = json_data["currency"]
        existing.duration_days = json_data["durationDays"]
        existing.duration_nights = json_data["durationNights"]
        existing.json_data = json_data

        db.session.commit()

        return {
            "action": "updated",
            "slug": slug
        }

    new_tour = Tour(
        slug=slug,
        region=region,
        category=json_data["category"],
        featured=json_data["featured"],
        active=True,
        is_domestic=json_data["isDomestic"],
        price_from=json_data["priceFrom"],
        currency=json_data["currency"],
        duration_days=json_data["durationDays"],
        duration_nights=json_data["durationNights"],
        json_data=json_data
    )

    db.session.add(new_tour)
    db.session.commit()

    return {
        "action": "created",
        "slug": slug
    }