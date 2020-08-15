import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }


  changePassword() {
    this.route.navigate(['./change-password']);
  }

}
