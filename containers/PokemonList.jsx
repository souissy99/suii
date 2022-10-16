import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import pokeBallLoading from "assets/lottie-json/pokeball-loading-animation.json";
import { PCard } from "../stories/components/card/PCard";
import styles from '../styles/Home.module.css';
import { useFilter } from "contexts/Main";

const url = "https://pokeapi.co/api/v2/";

const PokemonList = ({}) => {
    const [limit, setLimit] = useState(0);
    const { filteredList, pokemonList, setPokemonList, search } = useFilter();

    const getPokemons = () => {
        if (filteredList.type != '') {
            return fetch(`${url}type/${filteredList.type}`).then(res => res.json()).then((data) => {
                setPokemonList(data.pokemon);
                return data.pokemon;
            })
        } else {
            return fetch(`${url}pokemon?limit=${filteredList.limit}&offset=${filteredList.offset}`).then((res) => res.json()).then((data) => {
                setPokemonList(data.results);
                return data.results;
            })
        }
    }
    
    const { isLoading, data, error, refetch } = useQuery(['pokeList'], getPokemons);

    useEffect(() => {
        refetch()
    }, [filteredList, refetch]);


    if (isLoading) return (
        <Lottie animationData={pokeBallLoading} />
    );

    if (error) return "Error";

    return (
        <>
            {pokemonList.slice(0, filteredList.limit).filter((data) => {
                if (data.name) return data.name.includes(search);
                else return data.pokemon.name.includes(search);
            }).map((item, index) => {
                return (
                    <div key={index} className={styles.list_container}>
                        <PCard key={index} item={item} />
                    </div>
                );
            })}
        </>
    );
}

export default PokemonList;