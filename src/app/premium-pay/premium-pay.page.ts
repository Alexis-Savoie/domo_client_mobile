
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

import { Stripe } from '@ionic-native/stripe/ngx';


@Component({
  selector: 'app-premium-pay',
  templateUrl: './premium-pay.page.html',
  styleUrls: ['./premium-pay.page.scss'],
})
export class PremiumPayPage implements OnInit {

  number: string = '4242424242424242';
  expMonth: number = 12;
  expYear: number = 2021;
  cvc: string = '220';

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
    private stripe: Stripe,
    private authService: AuthService) { }

  ngOnInit() {
  }



  checkout() {
    this.stripe.setPublishableKey('pk_test_51GvfZ1IRCdwqr9uBgPrDb91ZkfO3eopfL3hfRLT6DIkpbrgMBXnIphQra4Dbfz1bPYwv01ojZ71BdiC9gwFJejEo00WeA1rPHS');

    let card = {
      number: this.number,
      expMonth: this.expMonth,
      expYear: this.expYear,
      cvc: this.cvc
    }

    this.stripe.createCardToken(card)
      .then(stripeToken => {

        this.storage.getItem('user')
          .then(
            data => {
              this.http.post(this.env.API_URL + '/user/addPremium', { token: data.token, stripeEmail: "alexis@gmail.com", stripeToken: stripeToken.id }
              ).subscribe((data2: any) => {
                console.log("data premium : ")
                console.log(data2)
                if(data2.error == false)
                {
                  this.alertService.presentToast("Vous êtes maintenant premium");
                  this.navCtrl.navigateRoot(['./tabs']);
                }
                else
                {
                  this.alertService.presentToast(data2.message);
                }

              }, ((error: any) => {
                console.log("data error : ")
                console.log(error)
                // Managed by the API error
                if ('error' in error.error) {
                  this.alertService.presentToast(error.error.message);
                }
                else {
                  this.alertService.presentToast("Server error");
                }
              })
              )

            }, error => {
              console.log("no user error !")
            }
          );
      })
      .catch(error => {
        this.alertService.presentToast(error)
      });
  }


}
