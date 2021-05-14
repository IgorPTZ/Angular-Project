import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

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

  consultarUsuarioPeloId(id: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'v1/' + id);
  }

  consultarUsuarioPeloNome(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "obter-usuarios-pelo-nome/" + nome);
  }

  criarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, usuario);
  }

  isUsuarioAutenticado(): boolean {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
