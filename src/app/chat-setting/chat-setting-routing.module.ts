import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSettingPage } from './chat-setting.page';

const routes: Routes = [
  {
    path: '',
    component: ChatSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatSettingPageRoutingModule {}
