import React, { FC } from 'react'
import { width } from '../../utils/px'
import { ScrollView, ScrollViewProps, StyleSheet, View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import space from '../../theme/space'

const Container: FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        ...[style ?? {} as object]
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  )
}

export const ViewContainer: FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View
      style={[
        styles.container,
        ...[style ?? {} as object]
      ]}
      {...props}
    >
      {children}
    </View>
  )
}


export const ScrollViewContainer: FC<ScrollViewProps> = ({ style, children, ...props }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={[
        styles.containerScrollview,
        ...[style ?? {} as object]
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    paddingHorizontal: space.container,
  },
  containerScrollview: {
    width,
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: space.container,
  }
})

export default Container