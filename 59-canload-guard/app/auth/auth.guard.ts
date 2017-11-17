import { Injectable } from '@angular/core';
import {CanActivate, CanLoad} from '@angular/router';

import { AuthService } from './auth.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {}

  canLoad(): Observable<boolean> {
    return this.authService.checkPermissions();
  }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }
}
