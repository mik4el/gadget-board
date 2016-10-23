import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-pi-tower-lamp',
    templateUrl: './gadget-pi-tower-lamp.component.html',
})

export class GadgetPiTowerLampComponent {
    @Input() gadgetDatum: GadgetData;
}