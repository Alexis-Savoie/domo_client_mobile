import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumPayPageRoutingModule } from './premium-pay-routing.module';

import { PremiumPayPage } from './premium-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumPayPageRoutingModule
  ],
  declarations: [PremiumPayPage]
})
export class PremiumPayPageModule {}
