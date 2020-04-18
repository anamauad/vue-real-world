# vue-real-world

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Creating this project

```
> npm i -g @vue/cli

> vue create vue-real-world

Vue CLI v4.3.1
? Please pick a preset: Manually select features
? Check the features needed for your project: Router, Vuex, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
? Pick the package manager to use when installing dependencies: NPM
```

## Run the JSON-server mock

```
> json-server --watch db.json
```

Para adicionar 1.5 segundos à resposta

```
> json-server -d 1500 --watch db.json
```

## Descobrir quais pacotes podem ser atualizados

```
> npm outdated
Package   Current  Wanted  Latest  Location
prettier   1.19.1  1.19.1   2.0.4  vue-real-world
```

## Possíveis implementações de NProgress bar

[NProgress](http://ricostacruz.com/nprogress/) is a progress bar library

- API interceptors
  - Axios Interceptors allow us to intercept our requests and responses adding additional functionality, like starting and stopping a progress bar
  - Problems:
    - Not optimal for multiple API calls at the same time
    - Templates get rendered before the API call is returned
- In-component route guards
  - Every component must be implement this
- Global and per-route guards <-- _better option_
  - Define load data methods in router configuration
