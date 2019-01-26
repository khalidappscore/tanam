import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { AppAuthService } from './app-auth.service';
import { UserPrefs } from './user-prefs.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export type UserRole = 'owner' | 'admin' | 'publisher' | 'designer' | 'reviewer';

export interface TanamUser {
  uid: string;
  name: string;
  roles: UserRole[];
  prefs: UserPrefs;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly fireAuth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
  ) { }

  getCurrentUser(): Observable<TanamUser> {
    return this.fireAuth.user
      .pipe(filter(user => !!user))
      .pipe(switchMap(user => this.getUser(user.uid)));
  }

  getUser(uid: string): Observable<TanamUser> {
    return this.firestore
      .collection('tanam-users').doc<TanamUser>(uid)
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
