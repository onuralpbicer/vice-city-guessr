import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LatLng } from 'shared'
import { GameService } from 'src/app/game/game.service'

@Component({
    selector: 'app-location-modal',
    templateUrl: './location-modal.component.html',
    styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent {
    @Input() public id!: string
    @Input() public score!: number | undefined
    @Input() public guess!: LatLng | null
    @Input() public step!: number

    @Output() makeGuess = new EventEmitter()
    @Output() goNext = new EventEmitter()

    constructor(private gameService: GameService) {}

    get nextLinkText() {
        return this.step >= this.gameService.locations.length - 1
            ? 'Restart game'
            : 'Next Location'
    }

    get imageSrc() {
        return `http://localhost:3000/assets/${this.id}.png`
    }
}
