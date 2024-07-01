import DeliveryTruck from "../SVG/DeliveryTruck";
import Discount from "../SVG/Discount";
import Location from "../SVG/Location";
const Header = () => {
    return (
        <>
            <div className='h-[42px] bg-yellow flex justify-center font-inter'>
                <div className="py-3 px-[150px] flex justify-between w-full items-center">
                    <p className="text-sm">Welcome to Pokemon shop!</p>
                    <div className="flex items-center gap-2 text-hd">
                        <Location />
                        <p>Contact 123456</p>
                        <p>|</p>
                        <DeliveryTruck />
                        <p>Track your order</p>
                        <p>|</p>
                        <Discount />
                        <p>All Offers</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header