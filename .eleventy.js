const tagList = require("./utils/collections/tagList.js");

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksGlobal("randomHash", () => {
        let hash = [...Array(5)];
        return hash.map( 
            () => {
                return Math.floor(Math.random() * 16).toString(16);
            }
        ).join('');
    });

    /**
     * Add Collections
     *
     * @link https://www.11ty.io/docs/collections
     */
    eleventyConfig.addCollection("tagList", tagList);
}
