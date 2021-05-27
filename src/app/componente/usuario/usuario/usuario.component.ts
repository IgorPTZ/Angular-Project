import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  // Variavel utilizada para paginacao
  pagina = 1;

  usuarios: Array<Usuario[]>;

  nome: string;

  // Variavel utilizada para paginacao
  total: number;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.getListaDeUsuariosPaginados(0).subscribe(data => {

      // Conteudo do response paginado
      this.usuarios = data.content;

      // Numero total de elementos paginados
      this.total = data.totalElements;
    });
  }

  excluirUsuario(id: number, index: number) {

    if (confirm('Deseja excluir esse usuario?')) {

      this.usuarioService.excluirUsuario(id).subscribe(dataOne => {
        console.log('Response ->' + dataOne);

        // Remove usuario excluido no banco de dados da tela
        this.usuarios.splice(index, 1);
      });
    }
  }

  consultarUsuarioPeloNome() {
    console.info(this.nome);

    this.usuarioService.consultarUsuarioPeloNome(this.nome).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  carregarPagina(pagina: number) {

    this.usuarioService.getListaDeUsuariosPaginados((pagina - 1)).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }
}
