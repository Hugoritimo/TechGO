package com.techgo.backend.model;

import javax.persistence.*;

@Entity
public class Chamado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private Double latitude;
    private Double longitude;
    private String status;

    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Tecnico tecnico;

    // getters e setters
}
