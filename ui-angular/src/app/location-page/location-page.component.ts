import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, filter, map } from 'rxjs'
import { GameService } from '../game/game.service'
import { ILocation, LatLng } from 'shared'

function isNil(input: any) {
    return input === undefined || input === null
}

@Component({
    selector: 'app-location-page',
    templateUrl: './location-page.component.html',
    styleUrls: ['./location-page.component.scss'],
})
export class LocationPageComponent implements OnInit {
    public currentStep: ILocation | null = null
    public index: number = 0

    public guess!: LatLng | null

    constructor(
        private activatedRoute: ActivatedRoute,
        private gameService: GameService,
        private router: Router,
    ) {}

    guessAttempt(guess: LatLng): void {
        this.guess = guess
    }

    submitGuess() {
        if (!this.guess) return

        this.gameService.listenForGuessResult((location) => {
            this.currentStep = location
            this.guess = null
        })
        this.gameService.makeGuess(this.index, this.guess)
    }

    nextStep() {
        if (this.index === this.gameService.locations.length - 1) {
            this.router.navigateByUrl('/')
        } else {
            this.router.navigate(['location', this.index + 1])
        }
    }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((params) => params['step']),
                filter((id) => id),
                map((id) => Number(id)),
            )
            .subscribe((step) => {
                const currentStep = this.gameService.getGameStep(step)
                if (isNil(currentStep)) {
                    this.router.navigateByUrl('/')
                    return
                }
                this.currentStep = currentStep
                this.index = step
            })
    }
}
