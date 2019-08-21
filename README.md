# k2 partnering

Front-end test

## Metodologia e arquitetura

Levando em consideração que menos é mais(code clean), acredito que não seja necessário a implementação de uma biblioteca como o Redux nesta aplicação, visando mantê-la a mais enxuta possível em todos os níveis. Até cogitei implementar a metodologia Flux, para que os módulos/componentes pudessem se comunicar entre eles, mas ao invés disso, utilizei as técnicas de fluxo de dados unidirecional(one-way data flow) do React mantendo tudo rápido e modular. Fazendo uma analogia, é como se a arquitetura da aplicação fosse uma fonte de água, onde o fluxo de água escorre de cima para baixo(elevate state). Tudo aqui é dividido em componentes, funções e styles e suas responsabilidades, ou seja, cada "pedaço" da aplicacão, por menor que seja, foi componentizada para que cada componente possa ser reutilizado, tanto os arquivos JSX quanto os SCSS.

![Diagrama](./fluxo.png)

## Utilização da aplicação

__NOTA:__ Para executar qualquer um dos comandos abaixo, é imprescindível ter o gerenciador de dependencia NPM instalado  globalmente em seu computador, e nagevar para dentro do diretório root da aplicação para que todos os comandos possam ser executados com sucesso.

### Instalação local

Para fazer a instalação de todas as dependencias da aplicação em modo de desenvolvimento, execute a seguinte linha de comando no terminal

    npm install

__Nota__: Se após a intalação você receber informações de vulnerabilidades nas dependencias instaladas, execute o seguinte comando para corrigir eventuais vulnerabilidades

    npm audit fix && npm audit fix --force

### Modo desenvolvimento

Os arquivos do código fonte da aplicação estão contidos dentro do diretório `./src`.
Após concluir a instalação de todas as dependencias da aplicação, é possível executar o comando de desenvolvimento no terminal

    npm start

Depois de executar o comando acima, abra [http://localhost:3000](http://localhost:3000) para renderizar a aplicação no seu browser preferido.
A página será recarregada sempre que fizer edições no seu código fonte, você também verá quaisquer eventuais erros no código no seu console e no próprio browser.

### Modo produção/build

Este comando cria os arquivos de produção dentro do diretório `./build`. Os arquivos de produção são transpilados e minificados para obter uma melhor performance e otimização de trafego de dados ao acessar a aplicação. Para construir a aplicação em modo producão, execute o seguinte comando

    npm run build

__Nota__: Por motivos de segurança, os browsers não suportam a metodologia *push state* do React. Para que você consiga acessar a aplicação em questão em modo produção, eu disponibilizei a mesma no seguinte link: [Teste Bry](http://agenciatakeoff.com.br/bry). Se você possui um servidor local capaz de executar aplicações web, e quiser buildar o projeto com o comando `npm run build`, não se esqueça de ajustar o caminho relativo no arquivo `./package.json` na propriedade `homepage:`

### Modo de testes

Para testar/validar todos os recursos da aplicação em questão em modo interativo, execute o seguinte comando no terminal

    npm run test

## Principais tecnologias integradas

* JavaScript / **ES6**;
* React;
* Axios;
* Webpack;
* Babel;
* ESlint;
* Jest;
* JSON;
* SCSS;
* JSX;

## Estrutura de arquivos fonte **/src**

## Estrutura de arquivos fonte **/build**

## Requisítos

- HTML
- CSS
- Javascript

Objetivo deste teste é medir seu conhecimento na área de HTML, javascript, css e boas práticas com essas tecnoligias.
Queremos que você elabore uma solução para o problema abaixo utilizando as tecnologias citadas acima.

### O que você deve fazer

Através de uma consulta ao nosso webservice (abaixo), você deve fazer o seguinte:

Webservice: [request](https://api.adsim.co/crm/api/v1/refrigerante/listar)
Metodo: GET
Content-Type: application/json

Com o resultado do webserver você deve preencher o combobox Refrigerante
Ao selecionar um refrigerante no combobox, o campo Preço deve ser preenchido com o preço do refrigerante selecionado.
Os campos totalizadores, precisam funcionar e considerar a quantidade de refrigerantes
Inclusive, a experiência do usuário e código HTML e CSS estão horríveis (nos ajude nisso).

#### BÔNUS

É possível adicionar uma novas linhas dinamicamente, com o mesmo comportamento descrito acima?
O que usar e o que será avaliado?

Você pode utilizar a seguintes tecnologias:

- React
- Bootstrap
- Vuejs
- Angular2+

### Será analisado

- Boas práticas
- Organização de código
- Uso de css para melhorar a interface
- Correções da estrutura html
- Lógica para resolver o problema
- Importante: Não é necessário uso de servidor web como apache e nginx.

### Como fazer

- Clone nosso repositório git (não faça Fork!)
- Desenvolva o código em sua máquina local
- Suba o código em seu repositório no Github
- Envie o link do seu repositório para jonsnow@adsim.com.br
- Caso não saiba como trabalhar com o Git, Envie um zip do seu código para joffrey@adsim.com.br

### Surpreenda-nos! e boa sorte :)
