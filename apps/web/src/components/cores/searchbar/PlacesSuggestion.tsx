'use client';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useState, useEffect } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';

export default function PlacesAutocomplete({
  width,
  setValue,
  className,
}: any) {
  const libraries: Libraries = ['places'];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  if (loadError) {
    console.error('Error loading Google Maps API:', loadError);
  }

  const {
    ready,
    value,
    setValue: setAutocompleteValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    callbackName: 'initAutocomplete',
  });

  useEffect(() => {
    window.initAutocomplete = () => {
      console.log('Google Maps API script loaded and ready');
    };
    console.log('value', value);
    console.log('ready?', ready);
    console.log('isloaded?', isLoaded);
    console.log('status', status);
    console.log('suggestion', { status, data });
  }, [isLoaded, ready, value]);

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    setAutocompleteValue(e.target.value);
  };

  const handleSelect =
    ({ description }: any) =>
    () => {
      setAutocompleteValue(description, false);
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);

        let city = '';
        let country = '';
        results[0].address_components.forEach((component) => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        console.log(`City: ${city}, Country: ${country}`);
        setValue('location', `${lat},${lng}`);
      });
    };

  const renderSuggestions = () => {
    return (
      <Command
        className={`absolute shadow-md mt-1 z-20 rounded-lg h-auto ${width ? width : 'w-80'}`}
      >
        <CommandList>
          <CommandGroup>
            {data.map((suggestion, i) => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
              } = suggestion;

              return (
                <CommandItem
                  className="hover:cursor-pointer"
                  onSelect={handleSelect(suggestion)}
                  key={place_id}
                >
                  {main_text} {secondary_text}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  };

  return (
    <>
      <div ref={ref}>
        <Input
          value={value}
          onChange={handleInput}
          disabled={!isLoaded || !ready}
          placeholder="Where are you going?"
          className={
            className +
            'truncate text-black focus:outline-none rounded-full lg:rounded-none lg:rounded-l-full w-80 p-8'
          }
        />
        {status === 'OK' && value && <ul>{renderSuggestions()}</ul>}
      </div>
    </>
  );
}
