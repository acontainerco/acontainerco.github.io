const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");

const Image = require("@11ty/eleventy-img");

const tagList = require("./utils/collections/tagList.js");
const markdown = require("markdown-it")(({
    html: true
  }))

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(eleventyWebcPlugin, {
        components: [
            "npm:@11ty/eleventy-img/*.webc"
        ]
    });

    eleventyConfig.addPlugin(eleventyImagePlugin, {
		formats: ["auto"],
        widths: ["auto"],
		urlPath: "./img/",
        outputDir: "./dist/img/",
		defaultAttributes: {
			loading: "lazy",
			decoding: "async"
		}
	});

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

}
