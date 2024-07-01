import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Pokemon } from "../Interface/IPokemon"
import GridView from "../SVG/GridView"
import ListView from "../SVG/ListView"
import SearchNotFound from "../SVG/SearchNotFound"
import PokemonCard from "../component/PokemonCard"
import PokemonList from "../component/PokemonList"

function SearchPokemon() {
    const [pokemon, setPokemon] = useState<Pokemon[] | null>(null)
    const [view, setView] = useState<string>("grid");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name')?.toLowerCase();

    const loadData = async () => {
        if (!name) return;
        try {
            setLoading(true)
            setPokemon(null);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            const data = response.data
            const pokemonResults: Pokemon[] = []
            const pokemonResult: Pokemon = {
                name: data.name,
                ability: data.abilities.map((abl: any) => abl.ability.name),
                photo: data.sprites.other['official-artwork'].front_default,
                types: data.types.map((typ: any) => typ.type.name)
            }
            pokemonResults.push(pokemonResult)
            setPokemon(pokemonResults)
            console.log(name)
        } catch (err) {
            console.error('Error fetching the Pokémon data:', err)
            setPokemon([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (name) {
            loadData()
        }
    }, [name])

    return (
        <div className="flex w-full px-[150px] py-11 justify-center items-center font-inter">
            <div className="flex justify-center items-center flex-col gap-16 w-[1138px]">
                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-2 font-semibold">
                        <p>Search Result</p>
                        <p>({pokemon?.length} Product{pokemon?.length !== 1 ? 's' : ''})</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            className={`p-2 rounded-l-[10px] ${view === "grid" ? "bg-yellow" : ""}`}
                            onClick={() => setView("grid")}
                        >
                            <GridView />
                        </button>
                        <button
                            className={`p-2 rounded-r-[10px] ${view === "list" ? "bg-yellow" : ""}`}
                            onClick={() => setView("list")}
                        >
                            <ListView />
                        </button>
                    </div>
                </div>
                {loading ? <p>Loading more Pokémon...</p>
                    : pokemon && pokemon.length > 0 ? (
                        view === 'grid' ? (
                            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 w-full gap-[46px]">
                                {pokemon.map((item, index) => (
                                    <PokemonCard {...item} key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 justify-items-center w-full gap-[18px]">
                                {pokemon.map((item, index) => (
                                    <PokemonList {...item} key={index} />
                                ))}
                            </div>
                        )
                    ) :
                        <div className="self-center flex flex-col justify-center items-center gap-2">
                            <SearchNotFound />
                            <div className="text-base/[20px] text-[#909090] flex flex-col items-center">
                                <p>Oops! Nothing was found for “{name}”</p>
                                <p>Please try to search for something else.</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchPokemon