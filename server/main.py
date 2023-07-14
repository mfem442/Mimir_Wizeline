from typing import Union
from fastapi import FastAPI
import pickle
from House import House

app = FastAPI()
pickle_in = open("house.pkl","rb")
house = pickle.load(pickle_in)

#Predict house price
@app.post("/predict")
async def predict_houseprice(data: House) -> float:
    data = data.dict()
    bedrooms = data['bedrooms']
    bathrooms = data['bathrooms']
    area = data['area']
    Latitud = data['Latitud']
    Longitud = data['Longitud']
    print(house.predict([[bedrooms, bathrooms, area, Latitud, Longitud]]))
    prediction = house.predict([[bedrooms, bathrooms, area, Latitud, Longitud]])
    return {'prediction': prediction}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
