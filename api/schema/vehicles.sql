-- Table: vehicles

-- Drop the table if it exists (optional)
DROP TABLE IF EXISTS vehicles;

-- Create the table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    vehicle_name VARCHAR(256) NOT NULL,
    vehicle_type VARCHAR(256),
    total_mass FLOAT,
    fm_distribution FLOAT, -- Front mass distribution
    wheelbase INT,
    steering_rack_ratio FLOAT,
    lift_coef FLOAT,
    drag_coef FLOAT,
    cl_scale_mult FLOAT,
    cd_scale_mult FLOAT,
    fa_distribution FLOAT, -- Front aero distribution
    frontal_area FLOAT,
    air_density FLOAT,
    disc_outer_dia FLOAT,
    pad_height FLOAT,
    pad_f_coef FLOAT,
    caliper_num_pistons INT,
    caliper_piston_dia FLOAT,
    master_cylinder_dia FLOAT,
    pedal_ratio FLOAT,
    grip_factor_mult FLOAT,
    tyre_r FLOAT,
    rolling_resistance FLOAT,
    long_friction_coef FLOAT,
    long_friction_load_rating FLOAT,
    long_friction_sensitivity FLOAT,
    lat_friction_coef FLOAT,
    lat_friction_load_rating FLOAT,
    lat_friction_sensitivity FLOAT,
    front_cornering_stiffness FLOAT,
    rear_cornering_stiffness FLOAT,
    power_factor_mult FLOAT,
    thermal_eff FLOAT,
    fuel_lower_heating_value FLOAT,
    drive_type VARCHAR(256),
    gear_shift_time FLOAT,
    primary_gear_eff FLOAT,
    final_gear_eff FLOAT,
    gearbox_eff FLOAT,
    primary_gear_reduc FLOAT,
    final_gear_reduc FLOAT,
    first_gear_ratio FLOAT,
    second_gear_ratio FLOAT,
    third_gear_ratio FLOAT,
    fourth_gear_ratio FLOAT,
    fifth_gear_ratio FLOAT,
    sixth_gear_ratio FLOAT,
    seventh_gear_ratio FLOAT,
    eighth_gear_ratio FLOAT,
    ninth_gear_ratio FLOAT,
    tenth_gear_ratio FLOAT
);
