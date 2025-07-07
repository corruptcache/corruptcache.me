module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy({
    "src/assets": "/assets",
    "src/css": "/css",
    "src/js": "/js"
  });

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");
  eleventyConfig.addWatchTarget("src/_includes/");

  // Return configuration object
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
