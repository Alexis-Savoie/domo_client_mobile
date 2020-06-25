import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetProfilePage } from './set-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SetProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetProfilePageRoutingModule {}
