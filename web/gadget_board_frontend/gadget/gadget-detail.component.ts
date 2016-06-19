import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Gadget } from './gadget';
import { GadgetService } from './gadget.service';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'gadget-detail',
    moduleId: __moduleName,
    templateUrl: './gadget-detail.component.html',
})

export class GadgetDetailComponent implements OnInit {

    errorMessages: any[];
    gadget: Gadget;
    
    constructor(
        private gadgetService: GadgetService,
        private routeParams: RouteParams)
    {}

    ngOnInit() {
        // Get gadget
        this.getGadget(+this.routeParams.get('gadget_id'));
    }
    
    getGadget(id: number) {
        this.gadgetService.getGadget(id)
            .subscribe(
                gadget => this.gadget = gadget,
                errors => this.errorMessages = <any[]>errors);
    }

}