// This file is used for adding sass variable values to the sass-loader in laravel mix
const theme = require('../../theme.json');

const colors = theme.settings.color.palette;
const fonts = theme.settings.typography.fontFamilies;
const sizes = theme.settings.typography.fontSizes;
const spacings = theme.settings.spacing.spacingSizes;
const { weight, tracking, leading, maxWidth, breakPoints } =
  theme.settings.custom;

let compiledSassVars = '';

colors.map((color) => {
  return (compiledSassVars += ` $color-${color.slug}: ${color.color};`);
});
fonts.map((font) => {
  return (compiledSassVars += ` $font-${font.slug}: ${font.fontFamily};`);
});
sizes.map((size) => {
  return (compiledSassVars += ` $font-${size.slug}: ${size.size};`);
});
spacings.map((spacing) => {
  return (compiledSassVars += ` $space-${spacing.slug}: ${spacing.size};`);
});
Object.keys(maxWidth).map((key) => {
  return (compiledSassVars += ` $max-w-${key}: ${maxWidth[key]};`);
});
Object.keys(leading).map((key) => {
  return (compiledSassVars += ` $leading-${key}: ${leading[key]};`);
});
Object.keys(weight).map((key) => {
  return (compiledSassVars += ` $font-${key}: ${weight[key]};`);
});
Object.keys(tracking).map((key) => {
  return (compiledSassVars += ` $tracking-${key}: ${tracking[key]};`);
});
Object.keys(breakPoints).map((key) => {
  return (compiledSassVars += ` $breakpoint-${key}: ${breakPoints[key]};`);
});

// Custom Variables -- Allows adding variables for patterns without bloating css
compiledSassVars += '$header_height: 92px;';
compiledSassVars += '$adminbar_height: 32px;';
compiledSassVars += '$adminbar_height_mobile: 46px;';

module.exports = {
  compiledSassVars,
};
