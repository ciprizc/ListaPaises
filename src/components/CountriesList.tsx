import React, { useState, useEffect, useRef, useMemo } from "react";
import "../index.css";

import { Link } from "react-router-dom";
import Table from "./Table";
import { useQuery } from "@tanstack/react-query";

export enum SortBy {
    NONE = "none",
    NAME = "name",
    SURNAME = "official",
}

/**
 * Component that displays a list of countries with filtering and sorting capabilities.
 * Users can toggle color display, sort by different fields, and filter countries by name.
 * @returns {JSX.Element} Rendered component with countries list
 */
export default function CountriesList() {
    const [showColor, setShowColor] = useState(false);
    const [sorting, setSorting] = useState(SortBy.NONE);
    const [countries, setcountries] = useState<any[]>([]);
    const originalcountries = useRef<any[]>([]);
    const [filterCountry, setFilterCountry] = useState("");

    /**
     * Fetches countries data from the REST Countries API
     * @returns {Promise<any[]>} Promise that resolves to an array of country objects
     */
    const fetchcountries = async () => {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        return data;
    };

    const { isLoading, data, error } = useQuery({
        queryKey: ["countries"],
        queryFn: fetchcountries,
    });

    useEffect(() => {
        if (data) {
            setcountries(data);
            originalcountries.current = data;
        }
    }, [data]);

    /**
     * Toggles the sorting state based on the provided sort type
     * @param {string} value - The sort type to toggle (name or official)
     */
    const toogleSort = (value: string) => {
        if (value === SortBy.NAME) {
            setSorting(SortBy.NAME);
        }
        if (value === SortBy.SURNAME) {
            setSorting(SortBy.SURNAME);
        }

        if (sorting === value) {
            setSorting(SortBy.NONE);
        }
    };

    /**
     * Filters countries based on the input filter string
     * @returns {any[]} Filtered array of countries
     */
    const filtercountries = useMemo(() => {
        return typeof filterCountry === "string" && filterCountry.length > 0
            ? countries.filter((country) => {
                  return country.name.common
                      .toLowerCase()
                      .includes(filterCountry.toLowerCase());
              })
            : countries;
    }, [filterCountry, countries]);

    /**
     * Sorts the filtered countries based on the selected sorting criteria
     * @returns {any[]} Sorted array of countries
     */
    const sortedcountries = useMemo(() => {
        if (sorting === SortBy.NONE) return filtercountries;
        let sort = (a: any, b: any) =>
            a.name.common.localeCompare(b.name.common);

        if (sorting === SortBy.NAME) {
            return [...filtercountries].sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );
        }
        if (sorting === SortBy.SURNAME) {
            return [...filtercountries].sort((a, b) =>
                a.name.official.localeCompare(b.name.official)
            );
        }
        return [...filtercountries].sort(sort);
    }, [sorting, filtercountries]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    return (
        <>
            <button onClick={() => setShowColor(!showColor)}>
                Colorear lineas
            </button>

            <button onClick={() => setcountries(originalcountries.current)}>
                Restart countries
            </button>
            <input
                placeholder="Filter country"
                onChange={(e) => {
                    setFilterCountry(e.target.value);
                }}
            />
            <Table
                sortedcountries={sortedcountries}
                toogleSort={toogleSort}
                showColor={showColor}
                setcountries={setcountries}
            />
        </>
    );
}
