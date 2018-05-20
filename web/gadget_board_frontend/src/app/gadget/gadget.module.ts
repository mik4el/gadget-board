import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GadgetService } from './gadget.service';
import { GadgetListComponent } from './gadget-list.component';
import { GadgetDetailComponent } from './gadget-detail.component';
import { GadgetSwimThermoComponent } from './gadget-swim-thermo.component';
import { GadgetFlightRadarComponent } from './gadget-flight-radar.component';
import { GadgetImStillHereComponent } from './gadget-im-still-here.component';
import { GadgetPiTowerLampComponent } from './gadget-pi-tower-lamp.component';
import { routing } from './gadget.routing';

@NgModule({
  imports:      [ CommonModule, HttpClientModule, routing ],
  declarations: [
    GadgetListComponent,
    GadgetDetailComponent,
    GadgetSwimThermoComponent,
    GadgetFlightRadarComponent,
    GadgetImStillHereComponent,
    GadgetPiTowerLampComponent,
  ],
  providers:    [ GadgetService ]
})
export class GadgetModule { }