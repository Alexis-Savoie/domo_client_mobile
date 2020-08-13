import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremiumPayPage } from './premium-pay.page';

const routes: Routes = [
  {
    path: '',
    component: PremiumPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiumPayPageRoutingModule {}
