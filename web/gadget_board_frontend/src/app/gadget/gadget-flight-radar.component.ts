import { Component, Input } from '@angular/core';
import { GadgetData } from './gadget-data';

@Component({
    selector: 'gadget-flight-radar',
    templateUrl: './gadget-flight-radar.component.html',
})

export class GadgetFlightRadarComponent {
    @Input() gadgetDatum: GadgetData;
    private flightRadarLat = 59.3147788;
    private flightRadarLon = 17.9863169;

    distanceFromFlightRadar(lon, lat) {
      var R = 6371; // Earth radius
      var dLat = (this.flightRadarLat - lat) * Math.PI / 180;  // deg2rad below
      var dLon = (this.flightRadarLon - lon) * Math.PI / 180;
      var a =
         0.5 - Math.cos(dLat)/2 +
         Math.cos(lat * Math.PI / 180) * Math.cos(this.flightRadarLat * Math.PI / 180) *
         (1 - Math.cos(dLon))/2;
      return R * 2 * Math.asin(Math.sqrt(a));
    }

    bearingToFlightRadar(lon, lat) {
        var φ1 = this.flightRadarLat * Math.PI / 180;
        var φ2 = lat * Math.PI / 180;
        var Δλ = (lon-this.flightRadarLon) * Math.PI / 180;

        var y = Math.sin(Δλ) * Math.cos(φ2);
        var x = Math.cos(φ1)*Math.sin(φ2) -
                Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ);
        var θ = Math.atan2(y, x);

        return (θ * 180 / Math.PI + 360) % 360;
    }

}