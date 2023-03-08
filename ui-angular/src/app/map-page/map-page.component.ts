import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core'
import {
    Map as LMap,
    MapOptions,
    CRS,
    imageOverlay,
    latLng,
    LatLngBoundsExpression,
} from 'leaflet'

@Component({
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements AfterViewInit, OnDestroy {
    @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>
    public resizeObserver!: ResizeObserver

    public height: number = 0

    public readonly bounds: LatLngBoundsExpression = [
        [0, 0],
        [1000, 1000],
    ]

    public options: MapOptions = {
        layers: [
            imageOverlay('../assets/map.png', this.bounds, {
                attribution:
                    '<a href="https://mapgenie.io/grand-theft-auto-vice-city/maps/vice-city">mapgenie.io</a>',
            }),
        ],
        zoom: 0,
        center: latLng(46.879966, -121.726909),
        crs: CRS.Simple,
        minZoom: 0,
        maxZoom: 5,
        maxBoundsViscosity: 0.8,
        maxBounds: this.bounds,
    }

    public map!: LMap

    public onMapReady(map: LMap) {
        this.map = map

        this.map.fitBounds(this.bounds)
    }

    public clicked(event: any) {
        console.log(event)
    }

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.height = entry.contentRect.height
                this.cdr.detectChanges()
            }
        })

        this.resizeObserver.observe(this.containerRef.nativeElement)
    }

    ngOnDestroy(): void {
        this.resizeObserver.unobserve(this.containerRef.nativeElement)
    }
}
