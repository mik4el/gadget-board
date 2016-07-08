import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Subscription }   from 'rxjs/Subscription';

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

export class GadgetDetailComponent implements OnInit, OnDestroy {

    errorMessages: any[];
    gadget: Gadget;
    gadgetData: GadgetData[];
    gadgetDataSubscription: Subscription;

    constructor(
        private gadgetService: GadgetService,
        private routeParams: RouteParams)
    {}

    ngOnInit() {
        // Get gadget
        this.updateDataForGadget(this.routeParams.get('gadget_slug'));
    }

    updateDataForGadget(slug: string) {
        this.getGadget(slug);
        this.getGadgetData(slug);
    }
    
    getGadget(slug: string) {
        this.gadgetService.getGadget(slug)
            .subscribe(
                gadget => this.gadget = gadget,
                errors => this.errorMessages = <any[]>errors);
    }

    getGadgetData(slug: string) {
        this.gadgetService.getGadgetDataForGadget(slug, 1)
            .subscribe(
                gadgetData => { if (gadgetData.length>0) this.gadgetData = gadgetData; },
                errors => this.errorMessages = <any[]>errors);
        this.gadgetDataSubscription = this.gadgetService.pollGadgetDataForGadget(slug, 1)
            .subscribe(
                gadgetData => { if (gadgetData.length>0) this.gadgetData = gadgetData; });
    }

    ngOnDestroy() {
        this.gadgetDataSubscription.unsubscribe();
    }



}