import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TanamUser, UserRole } from 'tanam-models';
import { AppConfigService } from './app-config.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly siteCollection = this.firestore.collection('tanam').doc(this.appConfig.siteId);

  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly appConfig: AppConfigService,
  ) { }

  getCurrentUser(): Observable<TanamUser> {
    const firebaseUser = this.fireAuth.auth.currentUser;
    return this.siteCollection
      .collection('users').doc<TanamUser>(firebaseUser.uid)
      .valueChanges();
  }

  getUser(uid: string): Observable<TanamUser> {
    return this.siteCollection
      .collection('users').doc<TanamUser>(uid)
      .valueChanges();
  }

  hasSomeRole(): Observable<boolean> {
    return this.getCurrentUser()
      .pipe(map(user => user.roles.length > 0))
      .pipe(tap(result => console.log(`[UserService:hasSomeRole] ${result}`)));
  }

  hasRole(role: UserRole): Observable<boolean> {
    return this.getCurrentUser()
      .pipe(map(user => user.roles.indexOf(role) !== -1))
      .pipe(tap(result => console.log(`[UserService:hasRole] ${role}: ${result}`)));
  }
}