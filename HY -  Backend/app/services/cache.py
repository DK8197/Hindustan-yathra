import os
import redis

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    db=os.getenv("REDIS_DB"),
    decode_responses=True
)

def cache_get(key: str):
    return redis_client.get(key)


def cache_set(key: str, value: str, ttl: int = 900):
    redis_client.setex(key, ttl, value)
