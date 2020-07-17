import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SetProfilePage } from '../set-profile/set-profile.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { AlertService } from 'src/services/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';




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
    private alertService: AlertService
  ) { }


  ngOnInit() {

    this.storage.getItem('user')
    .then(
      data => {
        if(data.id_user)
        {
          console.log("hello login : " + data.id_user)
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

    this.phone = "0761134170"
    this.password = "bonjour"

  }


  goRegister() {
    this.navCtrl.navigateRoot(['./register']);
  }

    login(form: NgForm) {
      this.authService.login(this.phone, this.password)
    }

}