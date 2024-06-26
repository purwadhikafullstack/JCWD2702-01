'use client';
import React, { useEffect, useState } from 'react';
import {
  useGetListingsFacilities,
  useGetListingsCategory,
  useGetListingsBySearch,
} from '@/features/listings/hooks/useGetListings';
import Loading from '../loading';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { toCurrency } from '@/components/cores/ToCurrency';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchListingCard } from '@/components/cards/SearchLisingCard';
import SearchBarVariant from '@/components/cores/searchbar/searchBarVariant';
import { SortSearch } from './sections/sortSelect';
export default function Page() {
  const searchParams = useSearchParams();
  const { categories } = useGetListingsCategory();
  const { facilities } = useGetListingsFacilities();
  const [priceRange, setPriceRange] = useState([0, 2500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState({
    sortBy: 'location',
    sort: '',
  });
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(Object.fromEntries(searchParams.entries())),
  );
  useEffect(() => {
    const selected = searchParams.get('category')?.split(',') || [];
    setSelectedCategories(selected);
    setSort({
      sortBy: searchParams.get('sortBy') || 'location',
      sort: searchParams.get('sort') || '',
    });
  }, [searchParams]);

  const { searchResult } = useGetListingsBySearch(queryParams.toString());

  const regex =
    /(&start_date=\d{4}-\d{2}-\d{2}&end_date=\d{4}-\d{2}-\d{2}&adults=\d+&children=\d+)/;
  const pagematcher = queryParams.toString().match(regex);

  const handleCategoryChange = (id: number | string) => {
    const params = new URLSearchParams(queryParams);
    params.set('category', String(id));
    window.history.replaceState(null, '', '?' + params.toString());
    setQueryParams(params);
  };

  const handleSortChange = (value: string) => {
    setSort({
      sortBy: value.split(',')[0],
      sort: value.split(',')[1],
    });
    const params = new URLSearchParams(queryParams);
    params.set('sortBy', value.split(',')[0]);
    if (value.split(',')[1]) {
      params.set('sort', value.split(',')[1]);
    } else {
      params.delete('sort');
    }

    window.history.replaceState(null, '', '?' + params.toString());
    setQueryParams(params);
  };

  if (!categories && !facilities && !searchResult) return <Loading />;
  return (
    <div className="my-32">
      <div className="flex flex-col w-[90vw] mx-auto lg:w-[60vw] flex-col items-center justify-center gap-8">
        <SearchBarVariant
          onSubmitCallback={(val: any) => setQueryParams(val)}
          dateParam={{
            from: searchParams.get('start_date'),
            to: searchParams.get('end_date'),
          }}
          guestsParam={{
            adults: searchParams.get('adults'),
            children: searchParams.get('children'),
          }}
          locationParam={searchParams.get('loc_term')}
        />
        <div className="grid md:flex gap-8">
          <div className="md:top-20 md:sticky h-[500px] rounded-lg w-[300px]">
            <div id="head" className="flex items-center justify-between">
              <div className="font-bold text-lg">Filter</div>
              <div className="text-sm">Reset</div>
            </div>
            <div className="grid gap-4">
              <div>
                <div className="text-sm font-bold my-1">Price range</div>
                <div className="text-xs text-stone-400 font-medium">
                  Per room, per night
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Slider
                    defaultValue={priceRange}
                    onValueChange={(range: any) => {
                      setPriceRange(range);
                      const params = new URLSearchParams(queryParams);
                      params.set('minPrice', range[0]);
                      params.set('maxPrice', range[1]);
                      window.history.replaceState(
                        null,
                        '',
                        '?' + params.toString(),
                      );
                      setQueryParams(params);
                    }}
                    max={10000000}
                    step={50000}
                    min={0}
                  />
                  <div className="numbers-font text-xs flex justify-between">
                    <span className="font-medium">
                      {toCurrency(priceRange[0])}
                    </span>
                    <span className="font-medium">
                      {toCurrency(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-bold my-2">Categories</div>
                <Select
                  defaultValue={searchParams.get('category') || ''}
                  onValueChange={(value) => handleCategoryChange(value)}
                >
                  <SelectTrigger className="rounded-full w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {categories?.map((x: any, i: number) => (
                      <SelectItem value={`${x.id}`}>{x.category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm font-bold my-2">Facilities</div>
                <ScrollArea className="h-[200px]">
                  {facilities?.map((x: any, i: number) => (
                    <div
                      className="text-sm group py-1 flex items-center gap-2 font-medium"
                      key={i}
                      onClick={() => console.log('facility ID ', x.id)}
                    >
                      <Checkbox
                      // checked={selectedCategories.includes(String(x.id))}
                      />
                      <label className="group-hover:cursor-pointer text-stone-600">
                        {x.facility}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </div>
          {searchResult?.length < 1 ? (
            <div className="w-full bg-pink-200 mx-auto">No listings found</div>
          ) : (
            <div className="flex flex-col gap-3 w-full items-end">
              <SortSearch sortChangeHandler={handleSortChange} sort={sort} />
              <div className="w-full grid gap-3">
                {searchResult?.map((x: any, i: number) => (
                  <Link
                    key={i}
                    href={`/sandbox/${x.slug}${pagematcher ? `?${pagematcher[0]}` : ''}`}
                  >
                    <SearchListingCard
                      key={x.id}
                      imageUrl={`${process.env.NEXT_PUBLIC_BASE_API_URL}${x.listing_images[0].image_url}`}
                      title={x.title}
                      city={x.city}
                      country={x.country}
                      price={x.room_types[0].price}
                      seasonalPrice={
                        x.room_types[x.price_indexes?.room_index]
                          ?.seasonal_prices[x.price_indexes?.price_index].price
                      }
                      avgRating={x.avg_rating}
                      facilities={x.listing_facilities}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
