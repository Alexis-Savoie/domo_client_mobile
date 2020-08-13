
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
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {



  handler: any;



  public allContacts: any
  listContacts = []


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



    this.allContacts = this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
      .then(contactsList => {
        this.storage.setItem('contactsList', contactsList)
      });


    this.storage.getItem('contactsList')
      .then(
        data => {

          data.forEach(data2 => {
            //console.log(data2._objectInstance.phoneNumbers)
            data2._objectInstance.phoneNumbers.forEach(phoneNumber => {
              //console.log(phoneNumber.value)
              this.updateConversation(phoneNumber.value.replace(/\s/g, ''))
            })
          })
        }, error => {
        }
      );


  }





  updateConversation(phoneNumber) {
    this.storage.getItem('user')
      .then(
        data => {
          console.log('/user/checkPhone/' + data.token + "/" + phoneNumber.toString())
          this.http.request('GET', this.env.API_URL + '/user/checkPhone/' + data.token + "/" + phoneNumber.toString())
            .subscribe((data2: any) => {
              //console.log("SUCCESS ??? " + phoneNumber.toString())
              //console.log(data2)
              // Get conversations now that updated
              this.conversationService.getUserContacts()
            }, ((error: any) => {
              console.log(error.error)
              // Managed by the API error
              if ('error' in error.error) {
                //this.alertService.presentToast(error.error.message);
              }
              else {
                //this.alertService.presentToast("Server error");
              }
            })
            )

        }, error => {
          this.storage.remove('user')
        }
      );
  }


  chatting(id_conversation, name, pp) {
    console.log(id_conversation)
    this.route.navigate(['./chatting', id_conversation, name, pp]);
  }
  new_chat() {
    this.route.navigate(['./new-chat']);
  }

  logout() {
    //this.route.navigate(['./login']);
    this.storage.getItem('user')
      .then(
        data => {
          this.authService.logout(data.id_user, data.token)
        }, error => {
          console.log("no data force logout")
          this.route.navigate(['./login']);
        }
      );
  }


  gologin() {

    this.route.navigate(['./login']);
  }


  async selectOption() {
    const actionSheet = await this.actionSheetController.create({
      //header: "",
      buttons: [{
        text: 'Paramètres',
        handler: () => {

        }
      },
      {
        text: 'Déconnexion',
        handler: () => {
          this.logout()
        }
      },
      {
        text: 'Retour',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }







  checkout() {

    this.stripe.setPublishableKey('pk_test_51GvfZ1IRCdwqr9uBgPrDb91ZkfO3eopfL3hfRLT6DIkpbrgMBXnIphQra4Dbfz1bPYwv01ojZ71BdiC9gwFJejEo00WeA1rPHS');

    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2021,
      cvc: '220'
    }

    this.stripe.createCardToken(card)
      .then(stripeToken => {

        this.storage.getItem('user')
          .then(
            data => {
              this.http.post(this.env.API_URL + '/user/addPremium', { token: data.token, stripeEmail: "alexis@gmail.com", stripeToken: stripeToken.id }
              ).subscribe((data: any) => {
                console.log("data premium : ")
                console.log(data)
                // If returned data with the POST request is valid log the user in

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
        this.alertService.presentToast("Données bancaires invalide !")
      });
  }



  createGroup() {
    this.storage.getItem('user')
    .then(
      data => {
        // Check if user is premium before proceed any further
        this.http.request('GET', this.env.API_URL + '/user/checkPremium/' + data.token)
          .subscribe((data2: any) => {
            if(data2.error == false)
            {
              this.alertService.presentToast("Vous êtes premium");
            }
            else
            {
              this.alertService.presentToast("Vous n'êtes pas premium");
              this.route.navigate(['./premium-pay']);
            }
            
          }, ((error: any) => {
            console.log(error.error)
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
        this.storage.remove('user')
      }
    );
  }











}



