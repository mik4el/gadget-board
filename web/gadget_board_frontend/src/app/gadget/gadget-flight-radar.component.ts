import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-flight-radar',
    templateUrl: './gadget-flight-radar.component.html',
})

export class GadgetFlightRadarComponent {
    @Input() gadgetDatum: GadgetData;

    distanceFromFlightRadar(lon1, lat1) {
      var lat2 = 59.3147788;  // Flight radar position
      var lon2 = 17.9863169;
      var R = 6371; // Earth radius
      var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a =
         0.5 - Math.cos(dLat)/2 +
         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
         (1 - Math.cos(dLon))/2;
      return R * 2 * Math.asin(Math.sqrt(a));
    }

}