import { Component } from '@angular/core'
import { Socket } from 'ngx-socket-io'
import { ClientMessages } from 'shared/src'

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
    constructor(private socketIO: Socket) {}

    public startGame() {
        this.socketIO.emit(ClientMessages.StartGame)
    }
}
