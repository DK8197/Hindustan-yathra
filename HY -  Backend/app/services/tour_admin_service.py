from sqlalchemy import desc

from app.models.tour import Tour

from .tour_service import serialize_tour

def get_tours_admin(
    page=1,
    limit=12,
    category=None,
    domestic=None,
    featured=None,
    sort=None,
):
    query = Tour.query

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