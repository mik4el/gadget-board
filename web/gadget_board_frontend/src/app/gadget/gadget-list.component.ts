import {
    Component,
    OnInit,
    HostBinding,
    trigger,
    transition,
    animate,
    style,
    state } from '@angular/core';

import { Router } from '@angular/router';

import { Gadget } from './gadget';
import { GadgetService } from './gadget.service';

declare var analytics:any;

@Component({
    selector: 'gadget-list',
    templateUrl: './gadget-list.component.html',
    styleUrls: ['./gadget-list.component.css'],
    animations: [
        trigger('routeAnimation', [
            state('*',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(100%)'
                }))
            ])
        ])
    ]
})

export class GadgetListComponent implements OnInit {

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

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