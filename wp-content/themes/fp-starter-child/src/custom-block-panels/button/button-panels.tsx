import { useUpdateClassNameAttribute } from '../hooks/useUpdateClassNameAttribute';

const Cross = () => {
  const { Icon } = wp.components;
  return (
    <Icon
      icon={
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.5 8.61902L1.5 11.619M1.5 11.619L4.5 14.619M1.5 11.619H21.5M8.5 4.61902L11.5 1.61902M11.5 1.61902L14.5 4.61902M11.5 1.61902V21.619M14.5 18.619L11.5 21.619M11.5 21.619L8.5 18.619M18.5 8.61902L21.5 11.619M21.5 11.619L18.5 14.619"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
    />
  );
};
const createCustomButtonPanels = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      if (props.name !== 'core/button') {
        return <BlockEdit {...props} />;
      }

      const { Fragment, useEffect } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, Button } = wp.components;
      const {
        setAttributes,
        attributes: { className, customWidth, customType, customIcon },
      } = props;

      const customClassesRE =
        /(\s*custom-width-[\S]*|\s*custom-type-[\S]*|\s*custom-icon-[\S]*)/g;
      const updateClassName = useUpdateClassNameAttribute(
        setAttributes,
        customClassesRE
      );

      const widthValues = ['dynamic', 'medium', 'large', 'full'];
      const typeValues = ['primary', 'secondary', 'tertiary'];
      const iconValues: [string, JSX.Element][] = [['cross', <Cross />]];

      useEffect(() => {
        updateClassName(className, {
          width: customWidth,
          type: customType,
          icon: customIcon,
        });
      }, [customWidth, customType, customIcon]);

      return (
        <Fragment>
          <BlockEdit {...props} />
          <InspectorControls>
            <PanelBody
              className={'is-custom-panel'}
              title={'Select Width'}>
              {widthValues.map((value) => (
                <Button
                  key={value}
                  isSmall
                  isPressed={value === customWidth}
                  style={{
                    fontSize: '16px',
                    border: '1px solid black',
                  }}
                  onClick={() => {
                    if (customWidth === value) return;
                    setAttributes({ customWidth: value });
                  }}>
                  {value.slice(0, 1).toUpperCase().concat(value.slice(1))}
                </Button>
              ))}
            </PanelBody>
            <PanelBody
              className={'is-custom-panel'}
              title={'Select Type'}>
              {typeValues.map((value) => (
                <Button
                  key={value}
                  isSmall
                  isPressed={value === customType}
                  style={{
                    fontSize: '16px',
                    border: '1px solid black',
                  }}
                  onClick={() => {
                    if (customType === value) return;
                    setAttributes({ customType: value });
                  }}>
                  {value.slice(0, 1).toUpperCase().concat(value.slice(1))}
                </Button>
              ))}
            </PanelBody>
            <PanelBody
              className={'is-custom-panel'}
              title={'Select Icon'}>
              {iconValues.map(([key, value]) => (
                <Button
                  key={key}
                  icon={value}
                  isPressed={customIcon === key}
                  onClick={() => {
                    if (customIcon === key) {
                      return setAttributes({ customIcon: '' });
                    }
                    setAttributes({ customIcon: key });
                  }}
                />
              ))}
            </PanelBody>
          </InspectorControls>
        </Fragment>
      );
    };
  },
  'createCustomButtonPanels'
);

wp.hooks.addFilter(
  'editor.BlockEdit',
  'bi/button-custom-panels',
  createCustomButtonPanels
);
