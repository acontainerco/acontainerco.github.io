module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksGlobal("randomHash", () => {
        let hash = [...Array(5)];
        return hash.map( 
            () => {
                return Math.floor(Math.random() * 16).toString(16);
            }
        ).join('');
    });
}