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
    })
}