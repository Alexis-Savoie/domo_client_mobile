import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SignInPage } from '../sign-in/sign-in.page';
import { AuthService } from 'src/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.page.html',
  styleUrls: ['./set-profile.page.scss'],
})
export class SetProfilePage implements OnInit {
  name: string = "";
  firstname: string = "";
  mail: string = "";
  phone: string = "";
  password: string = "";

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.name = "Jean"
    this.firstname = "Aimar"
    this.mail = "jean.aimar@bonjour.com"
    this.phone = "0761134181"
    this.password = "bonjour"
  }

  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  }

  register(form: NgForm) {
    this.authService.register(this.name, this.firstname, this.mail, this.phone, this.password)
  }
}
