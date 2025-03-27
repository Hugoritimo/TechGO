package com.techgo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techgo.backend.model.Chamado;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
    // se precisar de queries custom, adicione aqui
}
