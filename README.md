# Landing Page Comercial para Gestao de EPIs

Landing page otimizada para apresentar uma solucao de gestao de Equipamentos de Protecao Individual.

## Visao Geral

O projeto organiza uma versao comercial enxuta para divulgacao de um sistema de gestao de EPIs. O conteudo confirmado indica frontend React, backend FastAPI opcional para contato e foco em desempenho de build para hospedagem simples.

## Problema Resolvido

Produtos tecnicos precisam de apresentacao clara, leve e orientada a conversao. Esta landing page apresenta problema, solucao, beneficios, planos e contato em uma experiencia web otimizada.

## Beneficios

- Apresenta a solucao de forma objetiva.
- Reduz peso do build em relacao a versoes mais completas.
- Organiza secoes comerciais em uma pagina unica.
- Inclui formulario de contato com backend de apoio.

## Principais Funcionalidades

### Funcionalidades Disponiveis

- Hero section com chamada principal.
- Secoes de problema, solucao, beneficios e diferenciais.
- Galeria ou demonstracao visual do sistema.
- Apresentacao de planos.
- Formulario de contato.
- Backend FastAPI para recebimento de contato.
- Integracao de email via Resend identificada no projeto.
- Layout responsivo.

### Funcionalidades Planejadas

- Dominio proprio, analytics, otimizacao de imagens e chat ao vivo aparecem como ideias futuras nos artefatos do projeto.

## Como Funciona

```text
Visitante acessa a landing page
-> navega pelas secoes comerciais
-> entende o problema e a solucao
-> consulta beneficios e planos
-> envia contato pelo formulario
-> backend processa a solicitacao quando configurado
```

## Tecnologias Utilizadas

- Python
- FastAPI
- React
- JavaScript
- Tailwind CSS
- Resend

## Arquitetura

```mermaid
flowchart LR
    Visitante["Visitante"] --> Landing["Frontend React"]
    Landing --> Contato["Formulario de contato"]
    Contato --> API["API FastAPI"]
    API --> Email["Servico de email"]
```

## Estrutura Do Projeto

- `frontend/`: landing page, componentes e estilos.
- `backend/`: endpoint de contato e dependencias Python.
- `deploy/`: artefatos de publicacao existentes.
- `memory/` e `test_reports/`: artefatos de acompanhamento.

## Status

Versao comercial historica/otimizada. O repositorio contem artefatos que exigem revisao de seguranca antes de divulgacao ampla.

## Minha Participacao

Organizacao e evolucao de uma apresentacao comercial para produto tecnico, com foco em clareza, desempenho e fluxo de contato.

## Autor

Desenvolvido por Michele Santana — Kalion Tecnologia
