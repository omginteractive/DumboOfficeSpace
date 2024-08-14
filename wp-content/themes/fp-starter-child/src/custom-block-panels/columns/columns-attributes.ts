function createCustomColumnsAttributes(
  settings: Partial<{
    attributes: { [key: string]: { type: string; default: string } };
  }>,
  name: string
) {
  if (typeof settings.attributes !== 'undefined') {
    if (name === 'core/columns') {
      settings.attributes = Object.assign(settings.attributes, {
        customOrder: {
          type: 'boolean',
          default: false,
        },
      });
    }
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'bi/core-columns-custom-attributes',
  createCustomColumnsAttributes
);
