import osmnx as ox
import geopandas as gpd

ox.config(log_console=False, use_cache=True)

# Returns a Graph of edges & nodes within the bounding_zone polygon geometry
def make_graph(bounding_zone):

    G = ox.graph_from_polygon(bounding_zone, network_type='walk')

    # Project the graph from lat-long to the UTM zone appropriate for its geographic location.
    G = ox.project_graph(G)

    hwy_speeds = {"residential": 40, 
            "unclassified": 40,
            "tertiary": 56, 
            "secondary": 56, 
            "primary": 80, 
            "trunk": 56
            }

    G = ox.add_edge_speeds(G, hwy_speeds)
    G = ox.add_edge_travel_times(G)

    return G


if __name__ == "__main__":
    addison_poly = gpd.read_file("addison.geojson")["geometry"].iloc[0]
    
    G = make_graph(addison_poly)

    edges = ox.graph_to_gdfs(G, nodes=False)
    print(type(edges))
    edges.to_file("edges.geojson", driver = "GeoJSON")