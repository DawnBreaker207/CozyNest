import { Col } from 'antd'
import React from 'react'

const Contacttwo = () => {
    return (
        <div className="bg-gray-700 text-white py-10">
            <div className=" mx-auto text-center px-6 lg:px-0">
                <h2 className="text-3xl font-bold mb-6">Về sản phẩm</h2>
                <p className="mb-8 text-lg max-w-6xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.1fr_1fr] gap-8">
                    {/* Left side */}

                    <Col>
                        <div className="space-y-8 text-center px-10">
                            <div>
                                <h3 className="font-bold text-xl mb-2">Đổi trả dễ dàng</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-2">Thương hiệu chất lượng</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                            </div>
                        </div>
                    </Col>




                    {/* Right side */}
                    <div className="space-y-8 text-center px-10">
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



            </div>
        </div>
    )
}

export default Contacttwo
