# 📌 JC docs

Personal notes and documentation for frontend world and other things.

## Development Insights

Insights while developing isomorphic Static Site with React.

#### CSS Modules

For using Node to pre-render React using `renderToString` or other related render functions, CSS Modules need to be processed by webpack with server config using `exportOnlyLocals`.

**TODO** : Try to implement and bundle the <App />, please pay attention to the routing. The example of this can be viewed in epic-form cosmic.

**WORK-AROUND**: Use `@emotion` for CSS-IN-JS solution to provide styling and critical pre-rendering css at initial page load.
