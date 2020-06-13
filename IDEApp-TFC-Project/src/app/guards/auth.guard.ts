import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Metodo por defecto que antes devolvia true
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Lo que que hace es que si el usuario no esta logeado
    //y se va a cualquier ruta en la que tenga que estar logeado si o si,
    // lo manda al inicio
    return this.afAuth.authState
      .pipe(take(1))
      .pipe(map((authState) => !!authState))
      .pipe(
        tap((auth) => {
          if (!auth) {
            this.router.navigate(['']);
          }
        })
      );
  }
}
