import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Gadget } from './gadget';
import { GadgetData } from './gadget-data';
import { GadgetService } from './gadget.service';
import { GadgetSwimThermoComponent } from './gadget-swim-thermo.component';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'gadget-detail',
    moduleId: __moduleName,
    directives: [GadgetSwimThermoComponent],
    templateUrl: './gadget-detail.component.html',
})

export class GadgetDetailComponent implements OnInit {

    errorMessages: any[];
    gadget: Gadget;
    gadgetData: GadgetData[];

    constructor(
        private gadgetService: GadgetService,
        private routeParams: RouteParams)
    {}

    ngOnInit() {
        // Get gadget
        this.updateDataForGadget(+this.routeParams.get('gadget_id'));
    }

    updateDataForGadget(id: number) {
        this.getGadget(id);
        this.getGadgetData(id);
    }
    
    getGadget(id: number) {
        this.gadgetService.getGadget(id)
            .subscribe(
                gadget => this.gadget = gadget,
                errors => this.errorMessages = <any[]>errors);
    }

    getGadgetData(id: number) {
        this.gadgetService.getGadgetDataForGadget(id)
            .subscribe(
                gadgetData => { if (gadgetData.length>0) this.gadgetData = gadgetData; },
                errors => this.errorMessages = <any[]>errors);
    }


}