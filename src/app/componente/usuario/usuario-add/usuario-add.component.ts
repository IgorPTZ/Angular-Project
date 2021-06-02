import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatadorDeData extends NgbDateParserFormatter {
  
  parse(value: string): NgbDateStruct {
    throw new Error("Method not implemented.");
  }
  
  format(date: NgbDateStruct): string {
    throw new Error("Method not implemented.");
  } 
}

@Component({
  selector: 'app-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormatadorDeData}]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      console.info('Edicao de usuario (Id:' + id + ')');
      this.usuarioService.consultarUsuarioPeloId(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  limparDadosDoUsuario() {
    this.usuario = new Usuario();
    this.telefone = new Telefone();
  }

  adicionarTelefone() {

    if(this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  removerTelefone(id, index) {
    if (id == null) {
      this.usuario.telefones.splice(index, 1);
      return;
    }

    if (id != null && confirm("Deseja realmente remover esse telefone?")) {

      this.usuarioService.removerTelefone(id).subscribe(data => { 
        // Remove o telefone excluido no banco de dados da lista de telefones do usuario;
        this.usuario.telefones.splice(index, 1);
        console.info(data);
      });
    }
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
