import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_cors import CORS
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///ath.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
#print (Base.classes)
# Save reference to the table
#ref = Base.classes.ath1
ref2 = Base.classes.avgIncome

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app, supports_credentials=True)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/data",
		f"/api/v1.0/avgsal"
		
    )



@app.route("/api/v1.0/data")	
def data():
	session = Session(engine)
	results = session.query(ref.name, ref.nationality, ref.sport, ref.year, ref.earnings_million, ref.country, ref.latitude, ref.longitude).all()
	session.close()
	
	all_athletes = []
	for name, nationality, sport, year, earnings_million, country, latitude, longitude in results:
		athlete_dict = {}
		athlete_dict["name"] = name
		athlete_dict["nationality"] = nationality
		athlete_dict["sport"] = sport
		athlete_dict["year"] = year
		athlete_dict["earnings_million"] = earnings_million
		athlete_dict["country"] = country
		athlete_dict["latitude"] = latitude
		athlete_dict["longitude"] = longitude
		all_athletes.append(athlete_dict)
	return jsonify(all_athletes)
	
@app.route("/api/v1.0/avgsal")	
def avg():
	session = Session(engine)
	results = session.query(ref2.nationality, ref2.avgEarnings, ref2.latitude, ref2.longitude).all()
	session.close()
	
	avg_sal_country = []
	for nationality, avgEarnings, latitude, longitude in results:
		country_dict = {}
		country_dict["nationality"] = nationality
		country_dict["Average_Earnings"] = avgEarnings
		country_dict["latitude"] = latitude 
		country_dict["longitude"] = longitude
		avg_sal_country.append(country_dict)
	return jsonify(avg_sal_country)



if __name__ == '__main__':
    app.run(debug=True)
