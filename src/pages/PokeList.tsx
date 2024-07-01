import axios from "axios"
import { useEffect, useState } from "react"
import { Pokemon } from "../Interface/IPokemon"
import GridView from "../SVG/GridView"
import ListView from "../SVG/ListView"
import PokemonCard from "../component/PokemonCard"
import PokemonList from "../component/PokemonList"

function PokeList() {
    const [pokemon, setPokemon] = useState<Pokemon[] | null>(null)
    const [view, setView] = useState<string>("grid");
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState(false);
    const [countPokemon, setCountPokemon] = useState<number>(0)
    const loadData = async (offset: number) => {
        try {
            setLoading(true)
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=16`)
            const data = response.data.results
            setCountPokemon(response.data.count)
            const pokemonResults: Pokemon[] = []
            for (let item of data) {
                const responseFromPokemon = await axios.get(item.url)
                const pokemonResult: Pokemon = {
                    name: item.name,
                    ability: responseFromPokemon.data.abilities.map((abl: any) => abl.ability.name),
                    photo: responseFromPokemon.data.sprites.other['official-artwork'].front_default,
                    types: responseFromPokemon.data.types.map((typ: any) => typ.type.name)
                }
                pokemonResults.push(pokemonResult)
            }
            setPokemon((prevPokemon) => prevPokemon ? [...prevPokemon, ...pokemonResults] : pokemonResults)
        } catch (err) {
            console.error('Error fetching the Pokémon data:', err);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadData(offset)
    }, [offset])
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
            return;
        }
        setOffset((prevOffset) => prevOffset + 20);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);
    return (
        <div className="flex w-full px-[150px] py-11 justify-center items-center font-inter">
            <div className="flex justify-center items-center flex-col gap-16 w-[1138px]">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2 font-semibold">
                        <p>Product</p>
                        <p>({countPokemon})</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className={`p-2 rounded-l-[10px] ${view === "grid" ? "bg-yellow" : ""}`} onClick={() => setView("grid")}>
                            <GridView />
                        </button>
                        <button className={`p-2 rounded-r-[10px] ${view === "list" ? "bg-yellow" : ""}`} onClick={() => setView("list")}>
                            <ListView />
                        </button>
                    </div>
                </div>
                {view == "grid" ?
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 w-full gap-[46px]">
                        {pokemon ? pokemon.map((item, index) => <PokemonCard {...item} key={index} />) : ''}
                    </div>
                    :
                    <div className="grid grid-cols-1 justify-items-center w-full gap-[18px]">
                        {pokemon ? pokemon.map((item) => <PokemonList {...item} />) : ''}
                    </div>
                }
                {loading && <p>Loading more Pokémon...</p>}
            </div>
        </div>
    )
}

export default PokeList