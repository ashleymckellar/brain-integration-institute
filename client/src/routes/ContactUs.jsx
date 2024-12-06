/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';
import emailjs from '@emailjs/browser';
import ContactFormModal from '../components/ContactFormModal';
import { Navbar } from '../components/header/Navbar'
import { Footer } from '../components/Footer'

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [hasRequiredError, setHasRequiredError] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [contactFormModalOpen, setContactFormModalOpen] = useState(false);

    const isDisabled = !(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.message
    );

    const validateRequiredFields = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'message'];

        const isAnyFieldEmpty = requiredFields.some(
            (field) => !formData[field],
        );

        setHasRequiredError(isAnyFieldEmpty);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[0-9]+$/;
        if (name === 'phone' && !regex.test(value)) {
            setValidationError('Please enter a valid number.');
            validateRequiredFields();
        }
        setFormData({ ...formData, [name]: value });
    };

    const onBlur = (e) => {
        const regex = /^[0-9]+$/;
        const { name, value } = e.target;
        if (regex.test(value)) {
            setValidationError('');
        }
    };

    const onRequiredBlur = (e) => {
        const { name, value } = e.target;
        if (!isSubmitted) {
            if (value === '') {
                setRequiredFieldError('Please enter a value in required fields.');
                setHasRequiredError(true);
            } else {
                setRequiredFieldError('');
                setHasRequiredError(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                e.target,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            );
            setIsSubmitted(true);
            setContactFormModalOpen(true);
            setFormData({
                lastName: '',
                firstName: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Error sending message', error);
            alert(`Message failed: ${error.message}`);
        }
    };

    const handleCloseModal = () => {
        setContactFormModalOpen(false);
    };

    useEffect(() => {
        console.log('contactFormModalOpen changed:', contactFormModalOpen);
    }, [contactFormModalOpen]);

    return (
        <>
       <Navbar />
            <div
                className="w-full h-64 sm:h-80 md:h-96 lg:h-112 relative bg-white"
                style={{
                    backgroundImage: `url(${banner}), url(${paleBanner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-fenix font-normal">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Contact Form Section */}
            <div id="contact-us" className="flex flex-col text-center gap-10 justify-center items-center p-4">
                <p className="text-lg sm:text-xl">
                    Tell us a bit about yourself and we&apos;ll get in touch as
                    soon as we can.{' '}
                </p>
                <p className="pl-10 pb-10 text-2xl text-red font-bold">
                    * Required field
                </p>

                <div className="flex justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 items-center">
                    <form
                        className="flex flex-col items-stretch justify-center w-full p-4 bg-white rounded shadow gap-10"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap -mx-2">
                            <div className="mb-4 px-2 w-full sm:w-1/2">
                                <input
                                    type="text"
                                    className="border rounded border-dark-gray px-3 py-2 w-full"
                                    value={formData.firstName}
                                    name="firstName"
                                    placeholder="First Name *"
                                    onChange={handleInputChange}
                                    onBlur={onRequiredBlur}
                                />
                            </div>
                            <div className="mb-4 px-2 w-full sm:w-1/2">
                                <input
                                    type="text"
                                    className="border rounded border-dark-gray px-3 py-2 w-full"
                                    value={formData.lastName}
                                    name="lastName"
                                    placeholder="Last Name *"
                                    onChange={handleInputChange}
                                    onBlur={onRequiredBlur}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="mb-4 px-2 w-full sm:w-1/2">
                                <input
                                    type="email"
                                    className="border rounded border-dark-gray px-3 py-2 w-full"
                                    value={formData.email}
                                    name="email"
                                    placeholder="Email *"
                                    onChange={handleInputChange}
                                    onBlur={onRequiredBlur}
                                />
                            </div>
                            <div className="mb-4 px-2 w-full sm:w-1/2">
                                <input
                                    type="tel"
                                    className="border rounded border-dark-gray px-3 py-2 w-full"
                                    value={formData.phone}
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={handleInputChange}
                                    onBlur={onBlur}
                                />
                            </div>
                        </div>
                        <textarea
                            name="message"
                            className="border rounded border-dark-gray px-3 py-2 w-full"
                            rows="5"
                            value={formData.message}
                            placeholder="Message *"
                            onChange={handleInputChange}
                            onBlur={onRequiredBlur}
                        />
                        {validationError && (
                            <p className="pl-10 pb-10 text-2xl text-red font-bold">
                                {validationError}
                            </p>
                        )}
                        {hasRequiredError && (
                            <p className="pl-10 pb-10 text-2xl text-red font-bold">
                                {requiredFieldError}
                            </p>
                        )}
                        <div className="flex justify-center mt-10">
                            <button
                                disabled={isDisabled}
                                className="bg-medium-pale-green border-b-2 border-transparent hover:bg-green-500 rounded-2xl hover:text-white text-xl w-[204px] h-[43px] text-white font-medium px-6 py-2"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                    {contactFormModalOpen && (
                        <ContactFormModal
                            open={contactFormModalOpen}
                            handleClose={handleCloseModal}
                        >
                            <div className="flex justify-center gap-10">
                                <button
                                    className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[104px] h-[43px] text-white font-medium px-6 py-2"
                                    onClick={handleCloseModal}
                                >
                                    OK
                                </button>
                            </div>
                        </ContactFormModal>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
