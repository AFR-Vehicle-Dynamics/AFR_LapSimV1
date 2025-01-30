from flask import Flask, render_template, request, flash

class VehicleModel(db.Model):
    __tablename__ = 'simple_vehicle'
    id = db.Column(db.Integer, primary_key=True)
    vehicle_name = db.Column(db.String)
    vehicle_type = db.Column(db.String)
    total_mass = db.Column(db.Float)