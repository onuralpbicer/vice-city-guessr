import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LocationPageRoutingModule } from './location-page-routing.module'
import { LocationPageComponent } from './location-page.component'
import { MapPageModule } from '../map-page/map-page.module'

@NgModule({
    declarations: [LocationPageComponent],
    imports: [CommonModule, LocationPageRoutingModule, MapPageModule],
})
export class LocationPageModule {}
