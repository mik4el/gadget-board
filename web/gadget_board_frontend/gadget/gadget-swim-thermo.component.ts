import { Component, Input } from '@angular/core';

import { GadgetData } from './gadget-data';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'gadget-swim-thermo',
    moduleId: __moduleName,
    templateUrl: './gadget-swim-thermo.component.html',
})

export class GadgetSwimThermoComponent {

    @Input() gadgetDatum: GadgetData;

}