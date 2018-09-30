import { Cliente } from './../model/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClientService {
  private link = 'http://localhost:8081/cliente';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<any[]>(`${this.link}`);
  }

  findById(codigo) {
    return this.http.get(`${this.link}/find-by-id/${codigo}`);
  }

  createOrUpdate(cliente: Cliente) {
    return this.http.post(`${this.link}/save`, cliente);
  }

  delete(codigo: number) {
    return this.http.delete(`${this.link}/delete/${codigo}`);
  }
}
