import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);

      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }

    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class FormatadorDeData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);

      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }

    return null;
  }

  format(date: NgbDateStruct): string | null {

    return date ? formatarString(date.day) + this.DELIMITER + formatarString(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function formatarString(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }
}

@Component({
  selector: 'app-add',
  templateUrl: './usuario-relatorio.component.html',
  styleUrls: ['./usuario-relatorio.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormatadorDeData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class UsuarioRelatorioComponent implements OnInit {

  usuario = new Usuario();

  telefone = new Telefone();

  profissoes: Array<Profissao>;

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuarioService.consultarProfissoes().subscribe(data => {
      this.profissoes = data;
    });

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      console.info('Edicao de usuario (Id:' + id + ')');
      this.usuarioService.consultarUsuarioPeloId(id).subscribe(data => {
        this.usuario = data;

        if (this.usuario.profissao == null) {
          this.usuario.profissao = new Profissao();
        }
      });
    }
  }

  limparDadosDoUsuario() {
    this.usuario = new Usuario();
    this.telefone = new Telefone();
  }

  adicionarTelefone() {

    if (this.usuario.telefones === undefined) {
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
