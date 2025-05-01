# Rasputin-TS

## Requisitos
- Node.js >= 18
- MySQL/Postgres

## Instalação
```bash
npm install

🤖 RasputinIA
RasputinIA é um chatbot de inteligência artificial desenvolvido com TypeScript, Node.js e Sequelize ORM, integrado a uma interface web. Seu objetivo é fornecer interações conversacionais dinâmicas e personalizadas, utilizando a API do Gemini para geração de respostas em linguagem natural.​

🚀 Tecnologias Utilizadas
TypeScript: Superset do JavaScript que adiciona tipagem estática ao código, proporcionando maior robustez e manutenção.

Node.js: Ambiente de execução para JavaScript no lado do servidor, permitindo a construção de aplicações escaláveis.

Express.js: Framework minimalista para Node.js, facilitando a criação de APIs e rotas.

Sequelize ORM: Interface de mapeamento objeto-relacional para Node.js, suportando diversos bancos de dados relacionais.

MySQL: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados das conversas.

dotenv: Módulo que carrega variáveis de ambiente a partir de um arquivo .env, mantendo informações sensíveis fora do código-fonte.

Gemini API: Interface de inteligência artificial utilizada para gerar respostas em linguagem natural.​

📁 Estrutura do Projeto
pgsql
Copiar
Editar
rasputin-ia/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
⚙️ Configuração
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/rasputin-ia.git
cd rasputin-ia
Instale as dependências:

bash
Copiar
Editar
npm install
Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar
Editar
DB_URL=mysql://usuario:senha@localhost:3306/chatbot_db
GEMINI_API_KEY=sua_chave_gemini
SESSION_SECRET=sua_chave_de_sessao
Compile o projeto:

bash
Copiar
Editar
npm run build
Inicie o servidor:

bash
Copiar
Editar
npm start
O servidor estará disponível em http://localhost:3000.

🛠️ Funcionalidades
Interface web para interações com o chatbot.

Armazenamento de conversas e mensagens no banco de dados.

Geração de respostas utilizando a API do Gemini.

Gerenciamento de sessões de usuários.​

🐛 Solução de Problemas
Erro de variáveis de ambiente não definidas:

Certifique-se de que o arquivo .env está corretamente configurado e localizado na raiz do projeto.​

Erro de incompatibilidade de colunas no banco de dados:

Verifique se os tipos de dados das colunas relacionadas por chaves estrangeiras são compatíveis.​

📄 Licença
Este projeto está licenciado sob a MIT License.​
Stack Overflow
+4
blog.rocketseat.com.br
+4
Medium
+4