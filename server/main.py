from typing import Union
from fastapi import FastAPI
import pickle
from House import House
import uvicorn

app = FastAPI()
pickle_in = open("house.pkl","rb")
house = pickle.load(pickle_in)

#Predict house price
@app.post("/predict")
async def predict_house_price(data: House):
    bedrooms = data.bedrooms
    bathrooms = data.bathrooms
    area = data.area
    Latitud = data.Latitud
    Longitud = data.Longitud
    prediction = house.predict([[bedrooms, bathrooms, area, Latitud, Longitud]])
    return {'house_price': prediction[0].astype(float)}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
