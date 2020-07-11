import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {DataManagerService} from './observables/data-manager.service';



@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let manager = this.injector.get(DataManagerService)
    let reqToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${manager.getToken()}`
      }
    })
    return next.handle(reqToken)
  }
}
