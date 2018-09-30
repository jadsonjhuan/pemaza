import { ClientService } from './../../services/client.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  clienteBean: Cliente;

  @Input() action = new EventEmitter();

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let codigo = parseInt(this.route.snapshot.paramMap.get('id'));
    this.clienteBean = new Cliente(null, null, null);

    if (codigo) {
      let res;
      this.clientService.findById(codigo).subscribe((data: any) => {
        this.clienteBean.setCodigo(data.codigo),
          this.clienteBean.setNome(data.nome),
          this.clienteBean.setAtivo(data.ativo)
      });
      console.log(this.clienteBean);
    }
  }

  save() {
    let codigo;
    this.clientService.createOrUpdate(this.clienteBean).subscribe((data: any) => {
      codigo = data.codigo,
      console.log(data)
    });

    this.action.emit({
      data: this.clienteBean,
      action: 'SAVE'
    });

    if (codigo) {
      this.router.navigate(['/'], { queryParams: { r: 'success' } });
    } else {
      this.router.navigate(['/'], { queryParams: { r: 'error' } });
    }

  }

}
