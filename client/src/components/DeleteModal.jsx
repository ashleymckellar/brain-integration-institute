/* eslint-disable react/prop-types */

import { useEffect } from "react";
export default function DeleteModal({ open, onClose, children }) {

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
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? 'visible bg-black/20' : 'invisible bg-transparent'
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-md shadow-lg p-6 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded- text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                    
                </button>
                {children}
            </div>
        </div>
    );
}
