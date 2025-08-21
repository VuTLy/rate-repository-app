import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ children, style, fontWeight, fontSize, ...props }) => {
  const textStyles = [styles.text, style];

  // Apply fontWeight from props
  if (fontWeight === 'bold') {
    textStyles.push(styles.bold);
  }

  // Apply fontSize from props
  if (fontSize === 'subheading') {
    textStyles.push(styles.subheading);
  }

  return (
    <NativeText style={textStyles} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
