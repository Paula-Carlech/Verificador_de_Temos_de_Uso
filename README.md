# SysATU - Analisador de Termos de Uso e Contratos

O **SysATU** é uma ferramenta inteligente projetada para simplificar a leitura e compreensão de documentos jurídicos digitais. O projeto utiliza Inteligência Artificial para identificar cláusulas abusivas, riscos potenciais e pontos de atenção em Termos de Uso e contratos.

## 🚀 Evolução do Projeto

Este projeto nasceu originalmente em **2023 como um Trabalho de Conclusão de Curso (TCC)**. Inicialmente focado em uma abordagem estática e explicativa, o SysATU passou por um processo de **atualização e modernização** completo para se tornar uma aplicação dinâmica e preditiva impulsionada por IA.

### Comparativo de Evolução

| Característica | Versão 2023 (TCC) | Versão 2026 (Modernizada) |
| :--- | :--- | :--- |
| **Tecnologia Base** | PHP Estático / Symfony 3.4 | React + Symfony Moderno |
| **Análise** | Manual / Consultiva | Inteligência Artificial (Gemini) |
| **Entrada** | Apenas Texto | Texto e PDF |
| **Interface** | Tradicional | Minimalista (Mantine UI) |

---

## 📸 Demonstração Visual

### Interface Principal
**Versão Antiga (2023):**
![Versão Antiga do SysATU](sysatu(antigo).png)

**Versão Nova (2026):**
![Versão Nova do SysATU](sysatu(novo).png)

---

### Seção "Sobre"
**Versão Antiga (2023):**
![Sobre Antigo](sobre(antigo).png)

**Versão Nova (2026):**
![Sobre Novo com Modal](sobre(novo).png)

---

## 🧠 Como Funciona

O sistema oferece uma interface intuitiva onde o usuário pode:
1.  **Fazer upload** de contratos em formato PDF ou TXT.
2.  **Colar o texto** manualmente para análise imediata.
3.  **Processamento por IA**: O backend em Symfony integra-se à API do Google Gemini para realizar uma varredura jurídica.
4.  **Feedback Visual**: O sistema retorna alertas claros sobre riscos detectados (ex: venda de dados, renovação automática).

## 🛠️ Tecnologias Utilizadas

### Frontend
-   **React** com Vite.
-   **Mantine UI**: Interface moderna e acessível.
-   **Tabler Icons**: Identidade visual intuitiva.

### Backend
-   **PHP 8.2+** e **Symfony Framework**.
-   **API Platform**: Endpoints padronizados.
-   **Smalot PDF Parser**: Extração de texto de PDFs.

### Inteligência Artificial
-   **Google Gemini IA**: Motor de processamento de linguagem natural.

## 🎨 Layout e Design

O design é focado na funcionalidade. O layout utiliza componentes centralizados para facilitar o fluxo de uso e conta com um botão flutuante de informações ("Sobre") que abre um modal moderno com o histórico do projeto.

---
*SysATU ® 2023 - 2026*