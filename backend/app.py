from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# Load your trained model (replace 'your_model.pkl' with the actual model path)
model = joblib.load("model")

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    # Extract the inputs from the request
    input1 = float(data.get('input1'))
    input2 = float(data.get('input2'))
    
    # Prepare input for the model (you may need to adjust this depending on your model's input format)
    input_data = np.array([[input1, input2]])
    
    # Get prediction from the model
    prediction = model.predict(input_data)
    
    # Send the result back as a JSON response
    return jsonify({"prediction": prediction[0]})

if __name__ == "__main__":
    app.run(debug=True)
