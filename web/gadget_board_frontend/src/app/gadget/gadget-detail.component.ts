import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit } from '@angular/core';
import {
    trigger,
    transition,
    animate,
    style,
    state } from '@angular/animations';
    
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';

import { Gadget } from './gadget';
import { GadgetData } from './gadget-data';
import { GadgetService } from './gadget.service';

declare var analytics: any;

@Component({
    selector: 'gadget-detail',
    templateUrl: './gadget-detail.component.html',
    styleUrls: ['./gadget-detail.component.css'],
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

export class GadgetDetailComponent implements OnInit, OnDestroy {

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