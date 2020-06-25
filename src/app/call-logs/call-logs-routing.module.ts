import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallLogsPage } from './call-logs.page';

const routes: Routes = [
  {
    path: '',
    component: CallLogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallLogsPageRoutingModule {}
