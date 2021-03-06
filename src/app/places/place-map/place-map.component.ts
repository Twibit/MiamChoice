import { Component, OnChanges, ViewChild, Input } from '@angular/core';

import { Place } from '../shared/place.model';

@Component({
	selector: 'app-place-map',
	templateUrl: './place-map.component.html',
	styleUrls: ['./place-map.component.scss']
})

export class PlaceMapComponent implements OnChanges {
	@ViewChild('map') mapElement;

	@Input() allPlaces: Place[] = [];
	@Input() displayedPlaces: Place[] = [];

	googleMap: any;

	ngOnChanges() {
		this.renderGoogleMap();
	}

	renderGoogleMap() {
		if(!this.googleMap) {
			this.googleMap = new google.maps.Map(this.mapElement.nativeElement, {
				center: {lat: 48.114966, lng: -1.617723},
				zoom: 13,
				minZoom: 12,
				maxZoom: 18
			});
		}

		let bounds = new google.maps.LatLngBounds();
		for(let place of this.allPlaces) {
			if(this.displayedPlaces.contains(place)) {
				if(place.marker.getMap() !== this.googleMap) {
					place.marker.setMap(this.googleMap);
				}
				bounds.extend(place.marker.getPosition());
			}
			else {
				place.marker.setMap(null);
			}
		}
		if(!this.displayedPlaces.isEmpty()) {
			this.googleMap.fitBounds(bounds);
		}
	}
}
