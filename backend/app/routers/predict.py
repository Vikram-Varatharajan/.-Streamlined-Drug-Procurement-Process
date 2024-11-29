from fastapi import APIRouter, HTTPException
from app.services.prediction_service import get_prediction

router = APIRouter()

@router.get("/predict")
def predict(medicine_name: str):
    result = get_prediction(medicine_name)
    if "not found" in result:
        raise HTTPException(status_code=404, detail=result)
    return {"prediction": result}
