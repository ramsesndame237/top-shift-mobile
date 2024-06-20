import React, { forwardRef } from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { useStyles } from "react-native-unistyles";


const Text = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  const { theme } = useStyles();
  return (
    <RNText
      ref={ref}
      style={[
        {
          color: theme.palette.text,
          ...theme.typography.body1,
        },
        ...[(props.style ?? {} as object)],
      ]}
    >
      {children}
    </RNText>
  )
})

export default Text;