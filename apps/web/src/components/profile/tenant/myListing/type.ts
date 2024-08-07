export interface IMyListing {
    id: string;
    title: string;
    categoriesId: number;
    city: string;
    country: string;
    listing_images: { image_url: string }[];
    room_types: any[];
    listing_facilities: { facility: { id: string; facility: string } }[];
};

export interface ISelectedListing {
    onSelectListing: (listing: IMyListing) => void;
}

export interface SetSeasonalPriceFormProps {
    listing: IMyListing;
}

export interface SetNonAvailabilityFormProps {
    listing: IMyListing;
}
