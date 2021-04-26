import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppConstants} from '../app-constants';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(usuario) {

    console.log(JSON.stringify(usuario));

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      /* Response HTTP */
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);

      console.info("Token ->" + localStorage.getItem("token"));
    },     
      error => {
        console.error("Erro ao fazer login! Login e/ou senha estao incorretos!");
      }  
    );
  }
}
