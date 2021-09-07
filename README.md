# 📌 Static Site

Personal notes and documentation for frontend world and other things.

## Development Insights

Insights while developing isomorphic Static Site with React.

#### CSS Modules

For using Node to pre-render React using `renderToString` or other related render functions, CSS Modules need to be processed by webpack with server config using `exportOnlyLocals`.

**Work-around**: Use `@emotion` for CSS-in-JS solution to provide styling and critical pre-rendering css at initial page load.

Can be extended to packages.
