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

  pagina = 1;

  usuarios: Observable<Usuario[]>;

  nome: string;

  total: number;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.getListaDeUsuarios().subscribe(data => {

      this.usuarios = data.content;
    });
  }

  excluirUsuario(id: number) {

    if (confirm('Deseja excluir esse usuario?')) {

      this.usuarioService.excluirUsuario(id).subscribe(data => {
        console.log('Response ->' + data);

        this.usuarioService.getListaDeUsuarios().subscribe(data => {

          this.usuarios = data;
        });
      });
    }
  }

  consultarUsuarioPeloNome() {
    this.usuarioService.consultarUsuarioPeloNome(this.nome).subscribe(data => {
      this.usuarios = data;
    });
  }

  carregarPagina(pagina) {

    console.info("Pagina -> " + pagina);
  }
}
