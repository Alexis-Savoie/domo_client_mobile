import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SetProfilePage } from '../set-profile/set-profile.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { AlertService } from 'src/services/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],

})


export class SignInPage implements OnInit {
  phone: string = "";
  password: string = "";
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private route: Router,
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.storage.getItem('user')
    .then(
      data => {
        if(data.id_user)
        {
          //console.log("hello login : " + data.id_user)
          this.navCtrl.navigateRoot(['./tabs']);
        }
        else 
        {
          this.storage.remove('user')
        }
          
      }, error => {
        this.storage.remove('user')
      }
    );


    this.authService.isLoggedIn = false;

    this.phone = "0761134172"
    this.password = "bonjour"

  }


  goRegister() {
    this.route.navigate(['./register']);
  }

  login(form: NgForm) {
    this.authService.login(this.phone, this.password)
  }

  testroute() {
    this.route.navigate(['./tabs']);
  }

}