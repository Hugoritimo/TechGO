# TechGO - Plataforma de Suporte de TI

## 📌 Sobre o Projeto
TechGO é um aplicativo de suporte de TI sob demanda, conectando usuários com técnicos especializados de forma rápida e segura. O sistema funciona como um marketplace, permitindo que usuários abram chamados e técnicos aceitem e resolvam problemas remotamente ou presencialmente.

## 🚀 Tecnologias Utilizadas
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: Next.js, React Native (para versão mobile)
- **Infraestrutura**: Docker, AWS, Firebase (para notificações e autenticação)
- **Pagamentos**: Stripe, PayPal, PIX

## 📂 Estrutura do Repositório
```
📦 TechGO
 ┣ 📂 backend (NestJS API)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 auth (Autenticação e segurança)
 ┃ ┃ ┣ 📂 users (Gerenciamento de usuários)
 ┃ ┃ ┣ 📂 tickets (Chamados de suporte)
 ┃ ┃ ┣ 📂 chat (Mensagens e suporte ao cliente)
 ┃ ┃ ┣ 📂 payments (Gestão de pagamentos)
 ┃ ┃ ┣ 📜 app.module.ts (Configuração principal do backend)
 ┣ 📂 frontend (Next.js e React Native)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 screens (Telas do aplicativo)
 ┃ ┃ ┣ 📂 components (Componentes reutilizáveis)
 ┃ ┃ ┣ 📜 App.tsx (Configuração principal do frontend)
 ┣ 📜 README.md (Este arquivo)
```

## 🔧 Como Configurar e Rodar
### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/Hugoritimo/TechGO.git
cd TechGO
```
### 2️⃣ Configurar o Backend
```sh
cd backend
npm install
cp .env.example .env  # Configurar as variáveis de ambiente
npm run start:dev
```
### 3️⃣ Configurar o Frontend
```sh
cd frontend
npm install
npm run dev
```

## 📜 Licença & Copyright
© 2025 TechGO - Todos os direitos reservados.

Este software é protegido por direitos autorais. Qualquer cópia, modificação ou distribuição não autorizada deste código-fonte é estritamente proibida sem a permissão do(s) autor(es). Caso seja identificado uso indevido, medidas legais podem ser tomadas.

Para permissões ou parcerias, entre em contato com o proprietário do repositório.

