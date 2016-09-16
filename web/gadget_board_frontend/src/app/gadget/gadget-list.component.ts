import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Gadget } from './gadget';
import { GadgetService } from './gadget.service';

declare var analytics:any;

@Component({
    selector: 'gadget-list',
    templateUrl: './gadget-list.component.html',
})

export class GadgetListComponent implements OnInit {

    errorMessages: any[];
    gadgets: Gadget[];

    constructor(
        private gadgetService: GadgetService,
        private router: Router)
    {}

    ngOnInit() {
        this.getGadgets();
        analytics.track('Showing gadget list');
    }

    getGadgets() {
        this.gadgetService.getGadgets()
            .subscribe(
            gadgets => this.gadgets = gadgets,
            errors => this.errorMessages = <any[]>errors);
    }

    gotoGadgetDetail(gadget: Gadget) {
        this.router.navigate(['/gadgets', gadget.slug]);
    }

}