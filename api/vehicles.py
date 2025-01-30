from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
load_dotenv()

# Create a db model
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('PGURL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Create a simple model
class VehicleModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_name = db.Column(db.String)
    vehicle_type = db.Column(db.String)
    total_mass = db.Column(db.Float)

# Commit your model (table) to the database
with app.app_context():
    db.create_all()


@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({
        "message": "Hello World!"
    })

@app.route('/api/add_vehicle', methods=['POST'])
def add_vehicle():
    if request.method == 'POST':
        data = request.get_json()
        new_vehicle = VehicleModel(
            vehicle_name=data.get('vehicle_name'),
            vehicle_type=data.get('vehicle_type'),
            total_mass=data.get('total_mass')
        )
        db.session.add(new_vehicle)
        db.session.commit()
        return jsonify({"message": "Vehicle added successfully!"}), 201

if __name__ == '__main__':
    app.run(port=5432)