const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");
const tagList = require("./utils/collections/tagList.js");
const markdown = require("markdown-it")(({
    html: true
  }))

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
    return html;
}

module.exports = function(eleventyConfig) {

    eleventyConfig.addNunjucksGlobal("randomHash", () => {
        let hash = [...Array(5)];
        return hash.map(
            () => {
                return Math.floor(Math.random() * 16).toString(16);
            }
        ).join('');
    });

    eleventyConfig.addNunjucksGlobal("isMultipleArtists", (artists) => {
        try{
        if (artists.length > 1) return true;
        } catch {
            // Pass
        }
        return false;
    });

    eleventyConfig.addFilter('markdown', value => {
        return markdown.render(value);
    });

    eleventyConfig.addNunjucksShortcode('image', (imgDir, src, alt, size) => {

        let filepath = `./src/img/${imgDir}/${src}`;
        console.log(`${imgDir}, ${src}, ${alt}`);
        Image(filepath, {
            urlPath: "/img/",
            outputDir: `./dist/img/`,
            formats: ["jpeg", "webp"],
            widths: [300, 600, 900]
        });

        attrs = {
            alt,
            sizes: [300, 600, 900],
            loading: "lazy",
            decoding: "async"
        };

        let meta = Image.statsSync(filepath, {widths: [300, 600, 900]});

        if(!size) size = meta.jpeg.length - 1;
        else meta = meta.jpeg.filter(img => img.width == size);

        let data = meta.jpeg[size];

        return `<img src = "${data.url}" alt = "${alt}">`;
    });

    eleventyConfig.addDataExtension("yaml", (contents) =>{
        return yaml.load(contents);
    });

    eleventyConfig.addDataExtension("yml", (contents) =>{
        return yaml.load(contents);
    });
}
