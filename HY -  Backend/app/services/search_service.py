import json

from app.models.tour import Tour
from .cache import redis_client

CACHE_TTL = 3600


def search_tours(query):

    cache_key = f"search:{query.lower()}"

    cached = redis_client.get(cache_key)

    if cached:
        return json.loads(cached)

    tours = Tour.query.filter(
        Tour.active == True
    ).all()

    q = query.lower()

    results = []

    for tour in tours:

        data = tour.json_data

        searchable = " ".join([
            data.get("title", {}).get("en", ""),
            data.get("title", {}).get("kn", ""),
            data.get("summary", {}).get("en", ""),
            data.get("summary", {}).get("kn", ""),
            data.get("category", ""),
            " ".join(data.get("destinations", []))
        ]).lower()

        if q in searchable:
            results.append(data)

    redis_client.setex(
        cache_key,
        CACHE_TTL,
        json.dumps(results)
    )

    return results