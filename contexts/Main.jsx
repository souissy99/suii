import { createContext, useState, useContext } from "react";

const MainContext = createContext();
export default MainContext;

export function MainProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState({
    limit: 151,
    offset: 0,
    type: '',
  });

  const handleChange = (ev) => {
    setSearch(ev.target.value)
    // setPokemonList(
    //   pokemonList.filter((item) => {
    //     return item.name.includes(ev.target.value);
    //   })
    // )
  };

  const handleFiltredList = (ev) => {
    setFilteredList({
      ...filteredList,
      [ev.target.name]: ev.target.value,
    });
  }

  return (
    <MainContext.Provider value={{ search, handleChange, filteredList, handleFiltredList, setPokemonList, pokemonList }}>
      {children}
    </MainContext.Provider>
  );
}

export const useFilter = () => useContext(MainContext);