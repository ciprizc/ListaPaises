import React from 'react';
import { Link } from 'react-router-dom';
interface TableProps {
  sortedcountries: any[];
  toogleSort: (sortBy: SortBy) => void;
  showColor: boolean;
  setcountries: React.Dispatch<React.SetStateAction<any[]>>;
}

export enum SortBy {
    NONE = "none",
    NAME = "name",
    SURNAME = "official",
  }

  export default function Table({ sortedcountries, toogleSort, showColor, setcountries }: TableProps) {
    return (
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
                  <Link to={`/${country.cca2}`}>
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
  );
};
