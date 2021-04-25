# Python file that downloads trails in Vermont as GeoJson data
# from the Vermont Open GeoData Portal: https://geodata.vermont.gov/

import requests
import json
import geopandas as gpd

def request_API_data(url, path):
# Downloads data as JSON files from the Vermont Geoportal REST API
    
    r = requests.get(url) # Make the request for trail data from VT Geoportal
    if not(r.raise_for_status()):
        
        data = r.json() # Create the json object

        with open(path,'w') as jsonFile: # Write the object to file.
            json.dump(data, jsonFile)
    else:
        print("An error occurred while trying to retrieve hydrant data")


def json_to_geojson(json_file_path, out_path):

    gdf = gpd.read_file(json_file_path)
    gdf.to_file(out_path, driver = "GeoJSON")
    return gdf


def fetch_green_mt_trails():
    # Returns a GeoJson file of trails
    green_mountain_trails_url = "https://opendata.arcgis.com/datasets/d64e921c74db49f589e14b24d9bd779a_12.geojson"
    trails_json_path = "trails.json"
    trails_geojson_path = "trails.geojson"

    request_API_data(green_mountain_trails_url, trails_json_path)
    json_to_geojson(trails_json_path, trails_geojson_path)
    print("Outputting {0} file!".format(trails_geojson_path))
    return trails_geojson_path

def fetch_e911_trails():
    # Returns a GeoJson file of trails from the Vermont E911 dataset
    e911_trails_url = "https://opendata.arcgis.com/datasets/df69f82eb91e492d89223ae50d2f89b5_21.geojson"
    e911_json_path = "e911_trails.json"
    e911_geojson_path = "e911_trails.geojson"

    request_API_data(e911_trails_url, e911_json_path)
    json_to_geojson(e911_json_path, e911_geojson_path)
    print("Outputting {0} file!".format(e911_geojson_path))
    return 

def fetch_counties():
    # Returns a GeoJson file of Vermont counties
    # This will be used to extract the Addison County polygon
    counties_url = "https://opendata.arcgis.com/datasets/2f289dbae90347c58cd1765db84bd09e_29.geojson"
    counties_json_path = "counties.json"
    counties_geojson_path = "counties.geojson"

    request_API_data(counties_url, counties_json_path)
    json_to_geojson(counties_json_path, counties_geojson_path)
    print("Outputting {0} file!".format(counties_geojson_path))
    return counties_geojson_path


def filter_addison_poly(counties_path, out_path):
    gdf = gpd.read_file(counties_path)
    addison_poly = gdf.loc[gdf["CNTYNAME"] == "ADDISON", ["CNTYNAME", "geometry"]]
    addison_poly.to_file(out_path, driver = "GeoJSON")
    print("Outputting Addison county polygon as a geojson...")
    return out_path


if __name__ == "__main__":
    fetch_green_mt_trails() # Download VT Green Mountain trail data
    fetch_e911_trails()     # Download E911 Vermont trail data
    counties_path = fetch_counties()
    filter_addison_poly(counties_path, "addison.geojson") # Fetch Addison county