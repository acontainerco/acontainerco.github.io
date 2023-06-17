//const { eleventyImagePlugin } = require("@11ty/eleventy-img");
//const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");

const Image = require("@11ty/eleventy-img");

const tagList = require("./utils/collections/tagList.js");
const markdown = require("markdown-it")(({
    html: true
  }))

module.exports = function(eleventyConfig) {

    eleventyConfig.addNunjucksGlobal("randomHash", () => {
        let hash = [...Array(5)];
        return hash.map(
            () => {
                return Math.floor(Math.random() * 16).toString(16);
            }
        ).join('');
    });

    eleventyConfig.addFilter('markdown', value => {
        return markdown.render(value);
    });

    eleventyConfig.addNunjucksShortcode('image', (imgDir, src, alt) => {

        let filepath = `./src/img/${imgDir}/${src}`;

        Image(filepath, {
            urlPath: "/img/",
            outputDir: `./dist/img/`,
            widths: [300, 600, 900],
            formats: ["jpeg", "webp"]
        });

        let meta = Image.statsSync(filepath);
        let data = meta.jpeg[meta.jpeg.length -1];

        return `<img src = "${data.url}" alt = "${alt}" loading = "lazy" decoding = "async">`;
    });

}
