'use client';

import { useState } from 'react';
import { SelectCategory } from './selectCategoryForm';
import ListingGeneralDetails from './listingDetailsForm/listingGeneralDetailsForm';
import { ListingFacilitiesDetails } from './listingDetailsForm/listingFacilitiesDetailsForm';
import { ListingUploadImages } from './uploadImagesForm';
import ListingOverview from './listingOverview';
import { HotelRoomTypeForm } from './hotelRoomtypeForm';

export const NewListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const getCategory = localStorage.getItem('selectedCategory');
  console.log(getCategory);
  const [formData, setFormData] = useState({
    selectedCategory: null,
    generalDetails: {},
    facilitiesDetails: {},
    uploadImages: {},
  });

  const handleNext = (data: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSelectCategory = (selectedCategory: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedCategory,
    }));
    setCurrentStep(2);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectCategory onSelect={handleSelectCategory} onNext={handleNext} />
        );
      case 2:
        return (
          <ListingGeneralDetails
            data={formData.generalDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        if (Number(getCategory) === 10) {
          return <HotelRoomTypeForm onNext={handleNext} onBack={handleBack} />;
        } else {
          return (
            <ListingFacilitiesDetails
              data={formData.facilitiesDetails}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        }
      case 4:
        return (
          <ListingUploadImages
            data={formData.uploadImages}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return <ListingOverview />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-3/5 min-h-screen">
      {renderStep()}
    </div>
  );
};
