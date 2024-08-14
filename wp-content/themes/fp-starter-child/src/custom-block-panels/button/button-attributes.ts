function createCustomButtonAttributes(
  settings: Partial<{
    attributes: { [key: string]: { type: string; default: string } };
  }>,
  name: string
) {
  if (typeof settings.attributes !== 'undefined') {
    if (name === 'core/button') {
      settings.attributes = Object.assign(settings.attributes, {
        customType: {
          type: 'string',
          default: 'primary',
        },
        customIcon: {
          type: 'string',
          default: '',
        },
        customWidth: {
          type: 'string',
          default: 'dynamic',
        },
      });
    }
  }
  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'bi/button-custom-attributes',
  createCustomButtonAttributes
);
