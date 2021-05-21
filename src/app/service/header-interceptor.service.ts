import { Injectable, NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

      return next.handle(requestComTokenAdicionado).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info('Operacao realizada com sucesso!');
          }
        })
        , catchError(this.processarErros));
    } else { // Caso nao exista o token, envia a requisicao sem o token (Ex: Request para obter o token)
      return next.handle(req).pipe(catchError(this.processarErros));
    }
  }

  processarErros(error: HttpErrorResponse): Observable<never> {
    let mensagemDeErro = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      mensagemDeErro = 'Erro: ' + error.error.error;
    } else {
      mensagemDeErro = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
    }

    window.alert(mensagemDeErro);

    return throwError(mensagemDeErro);
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
