import { SelectControlProps } from '@wordpress/components/build-types/select-control/types';
import theme from '../../../theme.json';
import { useUpdateClassNameAttribute } from '../hooks/useUpdateClassNameAttribute';

function MyControlledSelect({
  label,
  options,
  handler,
  initial,
}: SelectControlProps & { handler: (value: string) => void; initial: string }) {
  const { useState } = wp.element;
  const { SelectControl } = wp.components;
  const [value, setValue] = useState(initial);

  return (
    <SelectControl
      __nextHasNoMarginBottom
      label={label}
      options={options}
      onChange={(selectedItem) => {
        handler(selectedItem);
        setValue(selectedItem);
      }}
      value={value}
    />
  );
}

const createCustomGroupPanels = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      if (props.name !== 'core/group') {
        return <BlockEdit {...props} />;
      }
      const { Fragment, useEffect } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody } = wp.components;
      const {
        setAttributes,
        attributes: { className, customMaxWidth },
      } = props;

      const customClassesRE = /(\s*custom-max-width-[\S]*)/g;
      const updateClassName = useUpdateClassNameAttribute(
        setAttributes,
        customClassesRE
      );

      useEffect(() => {
        updateClassName(className, {
          'max-width': customMaxWidth,
        });
      }, [customMaxWidth]);

      const onChangeHandler = (value: string) => {
        if (value === 'none') {
          value = '';
        }
        setAttributes({
          customMaxWidth: value,
        });
      };

      const { maxWidth } = theme.settings.custom;
      const maxWidthOptions = Object.entries(maxWidth).map(([key, value]) => ({
        label: value,
        value: key,
      }));
      maxWidthOptions.unshift({ label: 'None', value: 'none' });

      return (
        <Fragment>
          <BlockEdit {...props} />
          <InspectorControls>
            <PanelBody
              className={'is-custom-panel group-custom-max-width-panel'}>
              <MyControlledSelect
                options={maxWidthOptions}
                label={'Select Max Width'}
                handler={onChangeHandler}
                initial={customMaxWidth}
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    };
  },
  'createCustomGroupPanels'
);

wp.hooks.addFilter(
  'editor.BlockEdit',
  'bi/group-custom-inspector-controls',
  createCustomGroupPanels
);
