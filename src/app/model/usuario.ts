import { Telefone } from './telefone';

export class Usuario {

	id: number;

	login: string;

	senha: string;

	nome: string;

	cpf: string;

	telefones: Array<Telefone>;
}
