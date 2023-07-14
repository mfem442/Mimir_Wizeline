from pydantic import BaseModel

class House(BaseModel):
    bedrooms: float | None = None
    bathrooms: float | None = None
    area: float | None = None
    Latitud: float | None = None
    Longitud: float | None = None
