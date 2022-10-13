import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import pokeBallLoading from "assets/lottie-json/pokeball-loading-animation.json";
import { PCard } from "../stories/components/card/PCard";
import styles from '../styles/Home.module.css';
import { useFilter } from "contexts/Main";

const url = "https://pokeapi.co/api/v2/";

const PokemonList = ({}) => {
    const { filteredList } = useFilter();

    const getPokemons = () => {
        return fetch(`${url}pokemon?limit=${filteredList.limit}&offset=${filteredList.offset}`).then((res) => res.json())
    }
    
    const { isLoading, data, error, refetch } = useQuery(['pokeList'], getPokemons);

    useEffect(() => {
        refetch()
    }, [filteredList, refetch])


    if (isLoading) return (
        <Lottie animationData={pokeBallLoading} />
    );

    if (error) return "Error";

    return (
        <>
            {data.results.map((item, index) => {
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