from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os
import matlab.engine
import subprocess

app = Flask(__name__)
load_dotenv()

# Create a db model
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('PGURL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Start matlab engine
eng = matlab.engine.start_matlab()

# This looks huge but it's just the table schema
class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_name = db.Column(db.String, nullable=False)
    vehicle_type = db.Column(db.String, nullable=False)
    total_mass = db.Column(db.Float)
    fm_distribution = db.Column(db.Float)  # Front mass distribution
    wheelbase = db.Column(db.Integer)
    steering_rack_ratio = db.Column(db.Float)
    lift_coef = db.Column(db.Float)
    drag_coef = db.Column(db.Float)
    cl_scale_mult = db.Column(db.Float)
    cd_scale_mult = db.Column(db.Float)
    fa_distribution = db.Column(db.Float)  # Front aero distribution
    frontal_area = db.Column(db.Float)
    air_density = db.Column(db.Float)
    disc_outer_dia = db.Column(db.Float)
    pad_height = db.Column(db.Float)
    pad_f_coef = db.Column(db.Float)
    caliper_num_pistons = db.Column(db.Integer)
    caliper_piston_dia = db.Column(db.Float)
    master_cylinder_dia = db.Column(db.Float)
    pedal_ratio = db.Column(db.Float)
    grip_factor_mult = db.Column(db.Float)
    tyre_r = db.Column(db.Float)
    rolling_resistance = db.Column(db.Float)
    long_friction_coef = db.Column(db.Float)
    long_friction_load_rating = db.Column(db.Float)
    long_friction_sensitivity = db.Column(db.Float)
    lat_friction_coef = db.Column(db.Float)
    lat_friction_load_rating = db.Column(db.Float)
    lat_friction_sensitivity = db.Column(db.Float)
    front_cornering_stiffness = db.Column(db.Float)
    rear_cornering_stiffness = db.Column(db.Float)
    power_factor_mult = db.Column(db.Float)
    thermal_eff = db.Column(db.Float)
    fuel_lower_heating_value = db.Column(db.Float)
    drive_type = db.Column(db.String(256))
    gear_shift_time = db.Column(db.Float)
    primary_gear_eff = db.Column(db.Float)
    final_gear_eff = db.Column(db.Float)
    gearbox_eff = db.Column(db.Float)
    primary_gear_reduc = db.Column(db.Float)
    final_gear_reduc = db.Column(db.Float)
    first_gear_ratio = db.Column(db.Float)
    second_gear_ratio = db.Column(db.Float)
    third_gear_ratio = db.Column(db.Float)
    fourth_gear_ratio = db.Column(db.Float)
    fifth_gear_ratio = db.Column(db.Float)
    sixth_gear_ratio = db.Column(db.Float)


class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    track_name = db.Column(db.String(256), nullable=False)
    format = db.Column(db.String(256))
    country = db.Column(db.String(256))
    city = db.Column(db.String(256))
    track_type = db.Column(db.String(256))
    config = db.Column(db.String(256))
    direction = db.Column(db.String(256))
    mirror = db.Column(db.Boolean)
    export_freq = db.Column(db.Float)  # in hertz
    csv_name = db.Column(db.String(256))

# Commit the table to the database
with app.app_context():
    db.create_all()

@app.route('/api/add_vehicle', methods=['POST'])
def add_vehicle():
    if request.method == 'POST':
        data = request.get_json()
        new_vehicle = Vehicle(
            vehicle_name=data.get('vehicle_name'),
            vehicle_type=data.get('vehicle_type'),
            total_mass=data.get('total_mass'),
            fm_distribution=data.get('fm_distribution'),
            wheelbase=data.get('wheelbase'),
            steering_rack_ratio=data.get('steering_rack_ratio'),
            lift_coef=data.get('lift_coef'),
            drag_coef=data.get('drag_coef'),
            cl_scale_mult=data.get('cl_scale_mult'),
            cd_scale_mult=data.get('cd_scale_mult'),
            fa_distribution=data.get('fa_distribution'),
            frontal_area=data.get('frontal_area'),
            air_density=data.get('air_density'),
            disc_outer_dia=data.get('disc_outer_dia'),
            pad_height=data.get('pad_height'),
            pad_f_coef=data.get('pad_f_coef'),
            caliper_num_pistons=data.get('caliper_num_pistons'),
            caliper_piston_dia=data.get('caliper_piston_dia'),
            master_cylinder_dia=data.get('master_cylinder_dia'),
            pedal_ratio=data.get('pedal_ratio'),
            grip_factor_mult=data.get('grip_factor_mult'),
            tyre_r=data.get('tyre_r'),
            rolling_resistance=data.get('rolling_resistance'),
            long_friction_coef=data.get('long_friction_coef'),
            long_friction_load_rating=data.get('long_friction_load_rating'),
            long_friction_sensitivity=data.get('long_friction_sensitivity'),
            lat_friction_coef=data.get('lat_friction_coef'),
            lat_friction_load_rating=data.get('lat_friction_load_rating'),
            lat_friction_sensitivity=data.get('lat_friction_sensitivity'),
            front_cornering_stiffness=data.get('front_cornering_stiffness'),
            rear_cornering_stiffness=data.get('rear_cornering_stiffness'),
            power_factor_mult=data.get('power_factor_mult'),
            thermal_eff=data.get('thermal_eff'),
            fuel_lower_heating_value=data.get('fuel_lower_heating_value'),
            drive_type=data.get('drive_type'),
            gear_shift_time=data.get('gear_shift_time'),
            primary_gear_eff=data.get('primary_gear_eff'),
            final_gear_eff=data.get('final_gear_eff'),
            gearbox_eff=data.get('gearbox_eff'),
            primary_gear_reduc=data.get('primary_gear_reduc'),
            final_gear_reduc=data.get('final_gear_reduc'),
            first_gear_ratio=data.get('first_gear_ratio'),
            second_gear_ratio=data.get('second_gear_ratio'),
            third_gear_ratio=data.get('third_gear_ratio'),
            fourth_gear_ratio=data.get('fourth_gear_ratio'),
            fifth_gear_ratio=data.get('fifth_gear_ratio'),
            sixth_gear_ratio=data.get('sixth_gear_ratio')
        )
        db.session.add(new_vehicle)
        db.session.commit()
        return jsonify({"message": "Vehicle added successfully!"}), 201

    
@app.route('/api/edit_vehicle', methods=['PUT'])
def edit_vehicle():
    if request.method == 'PUT':
        data = request.get_json()
        vehicle_id = data.get('id')
        vehicle = Vehicle.query.filter_by(id=vehicle_id).first()
        if vehicle:
            vehicle.vehicle_name = data.get('vehicle_name', vehicle.vehicle_name)
            vehicle.vehicle_type = data.get('vehicle_type', vehicle.vehicle_type)
            vehicle.total_mass = data.get('total_mass', vehicle.total_mass)
            vehicle.fm_distribution = data.get('fm_distribution', vehicle.fm_distribution)
            vehicle.wheelbase = data.get('wheelbase', vehicle.wheelbase)
            vehicle.steering_rack_ratio = data.get('steering_rack_ratio', vehicle.steering_rack_ratio)
            vehicle.lift_coef = data.get('lift_coef', vehicle.lift_coef)
            vehicle.drag_coef = data.get('drag_coef', vehicle.drag_coef)
            vehicle.cl_scale_mult = data.get('cl_scale_mult', vehicle.cl_scale_mult)
            vehicle.cd_scale_mult = data.get('cd_scale_mult', vehicle.cd_scale_mult)
            vehicle.fa_distribution = data.get('fa_distribution', vehicle.fa_distribution)
            vehicle.frontal_area = data.get('frontal_area', vehicle.frontal_area)
            vehicle.air_density = data.get('air_density', vehicle.air_density)
            vehicle.disc_outer_dia = data.get('disc_outer_dia', vehicle.disc_outer_dia)
            vehicle.pad_height = data.get('pad_height', vehicle.pad_height)
            vehicle.pad_f_coef = data.get('pad_f_coef', vehicle.pad_f_coef)
            vehicle.caliper_num_pistons = data.get('caliper_num_pistons', vehicle.caliper_num_pistons)
            vehicle.caliper_piston_dia = data.get('caliper_piston_dia', vehicle.caliper_piston_dia)
            vehicle.master_cylinder_dia = data.get('master_cylinder_dia', vehicle.master_cylinder_dia)
            vehicle.pedal_ratio = data.get('pedal_ratio', vehicle.pedal_ratio)
            vehicle.grip_factor_mult = data.get('grip_factor_mult', vehicle.grip_factor_mult)
            vehicle.tyre_r = data.get('tyre_r', vehicle.tyre_r)
            vehicle.rolling_resistance = data.get('rolling_resistance', vehicle.rolling_resistance)
            vehicle.long_friction_coef = data.get('long_friction_coef', vehicle.long_friction_coef)
            vehicle.long_friction_load_rating = data.get('long_friction_load_rating', vehicle.long_friction_load_rating)
            vehicle.long_friction_sensitivity = data.get('long_friction_sensitivity', vehicle.long_friction_sensitivity)
            vehicle.lat_friction_coef = data.get('lat_friction_coef', vehicle.lat_friction_coef)
            vehicle.lat_friction_load_rating = data.get('lat_friction_load_rating', vehicle.lat_friction_load_rating)
            vehicle.lat_friction_sensitivity = data.get('lat_friction_sensitivity', vehicle.lat_friction_sensitivity)
            vehicle.front_cornering_stiffness = data.get('front_cornering_stiffness', vehicle.front_cornering_stiffness)
            vehicle.rear_cornering_stiffness = data.get('rear_cornering_stiffness', vehicle.rear_cornering_stiffness)
            vehicle.power_factor_mult = data.get('power_factor_mult', vehicle.power_factor_mult)
            vehicle.thermal_eff = data.get('thermal_eff', vehicle.thermal_eff)
            vehicle.fuel_lower_heating_value = data.get('fuel_lower_heating_value', vehicle.fuel_lower_heating_value)
            vehicle.drive_type = data.get('drive_type', vehicle.drive_type)
            vehicle.gear_shift_time = data.get('gear_shift_time', vehicle.gear_shift_time)
            vehicle.primary_gear_eff = data.get('primary_gear_eff', vehicle.primary_gear_eff)
            vehicle.final_gear_eff = data.get('final_gear_eff', vehicle.final_gear_eff)
            vehicle.gearbox_eff = data.get('gearbox_eff', vehicle.gearbox_eff)
            vehicle.primary_gear_reduc = data.get('primary_gear_reduc', vehicle.primary_gear_reduc)
            vehicle.final_gear_reduc = data.get('final_gear_reduc', vehicle.final_gear_reduc)
            vehicle.first_gear_ratio = data.get('first_gear_ratio', vehicle.first_gear_ratio)
            vehicle.second_gear_ratio = data.get('second_gear_ratio', vehicle.second_gear_ratio)
            vehicle.third_gear_ratio = data.get('third_gear_ratio', vehicle.third_gear_ratio)
            vehicle.fourth_gear_ratio = data.get('fourth_gear_ratio', vehicle.fourth_gear_ratio)
            vehicle.fifth_gear_ratio = data.get('fifth_gear_ratio', vehicle.fifth_gear_ratio)
            vehicle.sixth_gear_ratio = data.get('sixth_gear_ratio', vehicle.sixth_gear_ratio)
            db.session.commit()
            return jsonify({"message": "Vehicle updated successfully!"}), 200
        else:
            return jsonify({"message": "Vehicle not found!"}), 404


@app.route('/api/delete_vehicle', methods=['POST'])
def delete_vehicle():
    pass

@app.route('/api/get_vehicle', methods=['GET'])
def get_vehicle():
    if request.method == 'GET':
        vehicle_id = request.args.get('vehicle_id')
        vehicle = Vehicle.query.filter_by(id=vehicle_id).first()
        return jsonify({
            "id": vehicle.id,
            "vehicle_name": vehicle.vehicle_name,
            "vehicle_type": vehicle.vehicle_type,
            "total_mass": vehicle.total_mass,
            "fm_distribution": vehicle.fm_distribution,
            "wheelbase": vehicle.wheelbase,
            "steering_rack_ratio": vehicle.steering_rack_ratio,
            "lift_coef": vehicle.lift_coef,
            "drag_coef": vehicle.drag_coef,
            "cl_scale_mult": vehicle.cl_scale_mult,
            "cd_scale_mult": vehicle.cd_scale_mult,
            "fa_distribution": vehicle.fa_distribution,
            "frontal_area": vehicle.frontal_area,
            "air_density": vehicle.air_density,
            "disc_outer_dia": vehicle.disc_outer_dia,
            "pad_height": vehicle.pad_height,
            "pad_f_coef": vehicle.pad_f_coef,
            "caliper_num_pistons": vehicle.caliper_num_pistons,
            "caliper_piston_dia": vehicle.caliper_piston_dia,
            "master_cylinder_dia": vehicle.master_cylinder_dia,
            "pedal_ratio": vehicle.pedal_ratio,
            "grip_factor_mult": vehicle.grip_factor_mult,
            "tyre_r": vehicle.tyre_r,
            "rolling_resistance": vehicle.rolling_resistance,
            "long_friction_coef": vehicle.long_friction_coef,
            "long_friction_load_rating": vehicle.long_friction_load_rating,
            "long_friction_sensitivity": vehicle.long_friction_sensitivity,
            "lat_friction_coef": vehicle.lat_friction_coef,
            "lat_friction_load_rating": vehicle.lat_friction_load_rating,
            "lat_friction_sensitivity": vehicle.lat_friction_sensitivity,
            "front_cornering_stiffness": vehicle.front_cornering_stiffness,
            "rear_cornering_stiffness": vehicle.rear_cornering_stiffness,
            "power_factor_mult": vehicle.power_factor_mult,
            "thermal_eff": vehicle.thermal_eff,
            "fuel_lower_heating_value": vehicle.fuel_lower_heating_value,
            "drive_type": vehicle.drive_type,
            "gear_shift_time": vehicle.gear_shift_time,
            "primary_gear_eff": vehicle.primary_gear_eff,
            "final_gear_eff": vehicle.final_gear_eff,
            "gearbox_eff": vehicle.gearbox_eff,
            "primary_gear_reduc": vehicle.primary_gear_reduc,
            "final_gear_reduc": vehicle.final_gear_reduc,
            "first_gear_ratio": vehicle.first_gear_ratio,
            "second_gear_ratio": vehicle.second_gear_ratio,
            "third_gear_ratio": vehicle.third_gear_ratio,
            "fourth_gear_ratio": vehicle.fourth_gear_ratio,
            "fifth_gear_ratio": vehicle.fifth_gear_ratio,
            "sixth_gear_ratio": vehicle.sixth_gear_ratio
        })

@app.route('/api/get_all_vehicles', methods=['GET'])
def get_all_vehicles():
    vehicles = Vehicle.query.all()
    vehicle_list = []
    for vehicle in vehicles:
        vehicle_list.append({"id": vehicle.id, "vehicle_name": vehicle.vehicle_name})
    return jsonify(vehicle_list)


# Track
@app.route('/api/add_track', methods=['POST'])
def add_track():
    if request.method == 'POST':
        data = request.get_json()
        new_track = Track(
            track_name=data.get('track_name'),
            format=data.get('format'),
            country=data.get('country'),
            city=data.get('city'),
            track_type=data.get('track_type'),
            config=data.get('config'),
            direction=data.get('direction'),
            mirror=data.get('mirror'),
            export_freq=data.get('export_freq'),
            csv_name=data.get('csv_name')
        )
        db.session.add(new_track)
        db.session.commit()
        return jsonify({"message": "Track added successfully!"}), 201

@app.route('/api/edit_track', methods=['PUT'])
def edit_track():
    if request.method == 'PUT':
        data = request.get_json()
        track_id = data.get('id')
        track = Track.query.filter_by(id=track_id).first()
        if track:
            track.track_name = data.get('track_name', track.track_name)
            track.format = data.get('format', track.format)
            track.country = data.get('country', track.country)
            track.city = data.get('city', track.city)
            track.track_type = data.get('track_type', track.track_type)
            track.config = data.get('config', track.config)
            track.direction = data.get('direction', track.direction)
            track.mirror = data.get('mirror', track.mirror)
            track.export_freq = data.get('export_freq', track.export_freq)
            track.csv_name = data.get('csv_name', track.csv_name)
            db.session.commit()
            return jsonify({"message": "Track updated successfully!"}), 200
        else:
            return jsonify({"message": "Track not found!"}), 404
        
@app.route('/api/get_track', methods=['GET'])
def get_track():
    if request.method == 'GET':
        track_id = request.args.get('track_id')
        track = Track.query.filter_by(id=track_id).first()
        return jsonify({
            "id": track.id,
            "track_name": track.track_name,
            "format": track.format,
            "country": track.country,
            "city": track.city,
            "track_type": track.track_type,
            "config": track.config,
            "direction": track.direction,
            "mirror": track.mirror,
            "export_freq": track.export_freq,
            "csv_name": track.csv_name
        })

@app.route('/api/delete_track', methods=['POST'])
def delete_track():
    if request.method == 'DELETE':
        data = request.get_json()
        track_id = data.get('id')
        track = Track.query.filter_by(id=track_id).first()
        if track:
            db.session.delete(track)
            db.session.commit()
            return jsonify({"message": "Track deleted successfully!"}), 200
        else:
            return jsonify({"message": "Track not found!"}), 404

@app.route('/api/get_all_tracks', methods=['GET'])
def get_all_tracks():
    tracks = Track.query.all()
    track_list = []
    for track in tracks:
        track_list.append({"id": track.id, "track_name": track.track_name})
    return jsonify(track_list)


@app.route("/api/matlab", methods=['GET'])
def add_in_matlab():
    a = request.args.get('a', type=float)
    b = request.args.get('b', type=float)

    if a is None or b is None:
        return jsonify({'error': 'Missing or invalid parameters'}), 400

    result = eng.plus(a, b)
    return str(result)
    

if __name__ == "__main__":
    app.run(port=5432)