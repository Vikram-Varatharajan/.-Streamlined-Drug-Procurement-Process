from app.models.lstm_model import LSTMModel

model = LSTMModel()

def get_prediction(medicine_name):
    try:
        last_sequence = model.X[-1]  
        predicted_value = model.predict(medicine_name)
        return f"Predicted value for {medicine_name}: {predicted_value}"
    except ValueError as e:
        return str(e)
