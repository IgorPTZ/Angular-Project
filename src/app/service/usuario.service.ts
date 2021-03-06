import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Relatorio } from '../model/relatorio';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getListaDeUsuarios(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getListaDeUsuariosPaginados(pagina: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'pagina/' + pagina);
  }

  excluirUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {
      responseType: 'text'
    });
  }

  consultarUsuarioPeloId(id: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'v1/' + id);
  }

  consultarUsuarioPeloNome(nome: string): Observable<any> {
    // tslint:disable-next-line: quotemark
    return this.http.get(AppConstants.baseUrl + "obter-usuarios-pelo-nome/" + nome);
  }

  consultarUsuarioPaginadoPeloNome(nome: string, pagina: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'obter-usuarios-paginados-pelo-nome/' + nome + '/pagina/' + pagina);
  }

  criarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, usuario);
  }

  consultarProfissoes(): Observable<any> {
    return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/');
  }

  removerTelefone(id: number): Observable<any> {
    // tslint:disable-next-line: quotemark
    return this.http.delete(AppConstants.baseUrl + "excluir-telefone/" + id, {responseType: 'text'});
  }

  isUsuarioAutenticado(): boolean {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  baixarRelatorio(): any {
    return this.http.get(AppConstants.baseUrl + 'baixar-relatorio', {responseType : 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  baixarRelatorioParametrizado(relatorio: Relatorio): any {

    return this.http.post(AppConstants.baseUrl + 'baixar-relatorio-parametrizado/', relatorio, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe').src = data;
    });
  }

  obterDadosDoGrafico(): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'obter-dados-do-grafico/');
  }
}
