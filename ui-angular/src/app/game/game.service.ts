import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { ServerMessages, GamePayload, GameLocation, ILocation } from 'shared'
import { Socket } from 'ngx-socket-io'
import { Observable, Subject, Subscription, filter, map, take } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

@Injectable()
export class GameService implements OnDestroy {
    public connected$: Subject<boolean> = new Subject()

    public locations: ILocation[] = []

    public maxScorePerRound!: number

    constructor(
        private socketIO: Socket,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        // console.log(ClientMessages.StartGame)
    }

    ngOnDestroy(): void {
        this.socketIO.removeAllListeners()
    }

    public getGameStep(step: number): ILocation | null {
        if (step < 0 || step > this.locations.length) {
            return null
        }

        return this.locations[step]
    }

    public setupConnectedObservable() {
        this.socketIO.on(ServerMessages.StartedGame, () => {
            this.connected$.next(true)
        })

        this.socketIO.on(ServerMessages.Disconnect, () => {
            this.connected$.next(false)
        })

        this.socketIO.on(ServerMessages.ConnectError, () => {
            this.connected$.next(false)
        })
    }

    public resetGame() {
        this.connected$.pipe(take(1)).subscribe((connected) => {
            if (connected) {
                this.socketIO.disconnect()
            }
        })
    }

    public startGame(onSettled: () => void) {
        this.setupConnectedObservable()
        this.socketIO.once(ServerMessages.StartedGame, (data: GamePayload) => {
            console.log(data)

            // receive game data
            this.locations = data.locations.map((id) => ({ id }))
            this.maxScorePerRound = data.maxScorePerRound

            // redirect to the first location page
            onSettled()
            this.connected$.next(true)
            this.router.navigate(['location', 0])
        })
        this.socketIO.once(ServerMessages.Disconnect, onSettled)

        this.socketIO.once(ServerMessages.ConnectError, onSettled)

        this.socketIO.connect()
    }
}
