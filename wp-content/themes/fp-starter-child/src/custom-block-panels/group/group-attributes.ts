function createCustomGroupAttributes(
  settings: Partial<{
    attributes: { [key: string]: { type: string; default: string } };
  }>,
  name: string
) {
  if (typeof settings.attributes !== 'undefined') {
    if (name === 'core/group') {
      settings.attributes = Object.assign(settings.attributes, {
        customMaxWidth: {
          type: 'string',
          default: '',
        },
      });
    }
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'bi/core-group-custom-attributes',
  createCustomGroupAttributes
);
