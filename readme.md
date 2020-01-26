![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=for-the-badge)

![WebComponent PWC Tabview](https://raw.githubusercontent.com/paraboly/pwc-tabview/master/assets/logo.png)

[![Simple and self-contained tabview](https://img.shields.io/badge/-Simple%20and%20self%20contained%20tabview%20via%20Paraboly-lightgrey?style=for-the-badge)](https://github.com/Paraboly/pwc-tabview)

[![npm version](https://img.shields.io/npm/v/@paraboly/pwc-tabview.svg?style=for-the-badge)](https://www.npmjs.com/package/@paraboly/pwc-tabview)
[![npm](https://img.shields.io/npm/dt/@paraboly/pwc-tabview.svg?style=for-the-badge)](https://www.npmjs.com/package/@paraboly/pwc-tabview)
![Platform - Platform Free Web](https://img.shields.io/badge/-Web%20%7C%20Platform%20Free-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <img alt="WebComponent PWC Tabview"
        src="https://raw.githubusercontent.com/paraboly/pwc-tabview/master/assets/Screenshots/JSLibraryBoilerplate.png" />
</p>

## [Live JSFiddle Example](https://jsfiddle.net/starikcetin/4j2qpsto/)

# Installation

## Script tag

- Put two script tags similar to this in the head of your index.html:

```html
<script
  type="module"
  src="https://unpkg.com/@paraboly/pwc-tabview@latest/dist/pwc-tabview/pwc-tabview.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/@paraboly/pwc-tabview@latest/dist/pwc-tabview/pwc-tabview.js"
></script>
```

- Then you can use the element anywhere in your template, JSX, html etc

## Node Modules

- Run `npm install @paraboly/pwc-tabview --save`
- Put a script tag similar to this `<script src='node_modules/@paraboly/pwc-tabview/dist/pwc-tabview.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

## In a stencil-starter app

- Run `npm install @paraboly/pwc-tabview --save`
- Add an import to the npm packages `import @paraboly/pwc-tabview;`
- Then you can use the element anywhere in your template, JSX, html etc

# Usage

```html
<pwc-tabview>
  <pwc-tabview-tab title="title text">
    Tab content
  </pwc-tabview-tab>

  <pwc-tabview-tab title="title text">
    Tab content
  </pwc-tabview-tab>
</pwc-tabview>
```

# Authors

S. Tarık Çetin (starikcetin), tarik.cetin@paraboly.com | cetinsamedtarik@gmail.com

# License

WebComponent PWC Tabview is available under the MIT license.

See the [LICENSE](/LICENSE) file for more info.
