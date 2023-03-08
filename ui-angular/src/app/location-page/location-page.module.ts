import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocationPageRoutingModule } from './location-page-routing.module'
import { LocationPageComponent } from './location-page.component'

@NgModule({
    declarations: [LocationPageComponent],
    imports: [CommonModule, LocationPageRoutingModule],
})
export class LocationPageModule {}
