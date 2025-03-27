package com.techgo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.techgo.backend.model.Tecnico;
import com.techgo.backend.repository.TecnicoRepository;

import java.util.List;

@RestController
@RequestMapping(\"/tecnicos\")
public class TecnicoController {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @PostMapping
    public Tecnico criarTecnico(@RequestBody Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    @GetMapping
    public List<Tecnico> listarTecnicos() {
        return tecnicoRepository.findAll();
    }
}
