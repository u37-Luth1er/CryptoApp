# 💰 CriptoApp - Demo Educacional de SQL Injection

Este é um projeto **fictício** e **educacional** que simula uma aplicação de carteira de criptomoedas com **vulnerabilidades propositais de SQL Injection**, com o objetivo de conscientizar desenvolvedores sobre os riscos e práticas seguras no desenvolvimento web.

> ⚠️ **NÃO use este código em produção.** Este projeto contém falhas de segurança intencionais para fins de aprendizado.

---

## 🔍 Objetivo

Demonstrar na prática como ataques de **SQL Injection** podem ser realizados em aplicações web mal protegidas, e como a validação e o uso de queries parametrizadas são fundamentais para garantir a segurança.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite3 (em memória)](https://www.sqlite.org/)
- [EJS](https://ejs.co/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express-session](https://www.npmjs.com/package/express-session)
- [crypto (SHA1)](https://nodejs.org/api/crypto.html)

---

## 🚀 Como executar

### 1. Clone o repositório:

```
git clone git@github.com:shellt3r/cryptoApp.git
cd cryptoApp
```

### 2\. Instale as dependências:

`npm install`

### 3\. Inicie o servidor:

`node app.js`

### 4\. Acesse no navegador:

`http://localhost:3000`

* * * * *

👥 Usuários Mockados
--------------------

O app carrega usuários fictícios a partir de um JSON (`data/users.json`). Exemplo de login:

-   **Email:** `alice@hotmail.com`

-   **Senha:** `alice123`

> Tente um ataque como:
> `Email: ' OR '1'='1' --
> Senha: qualquer coisa`

* * * * *

🔐 Segurança
------------

A aplicação tem deliberadamente uma falha de SQL Injection no login (modo inseguro para demonstração). Um exemplo de ataque pode permitir acesso não autorizado ao primeiro usuário do banco.

O objetivo é mostrar **por que devemos evitar interpolação direta em queries SQL** e adotar o uso de **consultas parametrizadas**.

* * * * *

✅ Funcionalidades
-----------------

-   Simulação de login de usuários

-   Dashboard com saldos de BTC, ETH e USDT

-   Redirecionamento com SHA1(id)

-   Sessão protegida por middleware

-   Página de erro customizada (404 / 403)

-   Mock com múltiplos usuários

-   Proteção por sessão e SHA1 do ID

-   Demonstração prática de ataque por SQLi

* * * * *

📁 Estrutura de Pastas
----------------------

```.
├── app.js
├── data/
│   └── users.json
├── views/
│   ├── login.ejs
│   ├── dashboard.ejs
│   └── error.ejs
├── public/
│   └── styles.css
└── README.md`
```
* * * * *

📚 Aprendizado Esperado
-----------------------

-   Riscos e impacto do SQL Injection

-   Boas práticas com SQLite e Express

-   Validação e sanitização de entrada

-   Gerenciamento de sessão

-   Criação de ambientes seguros para testes controlados

* * * * *

📜 Licença
----------

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.

* * * * *

👨‍🏫 Autor
-----------

**@shellt3r & gpt-o3-mini**\
Projeto desenvolvido com fins educacionais para treinamento e conscientização de segurança da informação.
