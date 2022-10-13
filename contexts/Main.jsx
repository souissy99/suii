import { createContext, useState, useContext } from "react";

const MainContext = createContext();
export default MainContext;

export function MainProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState({
    limit: 151,
    offset: 0,
    type: [''],
  });

  const handleChange = (ev) => {
    setSearch(ev.target.value);

    // setFilteredApparts(
    //   data.filter(
    //     (
    //       appart // one appart by one
    //     ) =>
    //       // filter condition
    //       appart.title.toLowerCase().includes(ev.target.value.toLowerCase())
    //   )
    // );
  };

  const handleFiltredList = (ev) => {
    setFilteredList({
      ...filteredList,
      [ev.target.name]: ev.target.value,
    });
  }

  return (
    <MainContext.Provider value={{ search, handleChange, filteredList, handleFiltredList }}>
      {children}
    </MainContext.Provider>
  );
}

export const useFilter = () => useContext(MainContext);