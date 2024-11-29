from fastapi import FastAPI
from app.routers import predict, orders
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)
app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Medical Sales Prediction API"}
