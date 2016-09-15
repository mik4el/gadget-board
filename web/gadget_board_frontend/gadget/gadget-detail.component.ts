import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { Gadget } from './gadget';
import { GadgetData } from './gadget-data';
import { GadgetService } from './gadget.service';
import { GadgetSwimThermoComponent } from './gadget-swim-thermo.component';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 
declare var analytics: any;

@Component({
    selector: 'gadget-detail',
    moduleId: __moduleName,
    templateUrl: './gadget-detail.component.html',
})

export class GadgetDetailComponent implements OnInit, OnDestroy {

    errorMessages: any[];
    gadget: Gadget;
    gadgetDatum: GadgetData;
    gadgetDataSubscription: Subscription;
    fullscreenMode: boolean;

    constructor(
        private gadgetService: GadgetService,
        private route: ActivatedRoute
    ) 
    {}

    ngOnInit() {
        this.route.params.subscribe( params => {
            if (params['gadget_slug']) {
                this.updateDataForGadget(params['gadget_slug']);
            }
            if (params['mode']=='fullscreen') {
                this.fullscreenMode = true;
            } else {
                this.fullscreenMode = false;            
            }
        });
        throw new Error("Raven error test");
    }

    updateDataForGadget(slug: string) {
        this.getGadget(slug);
        this.getGadgetData(slug);
        analytics.track('Showing gadget detail component', {
            gadget_detail_component_for: slug
       });
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
                gadgetData => { if (gadgetData.length>0) this.gadgetDatum = gadgetData[0]; },
                errors => this.errorMessages = <any[]>errors);
        this.gadgetDataSubscription = this.gadgetService.pollGadgetDataForGadget(slug, 1)
            .subscribe(
                gadgetData => { if (gadgetData.length>0) this.gadgetDatum = gadgetData[0]; });
    }

    ngOnDestroy() {
        this.gadgetDataSubscription.unsubscribe();
    }



}