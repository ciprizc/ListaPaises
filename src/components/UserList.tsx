import React, { useState, useEffect, useRef, useMemo } from "react";
import "../index.css";

import { Link } from "react-router-dom";

interface User {
  id: {
    value: string;
  };
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    country: string;
  };
}

export enum SortBy {
  NONE = "none",
  NAME = "name",
  SURNAME = "official",
}

export default function UserList() {
  const [showColor, setShowColor] = useState(false);
  const [sorting, setSorting] = useState(SortBy.NONE);
  const [countries, setcountries] = useState<any[]>([]);
  const originalcountries = useRef<any[]>([]);
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(async (res) => await res.json())
      .then((res) => {
        setcountries(res);
        originalcountries.current = res;
      })
      .catch((err) => console.log(err));
  }, []);



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
    console.log(sorting);
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
      console.log([...filtercountries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    ))
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
  return (
    <>
      <button onClick={() => setShowColor(!showColor)}>Colorear lineas</button>

      <button onClick={() => setcountries(originalcountries.current)}>
        Restart countries
      </button>
      <input
        placeholder="Filter country"
        onChange={(e) => {
          setFilterCountry(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => toogleSort(SortBy.NAME)}>Name</th>
            <th onClick={() => toogleSort(SortBy.SURNAME)}>Surname</th>
          </tr>
        </thead>
        <tbody>
          {sortedcountries.map((country, index) => {
            const backgroundColor = index % 2 === 0 ? "#333" : "#555";
            const color = showColor ? backgroundColor : "transparent";
            

            return (
              <tr key={country.cioc} style={{ backgroundColor: color }}>
                <td>
                  <Link to={`/user/${country.cca2}`}>
                    <img src={country.flags.png} alt="" className="flag"/>
                  </Link>
                </td>
                <td>{country.name.common}</td>
                <td>{country.name.official}</td>
                {/* <td>{user.location.country}</td> */}
                <td>
                  {" "}
                  <button
                    onClick={() => {
                      const newcountries = sortedcountries.filter(
                        (u) => u.name.common !== country.name.common
                      );
                      setcountries(newcountries);
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
