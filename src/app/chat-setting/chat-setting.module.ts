import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { ChatSettingPageRoutingModule } from './chat-setting-routing.module';

import { ChatSettingPage } from './chat-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,   
    ChatSettingPageRoutingModule
  ],
  declarations: [ChatSettingPage]
})
export class ChatSettingPageModule {}
