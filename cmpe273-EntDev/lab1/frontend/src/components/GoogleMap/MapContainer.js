import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';

class MapContainer extends Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    render() {
        console.log(this.state);
        console.log(this.props);

        var restaurants = this.props.restaurants;
        var markersVar = null;
        
        if (restaurants != null && restaurants.length > 0 ) {
            markersVar = (
                restaurants.map(restaurant => {
                    return <Marker
                        name={restaurant.name}
                        onClick={this.onMarkerClick}
                        position={{ lng: restaurant.res_long, lat: restaurant.res_lat }}
                    />
                })
                )
        }

        const icon = { url: require("./map-marker.png"), scaledSize: { width: 32, height: 32 } };
        return (
            <Map
                className="map"
                google={this.props.google}
                onClick={this.onMapClicked}
                initialCenter={this.props.initialCenter}
                style={{ height: "100%", position: "relative", width: "100%" }}
                zoom={11}
            >
                {markersVar}

                <Marker
                    name="YOUR LOCATION"
                    onClick={this.onMarkerClick}
                    icon={{ url: require("./map-marker.png"), scaledSize: { width: 32, height: 32 } }}
                    />

                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        {this.state.selectedPlace.name}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        google: state.google
    }
};

export default connect(mapStateToProps, null)(MapContainer);