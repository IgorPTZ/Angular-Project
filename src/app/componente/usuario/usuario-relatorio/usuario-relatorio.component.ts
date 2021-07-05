import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Relatorio } from 'src/app/model/relatorio';

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
    return date ? formatarString(date.day) + this.DELIMITER + formatarString(date.month) + this.DELIMITER + date.year : null;
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
    return date ? formatarString(date.day) + this.DELIMITER + formatarString(date.month) + this.DELIMITER + date.year : null;
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
export class UsuarioRelatorioComponent {

  relatorio = new Relatorio();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  baixarRelatorioParametrizado() {
    console.log(this.relatorio);

    this.usuarioService.baixarRelatorioParametrizado(this.relatorio);
  }
}
