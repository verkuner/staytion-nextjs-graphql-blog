"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


import { useSearches } from "./searchcontext";

export interface SearchProps {
  onSearch: (value: string) => void;
}

export default function Search({ onSearch }: SearchProps): JSX.Element {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>();
  const debouncedSearch = useRef(debounce(onSearch, 5000)).current;
  const { selectedSearch } = useSearches();
  
    const inputRef: any = useRef();

  useEffect(() => {
    if (typeof router.query.query === "string") {
      setSearchValue(router.query.query);
    }

    console.log("query = " + searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [router.query.query, debouncedSearch]);

  // useEffect(() => {
  //   setSearchValue(selectedSearch || "");
  // }, [selectedSearch]);

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { value } = event.target;
    setSearchValue(value);
    //debouncedSearch(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      event.preventDefault();
      debouncedSearch.cancel();
      onSearch(searchValue);
    }
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="peer block w-full item-center rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        type="text"
        placeholder="Search blogs"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

    </div>
  );
}
