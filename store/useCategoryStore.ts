import { FC } from "react";
import { SvgProps } from "react-native-svg";
import { create } from "zustand";
import StartIcon from '../assets/icons/start_icon.svg';
import ChairIcon from '../assets/icons/chair_icon.svg';
import TableIcon from '../assets/icons/table_icon.svg';
import ArmcharIcon from '../assets/icons/armchair_icon.svg';
import BedIcon from '../assets/icons/bed_icon.svg';
import LambIcon from '../assets/icons/lamb_icon.svg';

type Category = {
  id: number;
  title: string;
  Icon: FC<SvgProps>;
  active?: boolean;
}

interface CategoryStore {
  categoryid?: number;
  categories: Category[];
  setCategories: (value: CategoryStore['categories']) => void;
}


const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [
    {
      id: 1,
      title: 'Popular',
      Icon: StartIcon,
      active: true,
    },
    {
      id: 2,
      title: 'Chair',
      Icon: ChairIcon,
    },
    {
      id: 3,
      title: 'Table',
      Icon: TableIcon,
    },
    {
      id: 4,
      title: 'Armchairs',
      Icon: ArmcharIcon,
    },
    {
      id: 5,
      title: 'Beds',
      Icon: BedIcon,
    },
    {
      id: 6,
      title: 'Lamb',
      Icon: LambIcon,
    }
  ],
  setCategories: (categories) => set(() => {
    return {
      categoryid: categories.find((category) => category.active)?.id,
      categories,
    }
  }),
}));

export default useCategoryStore;