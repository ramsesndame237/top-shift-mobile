import React, {FC, memo, useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import px from '../../utils/px';
import CategoryItem from './CategoryItem';
import useCategoryStore from '../../store/useCategoryStore';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useCategory} from "../../hooks/useCategories";
import useProductStore from "../../store/product.store";

type CategoryListProps = {
    categories: any[];
}


const CategoryList: FC<CategoryListProps> = memo(() => {
    const {styles} = useStyles(style);
    const {data: categories, isLoading} = useCategory()
    const {setCategorieSelected} = useProductStore()


    const [activeCategorie, setActiveCategorie] = useState<string | undefined>('beauty')
    const onCategoryPress = useCallback(async (title: string) => {
        setActiveCategorie(title)
        await setCategorieSelected(title)

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
                renderItem={({item}) => <CategoryItem onPress={onCategoryPress} title={item}
                                                      active={item === activeCategorie}/>}
            />
        </Animated.View>
    )
});

const style = createStyleSheet(({palette, typography}) => ({
    container: {
        marginTop: px(20),
    }
}))

export default CategoryList;