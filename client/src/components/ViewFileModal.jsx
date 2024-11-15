/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function ViewFileModal({
    open,
    onClose,
    selectedDocumentName,
    imagesByDocType,
    individualUser,
    onChange,
    newDocStatus,
    selectedDocumentType,
    getAllUsers,
}) {
    const { getAccessTokenSilently } = useAuth0();
    const [reasonForDenial, setReasonForDenial] = useState('');
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
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

    const handleStatusChange = (e) => {
        onChange(e);
    };

    const handleReasonChange = (e) => {
        setReasonForDenial(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = await getAccessTokenSilently();
        try {
            const userEmail = individualUser.userEmail;

            const response = await fetch(
                `http://${baseUrl}/api/user/${userEmail}/document-status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        documentType: selectedDocumentType,
                        newStatus: newDocStatus,
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    'Error updating document status:',
                    errorData.message,
                );
                alert(`Error: ${errorData.message}`);
            } else {
                const data = await response.json();
                console.log('Successfully updated:', data);
                getAllUsers();
                alert('Document status updated successfully!');
            }
        } catch (error) {
            console.error('Failed to submit the form:', error);
            alert('Something went wrong. Please try again.');
        }

        if (newDocStatus === 'declined') {
            await fetch(`http://${baseUrl}/api/approvalmessages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    message: reasonForDenial,
                    category: selectedDocumentType,
                    userEmail: 'ashley.l.mckellar@gmail.com',
                    admin: 'ashley.l.mckellar@gmail.com',

                    //fix the above so userEmail and admin aren't hard coded
                }),
            });
        }

        setReasonForDenial('');
        onClose();
    };

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
                        <img
                            src={imagesByDocType[0].url}
                            alt="Document file"
                            className="w-[700px] h-[600px]"
                        />
                    ) : (
                        <p>No image available</p>
                    )}

                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="approvalStatus"
                                    value="approved"
                                    className="mr-2"
                                    onChange={handleStatusChange}
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
                                    onChange={handleStatusChange}
                                    checked={newDocStatus === 'declined'}
                                />
                                Decline
                            </label>
                            <textarea
                                onChange={handleReasonChange}
                                value={reasonForDenial}
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
