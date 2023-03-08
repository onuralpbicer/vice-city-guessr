import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IdModule } from './id/id.module'

const socketIOConfig: SocketIoConfig = {
    url: 'http://localhost:3000',
    options: {},
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IdModule,
        SocketIoModule.forRoot(socketIOConfig),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
