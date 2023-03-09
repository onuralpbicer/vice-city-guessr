import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, filter, map } from 'rxjs'
import { GameService } from '../game/game.service'
import { ILocation } from 'shared'

@Component({
    selector: 'app-location-page',
    templateUrl: './location-page.component.html',
    styleUrls: ['./location-page.component.scss'],
})
export class LocationPageComponent implements OnInit {
    public currentStep: ILocation | null = null
    public index: number = 0

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((params) => params['step']),
                filter((id) => id),
                map((id) => Number(id)),
            )
            .subscribe((step) => {
                this.currentStep = this.gameService.getGameStep(step)
                this.index = step
            })
    }
}
