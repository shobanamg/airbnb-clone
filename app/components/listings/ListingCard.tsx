'use client';

import type { Reservation } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useCountries from '../../hooks/useCountries';
import type { SafeListing, SafeUser } from '../../types';
import HeartButton from '../HeartButton';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(data.locationValue);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div
          className="
            relative
            aspect-square
            w-full
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            className="
              h-full
              w-full
              object-cover
              transition
              group-hover:scale-110
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div
            className="
            absolute
            right-3
            top-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="text-lg font-semibold">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-neutral-500">{data.category}</div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">$ {data.price}</div>
        <div className="font-light">night</div>
      </div>
    </div>
  );
};
export default ListingCard;
