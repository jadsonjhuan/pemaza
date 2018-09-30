import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../services/client.service';
import { Cliente } from '../../model/cliente';
import { Router, ActivatedRoute  } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientes: Array<Cliente>;
  clienteBean: Cliente;

  action: Object;

  messageText: string;
  messageType: string;//success, danger, warning, info etc...

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clientes = [];
    this.clienteBean = new Cliente(null, null, null);

    this.clientService.findAll().subscribe(dados => {
      dados.forEach(element => {
        this.clientes.push(new Cliente(element.codigo, element.nome, element.ativo));
      });
    });

    console.log(this.action);
  }

  setClienteBean(cliente: Cliente) {
    this.clienteBean = cliente;
    console.log(this.clienteBean);
  }

  register() {
    if (this.clienteBean.getCodigo()) {
      this.router.navigate(["/register", this.clienteBean.getCodigo()]);
    } else {
      this.router.navigate(["/register"]);
    }
  }

}
