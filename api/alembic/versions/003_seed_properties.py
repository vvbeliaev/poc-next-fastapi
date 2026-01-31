"""Seed properties data

Revision ID: 003
Revises: 002
Create Date: 2026-01-31

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '003'
down_revision: Union[str, None] = '002'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


SEED_PROPERTIES = [
    {
        "title": "Modern Downtown Apartment",
        "description": "Stunning 2-bedroom apartment in the heart of downtown with panoramic city views. Features floor-to-ceiling windows, hardwood floors, and a gourmet kitchen.",
        "price": 450000.00,
        "address": "123 Main Street, Apt 15B",
        "city": "New York",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqm": 85.0,
        "image_url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    {
        "title": "Cozy Studio in Arts District",
        "description": "Perfect starter home or investment property. Recently renovated with modern finishes, in-unit laundry, and rooftop access.",
        "price": 225000.00,
        "address": "456 Art Lane, Unit 3",
        "city": "Los Angeles",
        "bedrooms": 1,
        "bathrooms": 1,
        "area_sqm": 42.0,
        "image_url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    {
        "title": "Spacious Family Home",
        "description": "Beautiful 4-bedroom house with a large backyard, perfect for families. Updated kitchen, two-car garage, and excellent school district.",
        "price": 750000.00,
        "address": "789 Oak Avenue",
        "city": "San Francisco",
        "bedrooms": 4,
        "bathrooms": 3,
        "area_sqm": 220.0,
        "image_url": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    {
        "title": "Luxury Penthouse Suite",
        "description": "Exclusive penthouse with private elevator access, wrap-around terrace, and smart home automation. Premium finishes throughout.",
        "price": 1250000.00,
        "address": "1000 Skyline Drive, PH1",
        "city": "Miami",
        "bedrooms": 3,
        "bathrooms": 3,
        "area_sqm": 175.0,
        "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    },
    {
        "title": "Charming Victorian Townhouse",
        "description": "Historic townhouse with original details preserved. High ceilings, ornate moldings, and a private garden. Walking distance to transit.",
        "price": 580000.00,
        "address": "321 Heritage Street",
        "city": "Boston",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqm": 145.0,
        "image_url": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
    },
    {
        "title": "Waterfront Condo",
        "description": "Wake up to ocean views every day. This 2-bedroom condo features a modern open layout, beach access, and resort-style amenities.",
        "price": 520000.00,
        "address": "500 Beach Boulevard, Unit 8A",
        "city": "San Diego",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqm": 95.0,
        "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
    {
        "title": "Industrial Loft Conversion",
        "description": "Unique loft space in converted warehouse. Exposed brick, 14-foot ceilings, and oversized windows. Open floor plan ideal for entertaining.",
        "price": 385000.00,
        "address": "88 Factory Row, Loft 4",
        "city": "Chicago",
        "bedrooms": 1,
        "bathrooms": 1,
        "area_sqm": 110.0,
        "image_url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
    {
        "title": "Mountain View Retreat",
        "description": "Escape to nature without leaving the city. This 3-bedroom home offers stunning mountain views, hiking trails nearby, and a hot tub.",
        "price": 620000.00,
        "address": "777 Summit Road",
        "city": "Denver",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqm": 165.0,
        "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
]


def upgrade() -> None:
    # Get connection and build insert statement
    properties_table = sa.table(
        'properties',
        sa.column('title', sa.String),
        sa.column('description', sa.Text),
        sa.column('price', sa.Float),
        sa.column('address', sa.String),
        sa.column('city', sa.String),
        sa.column('bedrooms', sa.Integer),
        sa.column('bathrooms', sa.Integer),
        sa.column('area_sqm', sa.Float),
        sa.column('image_url', sa.String),
    )
    
    op.bulk_insert(properties_table, SEED_PROPERTIES)


def downgrade() -> None:
    # Remove seeded data by title (assuming titles are unique in seed)
    titles = [p["title"] for p in SEED_PROPERTIES]
    op.execute(
        sa.text("DELETE FROM properties WHERE title = ANY(:titles)").bindparams(
            titles=titles
        )
    )
