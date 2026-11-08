import json
import os
import sys

from app import create_app, db
from app.models.tour import Tour

def seed():
    app = create_app()
    with app.app_context():
        json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "data", "tours.generated.json"))
        if not os.path.exists(json_path):
            print(f"File not found: {json_path}")
            return

        with open(json_path, "r", encoding="utf-8") as f:
            tours_data = json.load(f)

        print(f"Loaded {len(tours_data)} tours from {json_path}")

        seeded_count = 0
        for item in tours_data:
            existing = Tour.query.filter_by(slug=item["slug"]).first()
            if existing:
                print(f"Tour '{item['slug']}' already exists, skipping...")
                continue

            tour = Tour.from_json(item)
            db.session.add(tour)
            seeded_count += 1
            print(f"Added tour: {item['slug']}")

        db.session.commit()
        print(f"Successfully seeded {seeded_count} tour(s) into Neon DB.")

if __name__ == "__main__":
    seed()
