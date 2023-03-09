import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core'
import {
    Map as LMap,
    MapOptions,
    CRS,
    imageOverlay,
    latLng,
    LatLngBoundsExpression,
    LeafletMouseEvent,
    Marker,
    control,
} from 'leaflet'
import { LatLng } from 'shared'

@Component({
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() public actualLatLng: LatLng | undefined = undefined
    @Output() public makeGuess = new EventEmitter<LatLng>()

    @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>
    public resizeObserver!: ResizeObserver

    public height: number = 0

    public readonly bounds: LatLngBoundsExpression = [
        [0, 0],
        [1000, 1000],
    ]

    ngOnChanges(changes: SimpleChanges): void {
        const actualLatLngChanges = changes['actualLatLng']

        if (!actualLatLngChanges.currentValue) {
            this.guessMarker?.removeFrom(this.map)
        }

        if (actualLatLngChanges.currentValue) {
            if (this.actualMarker) {
                this.actualMarker.setLatLng(actualLatLngChanges.currentValue)
            } else {
                this.actualMarker = new Marker(
                    actualLatLngChanges.currentValue,
                    {
                        opacity: 0.5,
                    },
                ).addTo(this.map)
            }
        } else {
            this.actualMarker?.removeFrom(this.map)
        }
    }

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
        zoomControl: false,
    }

    public map!: LMap
    public guessMarker: Marker | null = null
    public actualMarker: Marker | null = null

    public onMapReady(map: LMap) {
        this.map = map
        this.guessMarker = null
        this.actualMarker = null

        this.map.fitBounds(this.bounds)
        this.map.setZoom(0.5)
        control.zoom({ position: 'bottomright' }).addTo(this.map)
    }

    public clicked(event: LeafletMouseEvent) {
        if (this.actualLatLng) {
            return
        }

        this.makeGuess.emit(event.latlng)
        if (this.guessMarker) {
            this.guessMarker.setLatLng(event.latlng)
        } else {
            this.guessMarker = new Marker(event.latlng).addTo(this.map)
        }
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
