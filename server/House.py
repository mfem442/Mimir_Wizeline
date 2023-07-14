from pydantic import BaseModel

class House(BaseModel):
    bedrooms: int | None = None
    bathrooms: float | None = None
    area: int | None = None
    Latitud: float | None = None
    Longitud: float | None = None
