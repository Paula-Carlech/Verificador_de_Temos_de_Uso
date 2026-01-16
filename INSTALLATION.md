# Guia de Instalação - SysATU

Este guia fornece as instruções necessárias para configurar e rodar o projeto SysATU (Frontend e Backend) em seu ambiente local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (v18 ou superior) e **npm**
- **PHP 8.2** ou superior
- **Composer** (Gerenciador de dependências PHP)
- **Symfony CLI** (Opcional, mas recomendado para o backend)

---

## 🔑 Como gerar a chave da API (Google Gemini)

O SysATU utiliza a inteligência artificial do Google para analisar os contratos. Para obter sua chave gratuita:

1.  Acesse o [Google AI Studio](https://aistudio.google.com/).
2.  Faça login com sua conta Google.
3.  No menu lateral, clique em **"Get API key"**.
4.  Clique no botão **"Create API key"** (selecione um projeto ou crie um novo).
5.  Copie a chave gerada para utilizá-la na configuração do Backend abaixo.

---

## 🔧 Configuração do Backend (API)

A API foi desenvolvida com **Symfony** e atua como o motor de processamento e integração com a IA.

1.  **Acesse a pasta da API:**
    ```bash
    cd caminho_instalado/Verificador_de_Temos_de_Uso/api
    ```

2.  **Instale as dependências do PHP:**
    ```bash
    composer install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie ou edite o arquivo `.env.local` e adicione sua chave obtida no AI Studio:
    ```env
    GEMINI_API_KEY=sua_chave_aqui
    ```

4.  **Inicie o servidor do Symfony:**
    ```bash
    symfony serve
    ```
    *A API estará disponível em: `http://127.0.0.1:8000`*
    *A documentação interativa do **API Platform** estará em: `http://127.0.0.1:8000/api`*

---

## 💻 Configuração do Frontend (Web)

O frontend é uma aplicação moderna construída com **React**, **Vite** e **Mantine UI**.

1.  **Acesse a pasta raiz do projeto:**
    ```bash
    cd caminho_instalado/Verificador_de_Temos_de_Uso/
    ```

2.  **Instale as dependências do Node:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *O sistema estará disponível em: `http://localhost:5173`*

---

## 🛠️ Comandos Úteis

### Backend
-   `symfony server:stop`: Para parar o servidor da API.
-   `composer require <package>`: Para instalar novas bibliotecas PHP.

### Frontend
-   `npm run build`: Para gerar a versão de produção do sistema.
-   `npm run lint`: Para verificar erros de estilo no código.

## 📝 Observações Importantes
-   Certifique-se de que a porta **8000** (Backend) e **5173** (Frontend) estejam livres.
-   O frontend está configurado para se comunicar com a API em `http://localhost:8000/api/analyze`. Caso o Symfony suba em uma porta diferente, atualize o arquivo `src/services/api.js`.

---
*SysATU ® 2023 - 2026*