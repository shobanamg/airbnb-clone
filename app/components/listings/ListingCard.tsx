'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import useCountries from '../../hooks/useCountries';
import type { SafeListing, SafeReservation, SafeUser } from '../../types';
import Button from '../Button';
import HeartButton from '../HeartButton';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;
  }, [reservation]);

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

        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            onClick={handleCancel}
            disabled={disabled}
            label={actionLabel}
            small
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
