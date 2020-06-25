import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoicecallPageRoutingModule } from './voicecall-routing.module';

import { VoicecallPage } from './voicecall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoicecallPageRoutingModule
  ],
  declarations: [VoicecallPage]
})
export class VoicecallPageModule {}
