package com.techgo.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.techgo.backend.dto.CriarChamadoDTO;
import com.techgo.backend.model.Chamado;
import com.techgo.backend.model.Tecnico;
import com.techgo.backend.repository.ChamadoRepository;
import com.techgo.backend.repository.TecnicoRepository;

import java.util.List;

@RestController
@RequestMapping(\"/chamados\")
public class ChamadoController {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private TecnicoRepository tecnicoRepository;

    @PostMapping
    public Chamado criarChamado(@RequestBody CriarChamadoDTO dto) {
        Chamado chamado = new Chamado();
        chamado.setDescricao(dto.getDescricao());
        chamado.setLatitude(dto.getLatitude());
        chamado.setLongitude(dto.getLongitude());
        chamado.setStatus(\"ABERTO\");
        chamado = chamadoRepository.save(chamado);

        // busca tecnico mais proximo
        List<Tecnico> tecnicos = tecnicoRepository.findAll();
        Tecnico tecnicoMaisProximo = null;
        double menorDist = Double.MAX_VALUE;
        for(Tecnico t : tecnicos) {
            double dist = calcularDistancia(dto.getLatitude(), dto.getLongitude(), t.getLatAtual(), t.getLonAtual());
            if(dist < menorDist) {
                menorDist = dist;
                tecnicoMaisProximo = t;
            }
        }

        if(tecnicoMaisProximo != null) {
            chamado.setTecnico(tecnicoMaisProximo);
            chamado.setStatus(\"ATRIBUIDO\");
            chamado = chamadoRepository.save(chamado);
        }
        return chamado;
    }

    @GetMapping
    public List<Chamado> listarChamados() {
        return chamadoRepository.findAll();
    }

    private double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2)*Math.sin(dLat/2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon/2)*Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
}
