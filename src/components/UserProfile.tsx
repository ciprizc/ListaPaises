import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [country, setCountry] = useState<any[]>([]);
  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/alpha?codes=" + id)
      .then(async (res) => await res.json())
      .then((res) => {
        setCountry(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile-container">
      {country.map((item, index) => (
        <>
        <div className="profile-header">
          <h1>Perfil de {item.name.common}</h1>
        </div>
        <div key={index} className="country-info">
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

