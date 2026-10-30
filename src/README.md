# Profile README source

The profile at [github.com/operatoruplift](https://github.com/operatoruplift) is a stack of PNG cards rendered from HTML, so it can use the RVAClassic brand fonts, real screenshots and layouts that Markdown alone cannot.

- `content.mjs` holds every word, number and link. Facts come from [rvaclassic.xyz](https://rvaclassic.xyz/).
- `cards/` holds one template per section, and `cards/index.mjs` sets their order.
- Text cards render twice (light and dark), and README.md shows the one that matches the visitor's GitHub theme.

```sh
npm install
npm run build              # render img/, write README.md, run the checks
npm run preview            # README screenshots, light and dark, desktop and phone (.preview/)
npm run capture            # refresh the live-site screenshots in src/assets/builds/
npm run check -- --remote  # after a push: the published images match img/
```
