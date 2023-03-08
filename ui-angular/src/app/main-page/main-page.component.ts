import { Component, OnInit } from '@angular/core'
import { GameService } from '../game/game.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    public startingGame = false

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        this.gameService.resetGame()
    }

    public startGame() {
        this.startingGame = true

        this.gameService.startGame(() => {
            this.startingGame = false
        })
    }
}
