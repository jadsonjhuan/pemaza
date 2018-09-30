package com.jhuan.pemaza.repositiry;

import com.jhuan.pemaza.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
