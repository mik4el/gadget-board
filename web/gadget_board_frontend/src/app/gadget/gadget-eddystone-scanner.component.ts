import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-eddystone-scanner',
    templateUrl: './gadget-eddystone-scanner.component.html',
})

export class GadgetEddystoneScannerComponent {
    @Input() gadgetDatum: GadgetData;
}