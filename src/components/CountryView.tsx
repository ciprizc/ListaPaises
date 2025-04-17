import { useQuery } from "@tanstack/react-query";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";

/**
 * Component that displays detailed information about a specific country
 * Uses the country code from URL parameters to fetch and display country data
 * @returns {JSX.Element} Rendered component with country details or loading/error states
 */
export default function CountryView() {
  const params = useParams();
  const [country, setCountry] = useState<any[]>([]);

  const id = params.id as string;
  
  /**
   * Fetches country data based on the country code from URL parameters
   */
  const countryData = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const res = await fetch("https://restcountries.com/v3.1/alpha?codes=" + id);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
  })
  useEffect(() => {
    if (countryData.data) {
      setCountry(countryData.data);
    }
  }, [countryData.data]);

  if (countryData.isLoading) return <h1>Loading...</h1>;
  if (countryData.error) return <NotFound />;

  return (
    <div className="profile-container">
      {country.map((item, indecountryData) => (
        <>
        <div className="profile-header">
          <h1>Perfil de {item.name.common}</h1>
        </div>
        <div key={indecountryData} className="country-info">
          <img src={item.flags.png} alt="Country Flag" className="country-flag" />
          <h2>{item.name.common}</h2>
          <h3>{item.name.official}</h3>
          <p>Población: {item.population}</p>
          <p>Región: {item.region}</p>
          <p>Subregión: {item.subregion}</p>
          <p>Capital: {item.capital}</p>
          <p>Idiomas: {Object.values(item.languages).join(", ")}</p>
          <p>En español: {item.translations.spa.common}</p>

        </div>
        </>
        
      ))}
    </div>
  );
};

