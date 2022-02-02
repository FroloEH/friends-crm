import { Injectable, OnDestroy, LOCALE_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Plugins } from "@capacitor/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { User } from "./user.model";
import { AngularFireModule } from "@angular/fire";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebase.apiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserDatafromResponseData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebase.apiKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserDatafromResponseData.bind(this)));
  }

  googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = this.afAuth.signInWithPopup(provider);
    credential
      .then((cred) => {
        this.setUserData(
          cred.user.uid,
          cred.user.email,
          cred.user.refreshToken,
          "1000"
        );
      })
      .finally(() => this.router.navigateByUrl("/"));
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({ key: "authData" });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private setUserDatafromResponseData(userData: AuthResponseData) {
    this.setUserData(
      userData.localId,
      userData.email,
      userData.idToken,
      userData.expiresIn
    );
  }

  private setUserData(
    localId: string,
    email: string,
    idToken: string,
    expiresIn: string
  ) {
    const expirationTime = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(localId, email, idToken, expirationTime);
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(localId, idToken, expirationTime.toISOString(), email);
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email,
    });
    Plugins.Storage.set({ key: "authData", value: data });
  }
}
