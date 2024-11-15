/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export default function DeleteUserModal({
    open,
    onClose,
    handleDeleteProfileClick,
}) {
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
            role="dialog"
            aria-modal="true"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-md shadow-lg p-6 transition-all relative ${
                    open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
                aria-labelledby="delete-modal-title"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded text-gray bg-white hover:bg-gray hover:text-gray"
                    aria-label="Close modal"
                >
                    X
                </button>
                <div className="flex flex-col justify-center items-center gap-10 p-10">
                    <h3
                        id="delete-modal-title"
                        className="text-xl font-semibold"
                    >
                        Are you sure you want to delete the selected user(s)?
                    </h3>
                    <h2 className="text-lg font-semibold">
                        This action cannot be undone.
                    </h2>
                    <div className="mt-4 flex justify-end gap-10">
                        <button
                            onClick={onClose}
                            className="bg-light-gray w-[100px]  py-2 rounded text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteProfileClick}
                            className="bg-red w-[100px] py-2 rounded text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
