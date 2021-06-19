import { Telefone } from './telefone';
import { Profissao } from './profissao';

export class Usuario {

	id: number;

	login: string;

	senha: string;

	nome: string;

	cpf: string;

	profissao: Profissao = new Profissao();

	telefones: Array<Telefone>;

	dataDeNascimento: string;

	salario: DoubleRange;
}
