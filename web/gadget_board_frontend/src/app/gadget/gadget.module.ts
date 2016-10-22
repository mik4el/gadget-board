import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { HttpModule } from '@angular/http';

import { GadgetService } from './gadget.service';
import { GadgetListComponent } from './gadget-list.component';
import { GadgetDetailComponent } from './gadget-detail.component';
import { GadgetSwimThermoComponent } from './gadget-swim-thermo.component';
import { GadgetFlightRadarComponent } from './gadget-flight-radar.component';
import { GadgetImStillHereComponent } from './gadget-im-still-here.component';
import { routing } from './gadget.routing';

@NgModule({
  imports:      [ CommonModule, HttpModule, routing ],
  declarations: [
    GadgetListComponent,
    GadgetDetailComponent,
    GadgetSwimThermoComponent,
    GadgetFlightRadarComponent,
    GadgetImStillHereComponent,
  ],
  providers:    [ GadgetService ]
})
export class GadgetModule { }