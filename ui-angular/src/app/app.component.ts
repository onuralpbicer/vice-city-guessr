import { Component } from '@angular/core'
import { tileLayer, latLng } from 'leaflet'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ui-angular'

    options = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '...',
            }),
        ],
        zoom: 5,
        center: latLng(46.879966, -121.726909),
    }
}
