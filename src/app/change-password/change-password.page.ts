
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/services/auth.service';
import { ConversationService } from 'src/services/conversation.service';
import { Contacts } from '@ionic-native/contacts/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertService } from 'src/services/alert.service';
import { EnvService } from 'src/services/env.service';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  currentPassword: string = 'bonjouratousse';
  newPassword: string = '';



  constructor(private route: Router,
    private http: HttpClient,
    private conversationService: ConversationService,
    private storage: NativeStorage,
    public popoverCtrl: PopoverController,
    public contacts: Contacts,
    private env: EnvService,
    private actionSheetController: ActionSheetController,
    private alertService: AlertService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
  }


  updatePassword() {


        this.storage.getItem('user')
          .then(
            data => {
              let options = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                }),
                body: { token: data.token, password: this.currentPassword, password2: this.newPassword }
              }
              this.http.request('PUT', this.env.API_URL + '/user/updateUserPassword', options)
              .subscribe((data2: any) => {
                if(data2.error == false)
                {
                  this.alertService.presentToast("Mise à jour réussite");
                  this.route.navigate(['./tabs']);
                }
                else
                {
                  this.alertService.presentToast(data2.error.message);
                }
              }, ((error: any) => {
                if ('error' in error) {
                  this.alertService.presentToast(error.error.message);
                }
              })
              )

            }, error => {
              //console.log("no user error !")
            }
          );

  }
}
