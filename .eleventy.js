const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img").default;
const tagList = require("./utils/collections/tagList.js");

const markdown = require("markdown-it")(({
    html: true,
    breaks: true,
    linkify: true
  }))

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
    return "";
}

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy("src/static");

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

    eleventyConfig.addNunjucksGlobal("joinArtistNames", (artists) => {
        names = artists.map(artist => {
            return artist.name;
        });
        return names.join(", ");
    });

    eleventyConfig.addFilter('markdown', value => {
        return markdown.render(value);
    });

    eleventyConfig.addNunjucksGlobal("createAnchorTag", (title) => {
        return title.replace(/ /g, "-").toLowerCase();
    })

    eleventyConfig.addShortcode('image', (imgDir, src, alt, size) => {
        if(!src) return "";
        let payload = Buffer.from(JSON.stringify({
            dir: imgDir,
            src: src,
            alt: alt,
            size: size
        })).toString("base64");

        return `<img data-eleventy-img="${payload}">`;
    });

    eleventyConfig.addTransform("eleventy-img", async (content, outputPath) => {
        if(!outputPath || !outputPath.endsWith(".html")) {
            return content;
        }

        let placeholderRegex = /<img data-eleventy-img="([^"]+)">/g;
        let matches = [...content.matchAll(placeholderRegex)];
        if(matches.length === 0) {
            return content;
        }

        let uniquePayloads = new Set(matches.map(match => match[1]));
        let replacements = new Map();

        await Promise.all([...uniquePayloads].map(async (payload) => {
            let data = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
            let filepath = `./src/img/${data.dir}/${data.src}`;

            let meta = await Image(filepath, {
                urlPath: "/img/",
                outputDir: `./dist/img/`,
                formats: ["avif", "jpeg", "jpg", "webp", "png"],
                widths: [300, 600, 900]
            });

            let images = meta.jpeg || meta.png || meta.webp || meta.avif;

            if(!images || images.length === 0) {
                throw new Error(`[eleventy-img] No usable image format found for ${filepath}. Generated keys: ${Object.keys(meta).join(", ")}`);
            }

            if(data.size) {
                images = images.filter(img => img.width == data.size);
            }

            if(!images.length) {
                throw new Error(`[eleventy-img] No image at size ${data.size} for ${filepath}`);
            }

            let imageData = images[images.length - 1];

            replacements.set(payload, `<img src="${imageData.url}" alt="${data.alt || ''}">`);
        }));

        return content.replace(placeholderRegex, (match, payload) => {
            return replacements.get(payload) || match;
        });
    });

    eleventyConfig.addDataExtension("yaml", (contents) =>{
        return yaml.load(contents);
    });

    eleventyConfig.addDataExtension("yml", (contents) =>{
        return yaml.load(contents);
    });
}
