import { Component } from '@angular/core'
import {
    Map as LMap,
    MapOptions,
    CRS,
    imageOverlay,
    latLng,
    LatLngBoundsExpression,
} from 'leaflet'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public readonly bounds: LatLngBoundsExpression = [
        [0, 0],
        [1000, 1000],
    ]

    public options: MapOptions = {
        layers: [
            imageOverlay('../assets/map.png', this.bounds, {
                attribution:
                    '<a href="https://mapgenie.io/grand-theft-auto-vice-city/maps/vice-city">mapgenie.io</a>',
            }),
        ],
        zoom: 0,
        center: latLng(46.879966, -121.726909),
        crs: CRS.Simple,
        minZoom: 0,
        maxZoom: 5,
        maxBoundsViscosity: 0.8,
        maxBounds: this.bounds,
    }

    public map!: LMap

    constructor() {}

    public onMapReady(map: LMap) {
        this.map = map

        this.map.fitBounds(this.bounds)
    }

    public clicked(event: any) {
        console.log(event)
    }
}
