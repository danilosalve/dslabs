# 📊 Portal de Gestão de Vendas - DSLabs

Este projeto é um portal de gestão de vendas desenvolvido com Angular, utilizando a biblioteca `AngularInMemoryWebApp` para simular uma API REST com dados fictícios. O sistema foi implantado no Firebase Hosting e oferece funcionalidades para gerenciamento de pedidos de vendas, clientes, contatos e indicadores comerciais.

🔗 [Acesse o projeto online](https://gestao-de-vendas-labs.web.app/#/)

## 🚀 Tecnologias Utilizadas

- **Angular** 16+
- **AngularInMemoryWebApp** para simulação de backend
- **Firebase Hosting** para deploy
- **RxJS** para manipulação reativa de dados

## 📦 Funcionalidades

- 📋 **Gestão de Pedidos de Vendas**  
  - Visualização por status: Aberto, Bloqueado, Encerrado  
  - Filtros por cliente, data e status  
  - Indicadores de volume e valor de vendas

- 👥 **Cadastro de Clientes e Contatos**  
  - Listagem e edição de dados fictícios  
  - Simulação de relacionamento entre cliente e pedidos

- 📈 **Indicadores de Vendas**  
  - Total de vendas, vendas em aberto, bloqueadas e encerradas  
  - Gráficos de desempenho por período e status

## 🧪 Dados Simulados

Este projeto utiliza dados fake via `AngularInMemoryWebApp`, permitindo testes e demonstrações sem necessidade de backend real. Exemplos de dados incluem:

```json
{
  "pedidos": [
    { "id": 4, "cliente": "Mudanças Ursinhos Ltda", "status": "Bloqueado", "data": "04/03/2025" },
    { "id": 5, "cliente": "Kibaum Alimentos ME", "status": "Aberto", "data": "27/04/2025" }
  ],
  "clientes": [
    { "id": 1, "nome": "Breadcrumb Padaria ME", "contato": "padaria@breadcrumb.com" }
  ]
}
```

## 🔥 Deploy no Firebase

O projeto foi publicado no Firebase Hosting. Para realizar o deploy:

```bash
ng build --prod
firebase deploy
```

Certifique-se de ter o Firebase CLI instalado e autenticado.

## 🛠️ Como Executar Localmente

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
ng serve
```

Acesse em `http://localhost:4200`

## 📌 Observações

- Este projeto é apenas para fins educacionais e demonstração.
- Os dados são fictícios e não representam informações reais.

---
