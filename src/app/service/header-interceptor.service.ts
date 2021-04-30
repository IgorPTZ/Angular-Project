import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  // Intercepta qualquer request feita pelo front-end
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (localStorage.getItem('token') !== null) { // Adiciona o bearer token caso exista

      const token = 'Bearer ' + localStorage.getItem('token');

      const requestComTokenAdicionado = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(requestComTokenAdicionado);
    } else { // Caso nao exista o token, envia a requisicao sem o token (Ex: Request para obter o token)
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
})

export class HttpInterceptorModule {

}
