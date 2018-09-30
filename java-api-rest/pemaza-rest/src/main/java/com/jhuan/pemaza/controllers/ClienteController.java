package com.jhuan.pemaza.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jhuan.pemaza.models.Cliente;
import com.jhuan.pemaza.repositiry.ClienteRepository;

@RestController
@RequestMapping("/cliente")
@CrossOrigin("*")
public class ClienteController {
	
	@Autowired
	private ClienteRepository cr;

	@GetMapping(produces="application/json")
	public @ResponseBody List<Cliente> listaClientes(){
		return cr.findAll();
	}
	
	@GetMapping(value = "/find-by-id/{codigo}", produces="application/json")
	public Cliente findById(@PathVariable("codigo") long codigo) {
		return cr.findById(codigo).get();
	}
	
	@PostMapping(value = "/save")
	public Cliente createOrUpdate(@RequestBody @Valid Cliente cliente) {
		return cr.save(cliente);
	}
	
	@DeleteMapping(value = "/delete/{codigo}")
	public Cliente delete(@PathVariable("codigo") long codigo) {
		Optional<Cliente> clienteOp = cr.findById(codigo);
		if(clienteOp.isPresent()) {
			Cliente cliente = clienteOp.get();
			cr.deleteById(codigo);
			return cliente;
		} else {
			return null;
		}
	}
	
}
