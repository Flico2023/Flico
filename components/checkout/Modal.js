import { useModal } from '@/context/ModalContext';
import React, { useRef } from 'react';
import Button from '../UI/elements/Button';
import Link from 'next/link';

const Modal = () => {
    const { isOpen, closeModal, modalContent } = useModal();
    const modalRef = useRef();
    

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    console.log("modalContent")
    console.log(modalContent)

    console.log("isOpen")
    console.log(isOpen)

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClickOutside}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleClickOutside}>
                <div
                    ref={modalRef}
                    className="bg-white p-8 rounded shadow-lg max-w-lg w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl mb-4">Modal Title</h2>
                    <div className="max-h-96 overflow-y-auto">
                        {
                            modalContent.message === "noClosetAvailable" && <p>There is no available closet for this airport. Please try to select another date</p>
                        }
                        {
                            modalContent.message === "Product not found" && <p>Something went wrong. Please try again later</p>
                        }
                        {
                            modalContent.message === "ProductNotAvailable" && (<>
                                <p className='mb-4'>
                                    The product you are trying to add is not available in your travel date.
                                    Please try to select another date or contact us for further information.
                                </p>
                                <div>


                                    <div  className="bg-gray-100 p-4 rounded-lg">
                                        { <Link href={`products/details/${modalContent.data.productID}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img src={modalContent.data.imagePath} alt={modalContent.data.productName} className="w-16 h-16 object-cover rounded-lg" />
                                                    <div className="ml-4">
                                                        <h2 className="text-lg font-semibold text-gray-700">{modalContent.data.productName}</h2>
                                                        {/* <span className="text-sm font-semibold text-gray-600">Size: {modalContent.data.size}</span> */}
                                                    </div>
                                                </div>
                                                <span className="text-lg font-semibold text-gray-700">${modalContent.data.price}</span>
                                                
                                            </div>
                                            {/* <div className="flex items-center justify-between mt-4">
                                                <span className="text-sm font-semibold text-gray-600">Amount: {orderProduct.amount}</span>
                                                <span className="text-sm font-semibold text-gray-600">Total: ${orderProduct.amount * orderProduct.product.price}</span>
                                            </div> */}
                                        </Link> }</div>
                                </div>
                            </>

                            )}
                    </div>
                    <Button className="w-full mt-4" onClick={closeModal}>
                        Close Modal
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Modal;

