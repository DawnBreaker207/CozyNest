import React from 'react'

const Contacttwo = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:h-[65vh] gap-8 items-center bg-yellow-600 p-4 lg:p-8">
            {/* Left side */}
            <div className="lg:col-span-1 space-y-8 text-center lg:text-right">
                <div>
                    <h3 className="font-bold text-xl mb-2">Đổi trả dễ dàng</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-2">Thương hiệu chất lượng</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
            </div>

            {/* Vertical divider with dots */}
            <div className="relative flex justify-center items-center lg:col-span-1">
                <div className="h-full w-1 border-r-2 border-gray-400"></div>
                <div className="absolute top-1/4 w-4 h-4 bg-orange-500 rounded-full"></div>
                <div className="absolute top-3/4 w-4 h-4 bg-orange-500 rounded-full"></div>
            </div>

            {/* Right side */}
            <div className="lg:col-span-1 space-y-8 text-center lg:text-left">
                <div>
                    <h3 className="font-bold text-xl mb-2">Thiết kế đa dạng</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-2">Tiêu chuẩn nghiêm ngặt</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
            </div>
        </div>

    )
}

export default Contacttwo
