from marshmallow import Schema, fields


class TourSchema(Schema):
    title = fields.String(required=True)
    slug = fields.String(required=True)
    category = fields.String(required=False)
    duration_days = fields.Integer(load_default=1)
    destination = fields.String(required=False)
    short_description = fields.String(required=False)
    price = fields.Float(required=False)
    active = fields.Boolean(load_default=True)
    published = fields.Boolean(load_default=False)
    language = fields.String(load_default="en")
