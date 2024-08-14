/**
 * This hook is used to preserve block editor classes when updating the className attribute of a wordpress block.
 *
 * Given the setAttributes function and a regex matching any potentially pre-existing custom classes,
 * this hook returns a function with the parameters of the current className string,
 * and an object representing the custom attributes to be appended to the className string.
 * It is necessary that the keys of the passed object match the structure of the custom class naming system.
 *
 * Regular values: `custom-${key}-${value}`, Boolean values: if value is true, `is-${key}`
 *
 * Ex: `{ width: 'full', rounded: true }` equates to `custom-width-full is-rounded`
 *
 * When the function is called, it preserves any block-editor classes (the text remaining after replacing using the given regex).
 * Then the function creates the new custom className using the attributes object.
 * Finally, it will update the block's className attribute with the combined customClasses string and blockEditorClasses string.
 *
 * @param {Function} setAttributes The setAttributes function from a wordpress block
 * @param {RegExp} regex The regex for matching any and all custom classes being generated
 * @returns {Function}
 */
export const useUpdateClassNameAttribute = (
  setAttributes: (attrs: Partial<{ className: string }>) => void,
  regex: RegExp
) => {
  /**
  
   */
  return (
    current = '',
    attributes: { [key: string]: boolean | string | number }
  ) => {
    try {
      if (!attributes || Object.keys(attributes).length === 0)
        throw new Error('useUpdateClassNameAttribute Hook: Missing attributes');
      const blockEditorClasses = current.replace(regex, '').trim();
      let customClasses = '';
      let hasCustomValue = false;
      Object.entries(attributes).forEach(([key, value]) => {
        if (
          typeof value !== 'boolean' &&
          typeof value !== 'string' &&
          typeof value !== 'number'
        ) {
          throw new Error(`Invalid value type: ${typeof value}`);
        }
        if (value) {
          hasCustomValue = true;
          // Custom classes for blocks currently comes in two varieties, Boolean and Variable.
          // Each style has its own distinct string implementation.
          if (typeof value === 'boolean') {
            customClasses += ` is-${key}`;
          } else {
            customClasses += ` custom-${key}-${value}`;
          }
        }
      });
      // In order to not pollute the block editor additional css classnames field:
      // if no custom attributes have been set, then customClasses should be empty string
      if (!hasCustomValue) customClasses = '';

      setAttributes({
        className: `${customClasses} ${blockEditorClasses}`.trim(),
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
};
