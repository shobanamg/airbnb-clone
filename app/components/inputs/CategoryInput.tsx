'use client';

import type { IconType } from 'react-icons';

interface CategoriesInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoriesInput: React.FC<CategoriesInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`hover: flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-black p-4 transition ${
        selected ? 'border-black' : 'border-neutral-200'
      }  `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoriesInput;
