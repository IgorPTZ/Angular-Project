import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      console.log('Edicao de usuario (Id:' + id + ')');
      this.usuarioService.consultarUsuarioPeloId(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  limparDadosDoUsuario() {
    this.usuario = new Usuario();
  }

  salvarUsuario() {

    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.usuarioService.editarUsuario(this.usuario).subscribe(data => {
        this.limparDadosDoUsuario();
        console.info("Usuario editado com sucesso! Usuario ->" + data);
      });
    } else {
      this.usuarioService.criarUsuario(this.usuario).subscribe(data => {
        this.limparDadosDoUsuario();
        console.info("Usuario criado com sucesso! Usuario ->" + data);
      });
    }
  }
}
