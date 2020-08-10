
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




@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {


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
            console.log('/user/checkPhone/' + data.id_user.toString() + "/" + data.token + "/" + phoneNumber.toString())
            this.http.request('GET', this.env.API_URL + '/user/checkPhone/' + data.id_user.toString() + "/" + data.token + "/" + phoneNumber.toString())
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

}



