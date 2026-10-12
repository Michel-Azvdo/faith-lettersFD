# Faith Letters

Aplicação web em React + TypeScript para enviar cartas de encorajamento a missionários. Projeto desenvolvido para a disciplina de Front-End II (ADS).

## Funcionalidades

- Lista de missionários e de cartas, com carregamento otimizado (`React.lazy`, `Suspense` e Skeletons)
- Envio de cartas por um modal com formulário validado (React Hook Form + Zod)
- Estado global com Context API e hooks customizados
- Autenticação com **Clerk**
- Roteamento com **React Router**:
  - `/` — página protegida (somente usuários autenticados)
  - `/open` — página pública
  - qualquer outra rota — redireciona para o login (deslogado) ou para `/` (logado)

## Tecnologias

- React 19 e TypeScript
- Vite
- React Router (`react-router-dom`)
- Clerk (`@clerk/clerk-react`)
- React Hook Form, Zod e `@hookform/resolvers`
- CSS Modules
- lucide-react
- json-server (API simulada)

## Pré-requisitos

- Node.js e npm
- Uma conta gratuita no [Clerk](https://clerk.com)

## Configuração do Clerk

1. Acesse o painel do Clerk e crie um novo aplicativo.
2. Ative os métodos de login desejados (e-mail, Google etc.).
3. Escolha a opção **React** e copie a **Publishable Key** (começa com `pk_test_`).
4. Na raiz do projeto, crie o arquivo `.env.local` com:

```
VITE_CLERK_PUBLISHABLE_KEY=sua_publishable_key_aqui
```

> Use apenas a Publishable Key. A Secret Key (`sk_test_`) nunca deve ser usada no front-end.
> O arquivo `.env.local` está no `.gitignore` e não é enviado ao repositório.

## Como executar

Instale as dependências:

```bash
npm install
```

Em um terminal, inicie a API simulada (json-server, porta 3000):

```bash
npm run server
```

Em outro terminal, inicie a aplicação:

```bash
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`).

Se você reiniciar o projeto depois de criar ou alterar o `.env.local`, pare e rode `npm run dev` de novo para o Vite ler a chave.

## Como testar a autenticação

1. Abra `/` deslogado: você deve ser redirecionado para a tela de login do Clerk.
2. Entre com e-mail ou Google: você volta para `/` e vê o app.
3. Abra `/open`: a página abre sem exigir login.
4. Use o botão de usuário no cabeçalho para sair e confirme que `/` volta a pedir login.

## Estrutura principal

```
src/
├── api/            # serviço de acesso ao json-server
├── components/     # componentes (Modal, CreateLetterModal, listas, cards, skeletons)
├── contexts/       # AppContext (estado global)
├── hooks/          # hooks customizados
├── pages/
│   ├── home/       # página protegida (rota /)
│   └── open/       # página pública (rota /open)
├── schemas/        # schemas Zod
├── App.tsx         # rotas e controle de acesso
└── main.tsx        # ClerkProvider e AppContextProvider
```

## Scripts

| Comando          | Descrição                          |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Servidor de desenvolvimento (Vite) |
| `npm run server` | API simulada com json-server       |
| `npm run build`  | Build de produção                  |
| `npm run lint`   | Verificação de código              |
