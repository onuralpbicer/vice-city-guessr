import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IdModule } from './id/id.module'
import { GameModule } from './game/game.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, IdModule, GameModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
