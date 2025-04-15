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

export default function CountriesList() {
    const [showColor, setShowColor] = useState(false);
    const [sorting, setSorting] = useState(SortBy.NONE);
    const [countries, setcountries] = useState<any[]>([]);
    const originalcountries = useRef<any[]>([]);
    const [filterCountry, setFilterCountry] = useState("");

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

    const filtercountries = useMemo(() => {
        return typeof filterCountry === "string" && filterCountry.length > 0
            ? countries.filter((country) => {
                  return country.name.common
                      .toLowerCase()
                      .includes(filterCountry.toLowerCase());
              })
            : countries;
    }, [filterCountry, countries]);

    const sortedcountries = useMemo(() => {
        if (sorting === SortBy.NONE) return filtercountries;
        let sort = (a: any, b: any) =>
            a.name.common.localeCompare(b.name.common);

        if (sorting === SortBy.NAME) {
            console.log(
                [...filtercountries].sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                )
            );
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
