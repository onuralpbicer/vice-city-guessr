import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IdModule } from './id/id.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, IdModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
