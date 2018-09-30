export class Cliente {
    public codigo: number;

    public nome: string;

    public ativo: boolean;

    constructor(codigo: number, nome: string, ativo: boolean) {
        this.codigo = codigo;
        this.nome = nome;
        this.ativo = ativo;
    }

    public getCodigo() {
        return this.codigo;
    }

    public getNome() {
        return this.nome;
    }
    public isAtivo() {
        return this.ativo;
    }

    public setCodigo(codigo: number) {
        this.codigo = codigo;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }
    
}