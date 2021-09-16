# 📌 Static Site JC

Simple static website for React developers. Enhancing simple React apps by pre-rendering capabilities and other cool things!

## Features

1. React
2. Support HTML pre-rendering for each defined routes.
3. Critical CSS pre-rendering with @emotion/css.
4. SPA navigation feel without full page reload with @loadable/components
5. Build with Webpack.
6. [WIP] SEO Support
7. Markdown Support (MDX)

## Development Insights

Insights while developing isomorphic Static Site with React.

#### CSS Modules

For using Node to pre-render React using `renderToString` or other related render functions, CSS Modules need to be processed by webpack with server config using `exportOnlyLocals`.

**Work-around**: Use `@emotion` for CSS-in-JS solution to provide styling and critical pre-rendering css at initial page load.

Can be extended to packages.
