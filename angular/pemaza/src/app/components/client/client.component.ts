import { Cliente } from './../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientes: Array<Cliente>;
  clienteBean: Cliente;
  editing: boolean = false;
  messageType: string;
  messageText: string;
  messageBtnCancDel: boolean = false;
  scroll: boolean = false;
  time;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientes = [];
    this.clienteBean = new Cliente(null, null, null);
    this.editing = false;

    this.listClients();
  }

  listClients() {
    this.clientes = new Array<Cliente>();
    this.clientService.findAll().subscribe(dados => {
      dados.forEach(element => {
        this.clientes.push(new Cliente(element.codigo, element.nome, element.ativo));
      });
      this.scroll = (this.clientes.length > 6) ? true : false;
    });
  }

  setClienteBean(cliente: Cliente) {
    if (cliente == null) {
      cliente = new Cliente(null, null, null);
    }
    this.clienteBean = cliente;
    console.log(this.clienteBean);
  }

  edit() {
    this.editing = true;
  }

  add() {
    this.setClienteBean(null);
    this.editing = true;
  }

  delele() {
    let cliente: Cliente = this.clienteBean;
    let i = 0;
    this.clientes.forEach(element => {
      if (element.getCodigo() == cliente.getCodigo()) {
        this.clientes.splice(i, 1);
      }
      i++;
    });

    this.showMessage('success', `Registro de "<b>${this.clienteBean.getNome()}</b>" foi excluído com sucesso.`)
    this.messageBtnCancDel = true;

    this.time = setTimeout(() => {
      this._delete(this.clienteBean.getCodigo())
    }, 3550);
  }

  cancelDelete() {
    clearTimeout(this.time);
    this.listClients();
    this.messageText = null;
  }

  _delete(codigo) {
    this.clientService.delete(codigo).subscribe((data: any) => {
      this.clienteBean = new Cliente(null, null, null);
    }, error => {
      console.log(error);
      this.showMessage("success", "Falha ao excluir registro.")
    });
  }

  cancelRegister() {
    this.clienteBean = new Cliente(null, null, null);
    this.listClients();
    this.editing = false;
  }

  saveRegister() {
    let codigo;
    let tipo;
    if (this.clienteBean.codigo == null) {
      tipo = "cadastrado";
    } else {
      tipo = "editado"
    }
    this.clientService.createOrUpdate(this.clienteBean).subscribe((data: any) => {
      codigo = data.codigo;
      console.log(data);
      this.showMessage("success", `Registro de "<b>${data.nome}</b>" foi ${tipo} com sucesso.`)
      this.listClients();
    }, error => {
      console.log(error);
      this.showMessage("success", "Falha ao salvar registro.")
    });
    this.editing = false;
  }

  showMessage(type: string, text: string) {
    this.messageBtnCancDel = false;
    this.messageType = type;
    this.messageText = text;
    setTimeout(() => {
      this.messageText = null;
    }, 3500);
  }

  padleft(str) {
    let zero: string = "0";
    let resto: number = 6 - new String(str).length;
    return zero.repeat(resto) + str;
  }

}
