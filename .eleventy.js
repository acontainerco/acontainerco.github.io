module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksShortcode("productImage", (type, product, url, alt) => {
        return "<img src = '/img/{{type}}/{{product}}/{{url}}' alt = '{{alt}}'></img>";
    });
}