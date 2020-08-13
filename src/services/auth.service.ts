import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { User } from '../models/user';

import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  id_user = -1;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }



  login(phone: String, password: String) {
    return this.http.post(this.env.API_URL + '/loginUser', { phone: phone, password: password }
    ).subscribe((data: any) => {
      console.log("data error : ")
      console.log(data.error)
      // If returned data with the POST request is valid log the user in
      if ('error' in data) {
        this.storage.setItem('user', {id_user: data.id_user, token: data.token, mail: data.mail })
        this.id_user = data.id_user;
        this.token = data.token;
        

        // Check if the user is ban
        this.http.request('GET', this.env.API_URL + '/user/isBlocked/' + data.token)
          .subscribe((data2: any) => {
            if (data2.isBlocked == 0)
            {
              this.isLoggedIn = true;
              this.alertService.presentToast("Connecté");
              this.navCtrl.navigateRoot('/tabs');
            }
            else 
            {
              this.alertService.presentToast("Désolé mais vous êtes actuellement bloqué");
            }
            


          }, ((error: any) => {
            console.log("data error : ")
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


      }
      else {
        this.alertService.presentToast("Server error");
      }

    }, ((error: any) => {
      console.log("data error : ")
      console.log(error.error.error)
      // Managed by the API error
      if ('error' in error.error) {
        this.alertService.presentToast(error.error.message);
      }
      else {
        this.alertService.presentToast("Server error");
      }
    })
    )
  }




  logout(id_user: Number, token: String) {
    console.log("logout data : " + id_user + " " + token);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { token: token }
    }

    return this.http.request('DELETE', this.env.API_URL + '/user/logout', options)
      .subscribe((data: any) => {
        if ('error' in data) {
          console.log("data lol : ")
          console.log(data)
          this.storage.remove('user')
          this.isLoggedIn = false;
          this.alertService.presentToast("Déconnexion");
          this.navCtrl.navigateRoot('/login');
        }
      }, ((error: any) => {
        if ('error' in error) {
          console.log("error lol : ")
          console.log(error)
          this.storage.remove('user')
          this.isLoggedIn = false;
          this.alertService.presentToast(error.error.message);
          this.navCtrl.navigateRoot('/login');
        }
      })
      )
  }



  register(name: String, firstname: String, mail: String, phone: String, password: String) {
    return this.http.post(this.env.API_URL + '/createUser', { name: name, firstname: firstname, mail: mail, phone: phone, password: password }
    ).subscribe((data: any) => {
      console.log("data error : ")
      console.log(data.error)
      // If returned data with the POST request is valid log the user in
      if ('error' in data) {
        this.alertService.presentToast("Votre compte à été créer avec succès");
        this.navCtrl.navigateRoot('/login');
      }
      else {
        this.alertService.presentToast("Server error");
      }

    }, ((error: any) => {
      console.log("data error : ")
      console.log(error.error.error)
      // Managed by the API error
      if ('error' in error.error) {
        this.alertService.presentToast(error.error.message);
      }
      else {
        this.alertService.presentToast("Server error");
      }
    })
    )
  }








  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }


}