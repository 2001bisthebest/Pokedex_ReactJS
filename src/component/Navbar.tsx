import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Basket from "../SVG/Basket"
import CloseCircle from "../SVG/CloseCircle"
import Search from "../SVG/Search"
import User from "../SVG/User"
import logo from "../assets/pokemon-logo.png"
import { useAppSelector } from "../store/store"
const navbar = () => {
    const carts = useAppSelector((state) => state.cart.carts)
    const [isFocusSearchBox, setIsFocusSearchBox] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
        if (e.key == 'Enter') {
            navigate(`/searchpokemon?name=${search}`)
        }
    }
    return (
        <div className="w-full h-20 flex items-center justify-between px-[150px] shadow-navbar font-inter">
            <a href="/">
                <img src={logo} width="156" height="57" />
            </a>
            <div className={`bg-[#F8F8F8] w-[507px] h-12 rounded-[10px] flex items-center p-4 gap-2 caret-yellow ${isFocusSearchBox ? 'border border-yellow' : ''}`} onFocus={() => setIsFocusSearchBox(true)} onBlur={() => setIsFocusSearchBox(false)}>
                <Search />
                <input type="text" value={search} onChange={(e) => handleChange(e)} className="w-full text-darkgray focus:outline-none bg-[#F8F8F8]" placeholder="Search name Pokémon ..." onKeyDown={(e) => handleKeyDown(e)} />
                <button className={`${isFocusSearchBox ? '' : 'hidden'}`} onClick={() => setSearch('')}>
                    <CloseCircle />
                </button>
            </div>
            <div className="flex justify-center items-center gap-2 text-darkgray">
                <User />
                <p>Username</p>
                <p className="text-gray">|</p>
                <a className="flex gap-3.5" href="/pokeball">
                    <div className="relative">
                        <div className="absolute rounded-full bg-black w-[15px] h-[15px] top-0 right-[-25%] flex justify-center items-center">
                            <p className="text-white text-[10px]">{carts.length}</p>
                        </div>
                        <Basket color="#FFCB05" />
                    </div>
                    <p>Pocket</p>
                </a>
            </div>
        </div>
    )
}

export default navbar