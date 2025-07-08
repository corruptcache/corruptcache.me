const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Create a dedicated collection for blog posts
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/**/*.md");
  });

  // Create a collection for archives
  eleventyConfig.addCollection("postsByMonth", (collection) => {
    const posts = collection.getFilteredByTag("blog").reverse();
    const postsByMonth = {};
    posts.forEach((post) => {
      const year = post.date.getFullYear();
      const month = post.date.toLocaleString('default', { month: 'long' });
      const key = `${month} ${year}`;
      if (!postsByMonth[key]) {
        postsByMonth[key] = [];
      }
      postsByMonth[key].push(post);
    });
    return postsByMonth;
  });

  // Create a collection of all unique tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet].sort();
  });

  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return;
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  });

  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });
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
