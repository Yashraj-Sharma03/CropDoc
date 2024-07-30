from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Load your pre-trained model
model = tf.keras.models.load_model('path_to_your_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    img = tf.io.decode_image(file.read(), channels=3)
    img = tf.image.resize(img, [224, 224]) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
