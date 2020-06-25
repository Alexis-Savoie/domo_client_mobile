import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.page.html',
  styleUrls: ['./call-logs.page.scss'],
})
export class CallLogsPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  profileinfo() {
    this.route.navigate(['./profile-info']);
  }

}
