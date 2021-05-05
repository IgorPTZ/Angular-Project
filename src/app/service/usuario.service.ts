import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getListaDeUsuarios(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  excluirUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {
      responseType: 'text'
    });
  }

  consultarUsuario(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "obter-usuarios-pelo-nome/" + nome);
  }
}
