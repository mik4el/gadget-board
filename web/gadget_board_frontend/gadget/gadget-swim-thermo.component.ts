import { Component, Input, OnInit } from '@angular/core';

import { GadgetData } from './gadget-data';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

const windowSize$ = new BehaviorSubject(getWindowSize());

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
}

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'gadget-swim-thermo',
    moduleId: __moduleName,
    templateUrl: './gadget-swim-thermo.component.html',
})

export class GadgetSwimThermoComponent implements OnInit {
	@Input() gadgetDatum: GadgetData;
    
    resizeComponent(windowSize: any) {	
    	var element = document.getElementById("gadget-swim-thermo")
    	var rect = element.getBoundingClientRect();
  		element.style.height = windowSize.height - rect.top - 15 + "px";
    }

	ngOnInit() {
	    Observable.fromEvent(window, 'resize')
	    	.map(getWindowSize)
	     	.subscribe(windowSize => this.resizeComponent(windowSize));

     	// Hack to make sure resizeComponent is run once.
     	setTimeout(() => {
            this.resizeComponent(getWindowSize());
        }, 0);
	}

}