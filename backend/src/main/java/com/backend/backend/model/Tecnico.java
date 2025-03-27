package com.techgo.backend.model;

import javax.persistence.*;

@Entity
public class Tecnico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double latAtual;
    private Double lonAtual;

    // getters e setters
}
