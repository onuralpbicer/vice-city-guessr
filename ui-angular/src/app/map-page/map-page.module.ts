import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MapPageComponent } from './map-page.component'
import { MapPageRoutingModule } from './map-page-routing.module'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

@NgModule({
    declarations: [MapPageComponent],
    imports: [CommonModule, MapPageRoutingModule, LeafletModule],
})
export class MapPageModule {}
