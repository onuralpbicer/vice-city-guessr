import { Component, Input } from '@angular/core'
import { LatLng } from 'shared'

@Component({
    selector: 'app-location-modal',
    templateUrl: './location-modal.component.html',
    styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent {
    @Input() public id!: string
    @Input() public guess!: LatLng | null

    get imageSrc() {
        return `http://localhost:3000/assets/${this.id}.png`
    }
}
