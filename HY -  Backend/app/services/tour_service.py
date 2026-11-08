from sqlalchemy import desc

from app.models.tour import Tour


def serialize_tour(tour):
    data = tour.json_data or {}

    return {
        "id": tour.id,
        "slug": tour.slug,
        "category": tour.category,
        "region":tour.region,
        "featured": bool(tour.featured),
        "active": bool(tour.active),

        "isDomestic": bool(tour.is_domestic),

        "priceFrom": tour.price_from,
        "currency": tour.currency,

        "durationDays": tour.duration_days,
        "durationNights": tour.duration_nights,

        "title": data.get("title", {}),
        "summary": data.get("summary", {}),
        "heroImage": data.get("heroImage"),
        "destinations": data.get("destinations", []),

        # Detail fields
        "highlights": data.get("highlights", {}),
        "inclusions": data.get("inclusions", {}),
        "exclusions": data.get("exclusions", {}),
        "itinerary": data.get("itinerary", []),
        "faqs": data.get("faqs", []),
        "gallery": data.get("gallery", []),
        "reviews": data.get("reviews", []),
        "seo": data.get("seo", {}),
        "mapCenter": data.get("mapCenter"),
    }


def get_tours(
    page=1,
    limit=12,
    category=None,
    domestic=None,
    featured=None,
    sort=None,
):
    query = Tour.query.filter(
        Tour.active == True
    )

    if category:
        query = query.filter(
            Tour.category == category
        )

    if domestic is not None:
        query = query.filter(
            Tour.is_domestic ==
            (domestic.lower() == "true")
        )

    if featured is not None:
        query = query.filter(
            Tour.featured ==
            (featured.lower() == "true")
        )

    if sort == "price_asc":
        query = query.order_by(
            Tour.price_from.asc()
        )

    elif sort == "price_desc":
        query = query.order_by(
            Tour.price_from.desc()
        )

    elif sort == "duration":
        query = query.order_by(
            Tour.duration_days.asc()
        )

    else:
        query = query.order_by(
            Tour.featured.desc(),
            desc(Tour.id)
        )

    pagination = query.paginate(
        page=page,
        per_page=limit,
        error_out=False
    )

    return {
        "items": [
            serialize_tour(tour)
            for tour in pagination.items
        ],
        "pagination": {
            "page": pagination.page,
            "pages": pagination.pages,
            "total": pagination.total,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
        },
    }


def get_featured_tours():
    tours = (
        Tour.query
        .filter(
            Tour.active == True,
            Tour.featured == True
        )
        .order_by(
            Tour.id.desc()
        )
        .all()
    )

    return [
        serialize_tour(tour)
        for tour in tours
    ]


def get_categories():
    categories = (
        Tour.query
        .with_entities(Tour.category)
        .distinct()
        .all()
    )

    return sorted([
        row[0]
        for row in categories
        if row[0]
    ])


def get_tour_by_slug(slug):
    tour = (
        Tour.query
        .filter(
            Tour.slug == slug
        )
        .first_or_404()
    )

    full_data = tour.to_dict() if hasattr(tour, 'to_dict') else (tour.json_data or {})
    if isinstance(full_data, dict) and full_data:
        full_data.setdefault("id", tour.id)
        full_data.setdefault("slug", tour.slug)
        full_data.setdefault("category", tour.category)
        full_data.setdefault("priceFrom", tour.price_from)
        full_data.setdefault("durationDays", tour.duration_days)
        full_data.setdefault("durationNights", tour.duration_nights)
        full_data.setdefault("isDomestic", tour.is_domestic)
        return full_data

    return serialize_tour(tour)


def get_tours_by_category(category):
    tours = (
        Tour.query
        .filter(
            Tour.active == True,
            Tour.category == category
        )
        .order_by(
            Tour.featured.desc(),
            Tour.id.desc()
        )
        .all()
    )

    return [
        serialize_tour(tour)
        for tour in tours
    ]


def get_related_tours(slug):
    current = (
        Tour.query
        .filter(
            Tour.slug == slug
        )
        .first_or_404()
    )

    tours = (
        Tour.query
        .filter(
            Tour.active == True,
            Tour.category == current.category,
            Tour.slug != slug
        )
        .order_by(
            Tour.featured.desc(),
            Tour.id.desc()
        )
        .limit(4)
        .all()
    )

    return [
        serialize_tour(tour)
        for tour in tours
    ]