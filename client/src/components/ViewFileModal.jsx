/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

export default function ViewFileModal({
    open,
    onClose,
    nickname,
    selectedDocumentName,
    imagesByDocType,
    onSubmit,
    onChange,
    newDocStatus
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
                    X
                </button>
                <div className="text-center w-full flex flex-col items-center gap-2 mb-10">
                    <h3 className="text-lg text-gray-500 font-bold">
                        View file for: {selectedDocumentName}
                    </h3>
                    {imagesByDocType.length > 0 ? (
                        <img src={imagesByDocType[0].url} alt="Document file" />
                    ) : (
                        <p>No image available</p>
                    )}

                    <form className="mt-4" onSubmit={onSubmit}>
                        <div className="flex flex-col items-center gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="approvalStatus"
                                    value="approved"
                                    className="mr-2"
                                    onChange={onChange}
                                    checked={newDocStatus === 'approved'}
                                />
                                Approve
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="approvalStatus"
                                    value="declined"
                                    className="mr-2"
                                    onChange={onChange}
                                    checked={newDocStatus === 'declined'}

                                />
                                Decline
                            </label>
                            <textarea
                            onChange={onChange}
                                placeholder="Reason for denial (if applicable)"
                                className="border border-black rounded-xl p-5 mt-10 w-[300px]"
                            ></textarea>
                            <button className="border border-black rounded-xl px-5 py-2 bg-green-is-good text-white">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
