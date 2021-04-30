import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient) { 

  }

  getListaDeUsuarios(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }
}
