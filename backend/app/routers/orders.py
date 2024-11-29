from fastapi import APIRouter, HTTPException, Request

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.post("/generate")
async def generate_order(request: Request):
    data = await request.json()
    medicine_name = data.get("medicine_name")
    quantity = data.get("quantity")

    if not medicine_name or not isinstance(quantity, int) or quantity <= 0:
        raise HTTPException(status_code=400, detail="Invalid input: Ensure correct medicine name and quantity > 0")

    return {"status": "Order generated", "medicine_name": medicine_name, "quantity": quantity}


@router.post("/place")
async def place_order(request: Request):
    data = await request.json()

    medicine_name = data.get("medicine_name")
    quantity = data.get("quantity")

    if not medicine_name or quantity is None or quantity <= 0:
        raise HTTPException(status_code=400, detail="Invalid order details: Missing or invalid medicine_name or quantity")
    
    order_details = {"medicine_name": medicine_name, "quantity": quantity}

    return {"status": "Order placed successfully", "order_details": order_details}
