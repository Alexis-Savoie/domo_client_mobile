import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
 
import { CallLogsPageRoutingModule } from './call-logs-routing.module';

import { CallLogsPage } from './call-logs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
	TranslateModule,  
    CallLogsPageRoutingModule
  ],
  declarations: [CallLogsPage]
})
export class CallLogsPageModule {} 
