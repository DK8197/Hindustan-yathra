from flask import Blueprint, jsonify, request

from app import limiter

from app.services.tour_service import (
    get_tours,
    get_featured_tours,
    get_categories,
    get_tour_by_slug,
    get_tours_by_category,
    get_related_tours,
)

tours_bp = Blueprint(
    "tours",
    __name__
)


@tours_bp.get("")
@limiter.limit("120 per minute")
def list_tours():

    page = request.args.get(
        "page",
        1,
        type=int
    )

    limit = request.args.get(
        "limit",
        12,
        type=int
    )

    category = request.args.get(
        "category"
    )

    domestic = request.args.get(
        "domestic"
    )

    featured = request.args.get(
        "featured"
    )

    sort = request.args.get(
        "sort"
    )

    return jsonify(
        get_tours(
            page=page,
            limit=limit,
            category=category,
            domestic=domestic,
            featured=featured,
            sort=sort,
        )
    )


@tours_bp.get("/featured")
@limiter.limit("120 per minute")
def featured_tours():
    return jsonify(
        get_featured_tours()
    )


@tours_bp.get("/categories")
@limiter.limit("120 per minute")
def categories():
    return jsonify(
        get_categories()
    )


@tours_bp.get("/slug/<slug>")
@limiter.limit("120 per minute")
def tour_by_slug(slug):
    return jsonify(
        get_tour_by_slug(slug)
    )


@tours_bp.get("/category/<category>")
@limiter.limit("120 per minute")
def tours_by_category(category):
    return jsonify(
        get_tours_by_category(category)
    )


@tours_bp.get("/related/<slug>")
@limiter.limit("120 per minute")
def related_tours(slug):
    return jsonify(
        get_related_tours(slug)
    )