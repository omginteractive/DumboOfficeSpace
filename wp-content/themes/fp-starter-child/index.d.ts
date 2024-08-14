// The following declaration is importing wordpress types into the global wp. This allows wp to be used & typed in typescript files.
declare const wp: {
  blockEditor: typeof import('@wordpress/block-editor');
  blocks: typeof import('@wordpress/blocks');
  components: typeof import('@wordpress/components');
  compose: typeof import('@wordpress/compose');
  element: typeof import('@wordpress/element');
  hooks: typeof import('@wordpress/hooks');
};
