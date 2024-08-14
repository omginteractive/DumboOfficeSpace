import { useUpdateClassNameAttribute } from '../hooks/useUpdateClassNameAttribute';

function MyToggleControl({
  setAttributes,
  initial,
}: {
  setAttributes: (attrs: Partial<{ customOrder: boolean }>) => void;
  initial: boolean;
}) {
  const { useState, useEffect } = wp.element;
  const { ToggleControl } = wp.components;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setAttributes({
      customOrder: value,
    });
  }, [value]);

  return (
    <ToggleControl
      label="Toggle Reverse Order"
      checked={value}
      onChange={() => {
        setValue((state) => !state);
      }}
    />
  );
}

const createCustomColumnsPanels = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      if (props.name !== 'core/columns') {
        return <BlockEdit {...props} />;
      }

      const { Fragment, useEffect } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody } = wp.components;
      const {
        setAttributes,
        attributes: { className, customOrder },
      } = props;

      const customClassesRE = /(\s*is-reversed)/g;
      const updateClassName = useUpdateClassNameAttribute(
        setAttributes,
        customClassesRE
      );

      useEffect(() => {
        updateClassName(className, {
          reversed: customOrder,
        });
      }, [customOrder]);

      return (
        <Fragment>
          <BlockEdit {...props} />
          <InspectorControls>
            <PanelBody className={'is-custom-panel'}>
              <MyToggleControl
                setAttributes={setAttributes}
                initial={customOrder}
              />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    };
  },
  'createCustomColumnsPanels'
);

wp.hooks.addFilter(
  'editor.BlockEdit',
  'bi/columns-custom-inspector-controls',
  createCustomColumnsPanels
);
