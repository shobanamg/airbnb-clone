'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import useRentModal from '../../hooks/useRentModal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { categories } from '../navbar/Categories';
import Modal from './Modal';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setValue,
    watch,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      title: '',
      description: '',
      price: 1,
    },
  });
  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };
  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    return axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? 'Create' : 'Next'),
    [step]
  );

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : 'Back'),
    [step]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Airbnb your home!"
        subtitle="What type of place do you want to rent?"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(categoryItem) =>
                setCustomValue('category', categoryItem)
              }
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subtitle="Add the location of your place"
        />
        <CountrySelect
          onChange={(country) => setCustomValue('location', country)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subtitle="Add the location of your place"
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests can your place accommodate?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms can guests use?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place to guests"
          subtitle="Add a description to your place"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};
export default RentModal;
