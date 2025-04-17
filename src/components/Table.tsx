import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for the Table component
 * @interface TableProps
 * @property {any[]} sortedcountries - Array of country objects to display in the table
 * @property {function} toogleSort - Function to toggle sorting of the table
 * @property {boolean} showColor - Whether to show alternating row colors
 * @property {React.Dispatch<React.SetStateAction<any[]>>} setcountries - Function to update the countries array
 */
interface TableProps {
  sortedcountries: any[];
  toogleSort: (sortBy: SortBy) => void;
  showColor: boolean;
  setcountries: React.Dispatch<React.SetStateAction<any[]>>;
}

/**
 * Enum for table sorting options
 * @enum {string}
 */
export enum SortBy {
    NONE = "none",
    NAME = "name",
    SURNAME = "official",
  }

/**
 * Table component that displays country information in a sortable table
 * @param {TableProps} props - The component props
 * @param {any[]} props.sortedcountries - Array of country objects to display
 * @param {function} props.toogleSort - Function to toggle sorting of the table
 * @param {boolean} props.showColor - Whether to show alternating row colors
 * @param {React.Dispatch<React.SetStateAction<any[]>>} props.setcountries - Function to update the countries array
 * @returns {JSX.Element} The rendered table
 */
export default function Table({ sortedcountries, toogleSort, showColor, setcountries }: TableProps) {
    return (
    <>
    <h1>Table</h1>
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
                {/* <td>{country.location.country}</td> */}
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
};
