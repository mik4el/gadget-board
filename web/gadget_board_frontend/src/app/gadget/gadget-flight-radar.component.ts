import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-flight-radar',
    templateUrl: './gadget-flight-radar.component.html',
})

export class GadgetFlightRadarComponent {
    @Input() gadgetDatum: GadgetData;
}