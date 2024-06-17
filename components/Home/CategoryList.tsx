import React, { FC, memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import CategoryItem from './CategoryItem';
import useCategoryStore from '../../store/useCategoryStore';
import Animated, { LinearTransition } from 'react-native-reanimated';

type CategoryListProps = {
  categories: any[];
}


const CategoryList: FC<CategoryListProps> = memo(() => {
  const { styles } = useStyles(style);
  const { categories, setCategories } = useCategoryStore();

  const onCategoryPress = useCallback((id: number) => {
    setCategories(categories.map(category => ({
      ...category,
      active: category.id === id
    })))
  }, [categories]);

  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.container]}
    >
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CategoryItem onPress={onCategoryPress} {...item} />}
      />
    </Animated.View>
  )
});

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    marginTop: px(20),
  }
}))

export default CategoryList;