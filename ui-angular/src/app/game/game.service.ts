import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { ServerMessages } from 'shared'
import { Socket } from 'ngx-socket-io'
import { Observable, Subject, Subscription, take } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class GameService implements OnDestroy {
    public connected$: Subject<boolean> = new Subject()

    constructor(private socketIO: Socket, private router: Router) {
        // console.log(ClientMessages.StartGame)
    }

    ngOnDestroy(): void {
        this.socketIO.removeAllListeners()
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
        this.socketIO.once(ServerMessages.StartedGame, () => {
            // receive game data
            // redirect to the first location page

            onSettled()
        })
        this.socketIO.once(ServerMessages.Disconnect, onSettled)

        this.socketIO.once(ServerMessages.ConnectError, onSettled)

        this.socketIO.connect()
    }
}
