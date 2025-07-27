const fs = require('fs');
const path = require('path');

module.exports = () => {
  const imagePath = path.join(__dirname, '../assets/images/gallery');
  const imageFiles = fs.readdirSync(imagePath);

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  const images = imageFiles.filter(file => {
    return allowedExtensions.includes(path.extname(file).toLowerCase());
  });

  return images.map(file => {
      return {
          url: `/assets/images/gallery/${file}`,
          // Create a basic alt text from the filename, e.g., 'nismo-factory.jpg' -> 'nismo factory'
          alt: path.basename(file, path.extname(file)).replace(/-/g, ' ')
      }
  });
};
