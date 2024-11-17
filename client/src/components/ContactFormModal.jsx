// /* eslint-disable react/prop-types */
// import { useEffect } from 'react';

// export const ContactFormModal = ({ open, handleCloseModal, children }) => {
//     useEffect(() => {
//         if (open) {
//             document.body.classList.add('overflow-hidden');
//         } else {
//             document.body.classList.remove('overflow-hidden');
//         }

//         return () => {
//             document.body.classList.remove('overflow-hidden');
//         };
//     }, [open]);

//     return (
//         <div
//             onClick={handleCloseModal}
//             className={`fixed inset-0 flex justify-center items-center transition-colors ${
//                 open ? 'visible bg-black/20' : 'invisible bg-transparent'
//             }`}
//         >
//             <div
//                 onClick={(e) => e.stopPropagation()}
//                 className={`bg-white rounded-md shadow-lg p-6 transition-all ${
//                     open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
//                 } w-[80%] h-[20%] max-w-lg md:max-w-xl lg:max-w-2xl pt-20`}
//             >
//                 <div className="text-center flex flex-col items-center gap-2 mb-20">
//                     <h3 className="text-2xl text-gray-500 font-bold">
//                         Message sent successfully
//                     </h3>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default ContactFormModal

/* eslint-disable react/prop-types */
import { useEffect } from 'react';

export const ContactFormModal = ({ open, handleCloseModal, children }) => {
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
                className={`bg-white rounded-md shadow-lg p-4 sm:p-6 md:p-8 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                } w-[90%] h-[25%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg md:max-w-xl lg:max-w-2xl`}
            >
                <div className="text-center flex flex-col items-center gap-4 mb-8 mt-10 sm:mb-6 sm:mt-20 md:mb-8 ">
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-bold">
                        Message sent successfully
                    </h3>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ContactFormModal;

