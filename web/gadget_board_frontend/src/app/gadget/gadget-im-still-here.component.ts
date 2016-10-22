import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-im-still-here',
    templateUrl: './gadget-im-still-here.component.html',
})

export class GadgetImStillHereComponent {
    @Input() gadgetDatum: GadgetData;
}