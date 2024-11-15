/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export default function ProfileModal({ open, handleCloseModal, children }) {
    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    return (
        <div
            onClick={handleCloseModal}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? 'visible bg-black/20' : 'invisible bg-transparent'
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-md shadow-lg p-6 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                } w-[80%] h-[20%] max-w-lg md:max-w-xl lg:max-w-2xl pt-20`}
            >
                <div className="text-center flex flex-col items-center gap-2 mb-20">
                    <h3 className="text-2xl text-gray-500 font-bold">
                        Profile updated successfully
                    </h3>
                </div>
                {children}
            </div>
        </div>
    );
}
