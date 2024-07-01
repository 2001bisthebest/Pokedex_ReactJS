import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PokemonStat } from "../Interface/IPokemon"
import ArrowLeft from "../SVG/ArrowLeft"
import Basket from "../SVG/Basket"
import { addCart } from "../store/cartSlice"
import { useAppDispatch } from "../store/store"
const PokemonDetail = () => {
    const [count, setCount] = useState<number>(1)
    const [pokemon, setPokemon] = useState<PokemonStat | null>(null)
    const navigate = useNavigate();
    const { name } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const loadData = async () => {
        try {
            setIsLoading(true)
            const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            const pokemonObj: PokemonStat = {
                name: pokemonRes.data.name[0].toUpperCase() + pokemonRes.data.name.slice(1),
                photo: pokemonRes.data.sprites.other['official-artwork'].front_default,
                ability: pokemonRes.data.abilities.map((abl: any) => abl.ability.name[0].toUpperCase() + abl.ability.name.slice(1)),
                types: pokemonRes.data.types.map((typ: any) => typ.type.name[0].toUpperCase() + typ.type.name.slice(1)),
                stats: pokemonRes.data.stats.map((stat: any) => stat.stat.name)
            }
            setPokemon(pokemonObj)
        } catch (err) {
            console.error('Error fetching the Pokémon data:', err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var newValue: string = e.target.value
        let { min, max } = e.target;
        let value: number
        value = Math.max(Number(min), Math.min(Number(max), Number(+newValue)));
        setCount(value)
    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <h1>Loading ...</h1>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-center items-center py-11 px-[143px] gap-[15px] font-inter">
                <div className="flex gap-1 w-full items-center" onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    <p className="font-semibold">Back</p>
                </div>
                <div className="flex py-4 px-3.5 bg-white rounded-2xl gap-[25px] w-full">
                    <img src={pokemon?.photo} width={353} height={353} />
                    <div className="flex flex-col gap-6 text-black">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-black">{pokemon?.name}</p>
                            <div className="flex gap-1">
                                {pokemon?.types ? pokemon?.types.map((item) =>
                                    <div className="flex justify-center items-center text-yellow text-xss font-bold bg-[#FFF4E3] w-fit px-2 py-1 rounded-lg" key={item}>
                                        <p>{item}</p>
                                    </div>
                                ) : ''}
                            </div>
                            <div className="flex flex-col gap-[13px]">
                                <div className="flex text-darkgray font-light text-hd gap-1">
                                    <p>Stats:</p>
                                    <p>{pokemon?.stats.join(', ')}</p>
                                </div>
                                <div className="flex text-darkgray font-light text-hd gap-1">
                                    <p>Abilities:</p>
                                    <p>{pokemon?.ability.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-[50px]">
                            <p className="text-hd">Quantitiy: </p>
                            <div className="flex border rounded-[10px] h-fit text-lg font-medium w-fit justify-center items-center">
                                <button className=" p-2.5" onClick={() => setCount(count - 1)}>-</button>
                                <input type="number" value={count} min="1" max="99" onChange={(e) => handleChange(e)} className="p-2.5 w-14 outline-none text-center bg-gray " />
                                <button className=" p-2.5" onClick={() => setCount(count + 1)}>+</button>
                            </div>
                        </div>
                        <button className="bg-red text-gray rounded-lg flex py-4 px-16 gap-2.5 font-semibold w-fit" onClick={() => dispatch(addCart({ pokemonName: pokemon?.name, type: pokemon?.types, quantity: count, photo: pokemon?.photo }))}>
                            <Basket color="#FAFAFA" />
                            <p>Add To Pocket</p>
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default PokemonDetail