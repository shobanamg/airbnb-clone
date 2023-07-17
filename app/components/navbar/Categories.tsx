import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain } from 'react-icons/tb';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the Beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
];

const Categories = () => {
  return (
    <Container>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
          pt-4
        "
      >
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
