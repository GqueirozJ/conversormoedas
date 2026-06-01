# 💱 Conversor de Moedas Global

Uma aplicação web responsiva e dinâmica para conversão de moedas em tempo real, focada na experiência do usuário (UX), acessibilidade e precisão matemática de dados financeiros.

## 🚀 Visão Geral
Este projeto foi desenvolvido para ir além de um conversor estático tradicional. Ele consome dados atualizados diretamente do mercado financeiro e utiliza uma lógica arquitetural de "moeda pivô", permitindo a conversão de qualquer moeda de origem para múltiplas moedas de destino simultaneamente.

## ✨ Funcionalidades Implementadas

* **Integração de API em Tempo Real:** Consumo assíncrono (`fetch` / `async-await`) da AwesomeAPI para capturar as cotações exatas do momento, exibindo a data e hora da última oscilação do mercado.
* **Máscara Monetária Dinâmica:** Formatação instantânea do valor digitado em tempo real, utilizando a API nativa `Intl.NumberFormat` para garantir a pontuação correta de milhares e centavos no padrão brasileiro (ex: R$ 1.000,99).
* **Lógica de Conversão Multi-Moedas:** Capacidade de selecionar uma moeda base (como Real, Iene, Dólar, Euro, Libra ou Yuan) e calcular o valor equivalente em várias outras moedas ao mesmo tempo.
* **UX/UI Avançada e Interativa:** * Fluxo de navegação em duas etapas (Validação de entrada -> Escolha de destinos).
  * Ocultação dinâmica: a moeda de origem selecionada desaparece inteligentemente da lista de checkboxes de destino para evitar redundâncias lógicas.
  * Validações de erro (prevenção de envios nulos, strings ou valores zerados).
* **Acessibilidade e Usabilidade (Novidades):**
  * **Tema Escuro (Dark Mode):** Alternância fluida de cores para conforto visual, gerenciada dinamicamente via manipulação de classes no DOM.
  * **Auto-scroll:** Rolagem automática suave para a área de resultados após a conversão, garantindo que o usuário mobile não perca a resposta de vista.
* **Design Responsivo (Mobile-First):** Interface limpa no estilo "Fintech", adaptando-se perfeitamente a smartphones e desktops.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica e inputs controlados para ativação de teclado numérico em dispositivos móveis (`inputmode="numeric"`).
* **CSS3:** Flexbox, Media Queries, transições suaves (transitions) e design moderno sem o uso de frameworks externos.
* **JavaScript (Vanilla):** Manipulação do DOM, funções assíncronas, tratamento de JSON, lógica matemática cambial e scroll dinâmico.

## ⚙️ Como executar o projeto localmente

1. Clone este repositório ou faça o download dos arquivos.
2. Abra a pasta do projeto no seu editor de código de preferência.
3. Abra o arquivo `index.html` diretamente em seu navegador web (ou utilize extensões como o Live Server).
4. *Nota: É necessária uma conexão ativa com a internet para que a aplicação consiga realizar o fetch na API e carregar as cotações do dia.*

## 🧪 Próximos Passos (Foco em Quality Assurance)

Como parte da melhoria contínua e aplicação de conceitos de Qualidade de Software (QA/SDET), as futuras atualizações mapeadas para este repositório incluem:
* Criação de um Plano de Casos de Teste (Caminhos Felizes e Tratamento de Exceções).
* Testes de requisição e validação de tempo de resposta da API utilizando o **Postman**.
* Implementação de automação de testes End-to-End (E2E) simulando o fluxo do usuário na interface com **Cypress**.
