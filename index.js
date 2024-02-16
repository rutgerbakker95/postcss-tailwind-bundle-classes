module.exports = {
  postcssPlugin: 'postcss-tailwind-bundle-classes',
  Rule(rule) {
    rule.selectors = rule.selectors.map((selector) => {
      const matches = selector.match(/([a-z]+):\(([a-z0-9- ]+)\)/g);
      if (matches) {
        matches.forEach((match) => {
          const [prefix, classes] = match.slice(0, -1).split(':(');
          const newClasses = classes.split(' ').map((cls) => `${prefix}:${cls}`);
          selector = selector.replace(match, newClasses.join(' '));
        });
      }
      return selector;
    });
  },
};

module.exports.postcss = true;
