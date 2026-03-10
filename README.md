# TaskUni

**TaskUni** é uma plataforma de produtividade acadêmica desenvolvida para estudantes universitários que querem organizar sua vida acadêmica com eficiência. Combina gerenciamento de tarefas, acompanhamento de notas e planejamento de estudos em uma interface única — com um visual escuro inspirado em glassmorphism, projetado para manter o foco no que importa.

![TaskUni Dashboard](https://raw.githubusercontent.com/pvteixeira/Projeto_Faculdade/main/public/dashboard-preview.png)

## Funcionalidades

- **Dashboard** — Visão geral do progresso acadêmico, tarefas pendentes e prazos próximos.
- **Gerenciamento de Disciplinas** — Organize matérias, professores e horários em um só lugar.
- **Rastreador de Tarefas** — Crie, priorize e acompanhe trabalhos com datas de entrega e controle de status.
- **Acompanhamento de Notas** — Registre notas por disciplina e monitore médias automaticamente.
- **Plano de Estudos** — Agende sessões de estudo alinhadas ao calendário do semestre.
- **Armazenamento Persistente** — Todos os dados são salvos localmente via `localStorage` — sem necessidade de conta.

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Roteamento | [React Router 7](https://reactrouter.com/) |
| Estado | Hooks customizados com `localStorage` |

## Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/pvteixeira/Projeto_Faculdade.git
cd Projeto_Faculdade
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Design

TaskUni foi construído com atenção à experiência visual:

- **Glassmorphism** — Efeitos de translucidez e blur para profundidade de interface.
- **Gradientes** — Acentos em roxo e ciano para uma estética contemporânea.
- **Responsividade** — Layout otimizado para diferentes tamanhos de tela.

---

Feito para estudantes que levam a sério o próprio desempenho.