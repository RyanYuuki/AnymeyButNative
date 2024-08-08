import React from 'react';
import { Text as RNText, TextProps } from './Themed.tsx';
import { StyleSheet, TextStyle } from 'react-native';

type Weight = '400' | '500' | '500I' | '600' | '700';

interface CustomTextProps extends TextProps {
  weight?: Weight;
}

const fontFamilies: Record<Weight, string> = {
  '400': 'Poppins',
  '500': 'Poppins500',
  '500I': 'Poppins500I',
  '600': 'Poppins600',
  '700': 'Poppins700',
};

export function Text({ weight = '400', className, style, ...props }: CustomTextProps) {
  const fontFamily = fontFamilies[weight] || fontFamilies['400']; // Default to '400' if weight is not found

  return (
    <RNText
      className={className}
      {...props}
      style={[style, { fontFamily } as TextStyle]}
    />
  );
}

const styles = StyleSheet.create({
  // Add styles if needed
});
