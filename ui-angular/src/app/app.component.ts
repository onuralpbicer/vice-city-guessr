import { Component, OnInit } from '@angular/core'
import { IdService } from './id/id.service'
import { GameService } from './game/game.service'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private idService: IdService,
        private gameService: GameService,
    ) {}

    ngOnInit(): void {
        this.idService.createUserIDIfNotExists()
    }
}
