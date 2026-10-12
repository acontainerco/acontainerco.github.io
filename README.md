# acontainer.co
Source for the website of Container, a book arts press. Built with [Eleventy](https://www.11ty.dev/).

## Usage
Clone the repo and install dependencies:
```sh
git clone https://github.com/acontainerco/acontainerco.github.io.git
cd acontainerco.github.io
npm install
```

### Start the dev server
```
npm run serve
```

### Build the static site
```
npm run build
```
Source files live in `src/`; the built site is written to `dist/`.

## Deployment
Pushes to `main` are built and published to GitHub Pages by `.github/workflows/main.yml`.

For more information, check out the [eleventy docs](https://www.11ty.dev/).
