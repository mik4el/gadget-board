import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/Rx";
import { Observable } from "rxjs/Observable";

import { GadgetData } from './gadget-data';

const windowSize$ = new BehaviorSubject(getWindowSize());

function getWindowSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth
  };
}

@Component({
    selector: 'gadget-swim-thermo',
    templateUrl: './gadget-swim-thermo.component.html',
})

export class GadgetSwimThermoComponent implements OnInit {
    @Input() gadgetDatum: GadgetData;
    @Input() gadgetSlug: string;
    @Input() fullscreenMode: boolean;

	constructor(
        private router: Router)
    {}

    resizeComponents(windowSize: any) {

    	const magic_margin = 15;
		var element_outer = document.getElementById("gadget-swim-thermo")
    	var rect_outer = element_outer.getBoundingClientRect();
  		
  		var element_label_main = document.getElementById("gadget-swim-thermo-label-main");
  		var element_label_sub = document.getElementById("gadget-swim-thermo-label-sub");
    	//var element_button_close = document.getElementById("gadget-swim-thermo-button-close");

    	if (this.fullscreenMode) {
    		// resize and position outer for fullscreen mode
    		element_outer.style.height = "100%";
    		element_outer.style.width = "100%";
			element_outer.style.position = "fixed";
			element_outer.style.zIndex = "1";
			element_outer.style.top = "0px";
    		element_outer.style.left = "0px";
    		//element_button_close.innerHTML = "&#8690;";
    	} else {
    		// resize and position for normal mode
    		element_outer.style.position = "relative";
    		rect_outer = element_outer.getBoundingClientRect();
    		element_outer.style.height = windowSize.height - rect_outer.top - magic_margin + "px";
    		element_outer.style.width = windowSize.width - 2*magic_margin + "px";
    		//element_button_close.innerHTML = "&#8689;";
    	}
    	
  		// resize fonts
  		rect_outer = element_outer.getBoundingClientRect();
    	
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
  	  	element_label_main.style.top = Math.round((rect_outer.height)/2-font_h)+"px";
  		
    }

    toggleFullscreen() {
    	if (this.fullscreenMode) {
	        this.router.navigate(['/gadgets', this.gadgetSlug]);    		
    	} else {
	        this.router.navigate(['/gadgets', this.gadgetSlug, "fullscreen"]);    		
    	}
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