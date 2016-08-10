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
    
    resizeComponents(windowSize: any) {	
    	const magic_margin = 15;

    	// resize outer
    	var element_outer = document.getElementById("gadget-swim-thermo")
    	var rect_outer = element_outer.getBoundingClientRect();
  		element_outer.style.height = windowSize.height - rect_outer.top - magic_margin + "px";
  		
  		// resize fonts
  		rect_outer = element_outer.getBoundingClientRect();
    	
  		var element_label_main = document.getElementById("gadget-swim-thermo-label-main");
  		var element_label_sub = document.getElementById("gadget-swim-thermo-label-sub");
  		/*
  		font_w=3/5*font_h
  		w=font_w*7
  		3/5*font_h=w/7
  		font_h=5w/21
  		*/
  		var font_h = rect_outer.width*5/21;
  		// make sure font has a minima
  		if ((rect_outer.height/2-font_h)<0) {
  			font_h = rect_outer.height/2;
  		}
  		element_label_main.style.fontSize = Math.round(font_h)+"px";	
  	  	element_label_sub.style.fontSize = Math.round(font_h/5)+"px";

  	  	// reposition main label
  	  	var rect_label_sub = element_label_sub.getBoundingClientRect();
  	  	element_label_main.style.top = Math.round((rect_outer.height)/2-font_h)+"px";
  		
    }

	ngOnInit() {
	    Observable.fromEvent(window, 'resize')
	    	.map(getWindowSize)
	     	.subscribe(windowSize => this.resizeComponents(windowSize));

     	// Hack to make sure resizeComponent is run once.
     	setTimeout(() => {
            this.resizeComponents(getWindowSize());
        }, 0);
	}

}