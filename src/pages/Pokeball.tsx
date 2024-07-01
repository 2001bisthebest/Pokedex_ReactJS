import Trash from '../SVG/Trash'
import { deleteCart } from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
const Pokeball = () => {
    const carts = useAppSelector((state) => state.cart.carts)
    const dispatch = useAppDispatch()
    const totalQuantity = carts.reduce((total: any, item: any) => total + item.quantity, 0);
    return (
        <div className='w-full flex justify-center py-[54px] font-inter'>
            <div className="w-[1280px] flex justify-center gap-11 text-black">
                <div className="w-[954px] rounded-lg p-4 bg-white">
                    <p className="font-bold text-base/[30px]">Pocket list (2)</p>
                    <div className="py-6 w-full grid grid-cols-8 justify-items-center gap-2.5 items-center">
                        <p className='col-span-6 justify-self-start text-sm/[30px] font-bold'>Product name</p>
                        <p className='text-base/[30px] font-bold'>Quantity</p>
                        <p></p>
                        {carts ? carts.map((item: any) =>
                            <div className='col-span-full w-full grid grid-cols-8 justify-items-center'>
                                <div className="flex gap-4 col-span-6 justify-self-start">
                                    <img src={item.photo} width={80} height={80} />
                                    <div className="flex flex-col justify-center p-2.5 gap-2 w-full">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-black self-start">{item.pokemonName}</p>
                                            <div className="flex gap-1">
                                                {item ? item.type.map((typ: any) =>
                                                    <div className="flex justify-center items-center text-yellow text-xss font-bold bg-[#FFF4E3] w-fit px-2 py-1 rounded-lg">
                                                        <p>{typ}</p>
                                                    </div>) : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-lg font-medium'>{item.quantity}</p>
                                <button className='justify-self-end h-fit' onClick={() => dispatch(deleteCart({ pokemonName: item.pokemonName }))}>
                                    <Trash />
                                </button>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <div className="w-[282px] h-60 rounded-lg bg-white shadow-list">
                    <div className='w-full h-11 bg-[#FFF9E3] p-2.5'>
                        <p className='font-bold text-base/[24px]'>Order Summary</p>
                    </div>
                    <div className='flex flex-col py-[7px] justify-between h-[196px]'>
                        <div className='flex flex-col p-2.5 text-btn gap-[18px]'>
                            <div className='flex justify-between'>
                                <p className='font-normal'>Subtotal</p>
                                <p className='font-bold'>{carts.length} Product</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-normal'>Quantity</p>
                                <p className='font-bold'>{totalQuantity} Quantity</p>
                            </div>
                        </div>
                        <button className='bg-red text-gray w-[250px] self-center p-4 text-hd font-semibold rounded-lg'>Proceed to checkout</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Pokeball