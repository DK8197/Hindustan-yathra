import os
import redis
from app import InMemoryStore

redis_url = os.getenv("REDIS_URL")
try:
    if redis_url:
        redis_client = redis.Redis.from_url(redis_url, decode_responses=True)
    else:
        redis_client = redis.Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
            db=int(os.getenv("REDIS_DB", 0)),
            decode_responses=True
        )
    redis_client.ping()
except Exception:
    redis_client = InMemoryStore()


def cache_get(key: str):
    try:
        return redis_client.get(key)
    except Exception:
        return None


def cache_set(key: str, value: str, ttl: int = 900):
    try:
        redis_client.setex(key, ttl, value)
    except Exception:
        pass
