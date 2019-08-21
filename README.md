# k2 partnering

Front-end test

## Metodologia e arquitetura

Levando em consideração que menos é mais(code clean), acredito que não seja necessário a implementação de uma biblioteca como o Redux nesta aplicação, visando mantê-la a mais enxuta possível em todos os níveis. Até cogitei implementar a metodologia Flux, para que os módulos/componentes pudessem se comunicar entre eles, mas ao invés disso, utilizei as técnicas de fluxo de dados unidirecional(one-way data flow) do React mantendo tudo rápido e modular. Fazendo uma analogia, é como se a arquitetura da aplicação fosse uma fonte de água, onde o fluxo de água escorre de cima para baixo(elevate state). Tudo aqui é dividido em componentes reutilizaveis, funções e styles dividindo suas responsabilidades e escopo, ou seja, cada "pedaço" da aplicacão, por menor que seja, foi componentizada para que cada componente possa ser reutilizado por outras "Views", deixando assim a aplicação escalável, tanto os arquivos JSX quanto os SCSS.

<!-- ![Diagrama](./fluxo.png) -->

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

__Nota__: Por motivos de segurança, os browsers não suportam a metodologia *push state* do React. Para que você consiga acessar a aplicação em questão em modo produção, eu fiz o deploy no seguinte link: [Refrix.shop App](https://refrix.herokuapp.com). Se você possui um servidor local capaz de executar aplicações web, e quiser buildar o projeto com o comando `npm run build`, não se esqueça de ajustar o caminho relativo no arquivo `./package.json` na propriedade `homepage:`

### Modo de testes

Para testar/validar todos os recursos da aplicação em questão em modo interativo, execute o seguinte comando no terminal

    npm run test

## Principais tecnologias integradas

* [X] JavaScript / **ES6**.
* [X] prop-types.
* [X] React.
* [X] Axios.
* [X] Webpack.
* [X] Babel.
* [X] ESlint.
* [X] Jest.
* [X] JSON.
* [X] SCSS.
* [X] JSX.
* [X] font-awesome.

## Estrutura de arquivos fonte **/src**

    src/
    ├── assets
    │   ├── icons
    │   │   └── bottle.svg
    │   ├── imgs
    │   │   └── logo.png
    │   └── scss
    │       ├── Brand.scss
    │       ├── Card.scss
    │       ├── Header.scss
    │       ├── Modal.scss
    │       ├── Setup.scss
    │       ├── Source.scss
    │       └── Table.scss
    ├── components
    │   ├── Brand.jsx
    │   ├── Card.jsx
    │   ├── Header.jsx
    │   ├── Modal.jsx
    │   └── Table.jsx
    ├── index.js
    ├── registerServiceWorker.js
    ├── test
    │   └── App.test.js
    └── views
        └── App.jsx

## Estrutura de arquivos de produção **/build**

    build/
    ├── asset-manifest.json
    ├── favicon.ico
    ├── index.html
    ├── logo192.png
    ├── logo512.png
    ├── manifest.json
    ├── precache-manifest.965873b72ce683ad9c2053253d7ea919.js
    ├── robots.txt
    ├── service-worker.js
    └── static
        ├── css
        │   ├── 2.400f043a.chunk.css
        │   ├── 2.400f043a.chunk.css.map
        │   ├── main.30a1322a.chunk.css
        │   └── main.30a1322a.chunk.css.map
        ├── js
        │   ├── 2.a4473385.chunk.js
        │   ├── 2.a4473385.chunk.js.map
        │   ├── main.a9a0779e.chunk.js
        │   ├── main.a9a0779e.chunk.js.map
        │   ├── runtime~main.2b0bf425.js
        │   └── runtime~main.2b0bf425.js.map
        └── media
            ├── fontawesome-webfont.674f50d2.eot
            ├── fontawesome-webfont.912ec66d.svg
            ├── fontawesome-webfont.af7ae505.woff2
            ├── fontawesome-webfont.b06871f2.ttf
            └── fontawesome-webfont.fee66e71.woff

__Nota__: Essa aplicação esta gerando um warning no console quando executada em modo desenvolvimento `npm start`, pois a depêndencia Muicss/Select esta utilizando um mêtodo de ciclio de vida(componentWillReceiveProps) deprecated, eu ainda teste outros 4 componentes Selects em outros dependêcias, porem todos com o mesmo warning.
Sobretudo, é este é apenas um aviso que a React irá descontinuar esse mêtodo nas versoes 17.X.
