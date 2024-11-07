/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts';

import ProfileModal from './ProfileModal';

export const ProfileEditForm = (props) => {
    const {
        inputs,
        setInputs,

        createProfileData,
        editProfileData,
        setProfileData,

        profileData,
    } = useContext(UserContext);
    const { isEditing, setIsEditing } = props;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [requiredFieldError, setRequiredFieldError] = useState('');
    const [hasRequiredError, setHasRequiredError] = useState(false);
    const [stateInputError, setStateInputError] =useState(false)
    const [validationError, setValidationError] = useState('');
    // const [showModal, setShowModal] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const regex = /^[0-9]+$/;

    // console.log(showModal);
    console.log(hasRequiredError);

    const validateRequiredFields = () => {
        if (!profileData) {
            const requiredFields = [
                'firstName',
                'lastName',
                'phoneNumber',
                'email',
                'addressLine1',
                'city',
                'state',
                'zip',
            ];
            const isAnyFieldEmpty = requiredFields.some(
                (field) => !inputs[field],
            );

            setHasRequiredError(isAnyFieldEmpty);
        } else {
            setHasRequiredError(false);
        }
    };

    console.log(profileModalOpen, 'profile modal status');

    const handleInputChange = (e) => {
        console.log('change handled');
        const { name, value } = e.target;
        const regex = /^[0-9]+$/;
        console.log(name, value);
        if (name === 'phoneNumber' && !regex.test(value)) {
            setValidationError('Please enter a valid number.');
            setRequiredFieldError('');
            return;
        }
        if (inputs.country === 'US' && !inputs.state) {
            setStateInputError(true)
            
        }
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
       
        if (!profileData) {
            validateRequiredFields();
        }
    };

    //submit handler for new profile creation (post request)
    const handleSubmit = async (event) => {
        console.log('submitting new profile');
        event.preventDefault();
        
       
        try {
            const result = await createProfileData();
            console.log(result);

            setProfileData(result.profileData);

            setIsSubmitted(true);
            setProfileModalOpen(true);
        } catch (error) {
            console.error('Error creating profile:', error);
            alert(`Profile creation failed: ${error.message}`);
        }
        console.log(profileData);
    };

    //submit handler for existing profile edits (put request)

    const onSubmitWithProfileData = async (event) => {
        event.preventDefault();
        validateRequiredFields();
       

        if (hasRequiredError) {
            alert('Please fill in all required fields.');
            return;
        }

        setProfileModalOpen(true);

        try {
            console.log('editing profile');
            const result = await editProfileData(inputs);
            console.log(result);

            setProfileData(result.updatedProfile);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Profile update failed: ${error.message}`);
        }
    };

    const handleCloseModal = () => {
        setProfileModalOpen(false);
        setIsEditing(false);
    };
    console.log(requiredFieldError);

    console.log(isEditing);

    const onBlur = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (regex.test(value)) {
            setValidationError('');
        }
    };

    const onRequiredBlur = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (!isSubmitted) {
            if (!profileData && value === '') {
                setRequiredFieldError(
                    'Please enter a value in required fields.',
                );
                setHasRequiredError(true);
                if(!inputs.state){
                    setRequiredFieldError(
                        'State is required for US addresses.',
                    );
                }
                // Set error if the field is empty
            } else {
                setRequiredFieldError('');
                setHasRequiredError(false);
            }
        }
    };

    useEffect(() => {
        console.log('profileModalOpen changed:', profileModalOpen);
    }, [profileModalOpen]);

    useEffect(() => {
        if (profileModalOpen) {
            setProfileModalOpen(true);
        }
    }, [profileModalOpen]);

    return (
        <div>
            {isEditing && (
                <div>
                    {!profileData && (
                        <p className="pl-10 pb-10 text-2xl text-red font-bold">
                            * Required field
                        </p>
                    )}
                    <div className="flex justify-center w-full px-4 ">
                        <form
                            onSubmit={
                                profileData
                                    ? onSubmitWithProfileData
                                    : handleSubmit
                            }
                            className="flex flex-col items-stretch justify-center w-full p-4 bg-white rounded shadow"
                        >
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-full sm:w-1/3">
                                    <label
                                        htmlFor="firstName"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        First Name{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={inputs.firstName}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="First Name"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>

                                <div className="mb-4 px-2 w-full sm:w-1/3">
                                    <label
                                        htmlFor="lastName"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Last Name{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={inputs.lastName}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Last Name"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-full sm:w-1/3">
                                    <label
                                        htmlFor="suffix"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Suffix
                                    </label>
                                    <input
                                        type="text"
                                        id="suffix"
                                        name="suffix"
                                        value={inputs.suffix}
                                        onChange={handleInputChange}
                                        placeholder="Suffix"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-full sm:w-1/3">
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Phone Number{!profileData && '*'}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={inputs.phoneNumber}
                                        onChange={handleInputChange}
                                        onBlur={onBlur}
                                        placeholder="Phone Number"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-full sm:w-2/3">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Email{!profileData && '*'}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Email Address"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="mb-4 px-2 w-full">
                                    <label
                                        htmlFor="addressLine1"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Address Line 1{!profileData && '*'}
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={inputs.addressLine1}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Street Address"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-full">
                                    <label
                                        htmlFor="addressLine2"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={inputs.addressLine2}
                                        onChange={handleInputChange}
                                        placeholder="Address Line 2"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/2 sm:w-1/4">
                                    <label
                                        htmlFor="city"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        City{!profileData && '*'}
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={inputs.city}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="City"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="mb-4 px-2 w-1/2 sm:w-1/4">
                                    <label
                                        htmlFor="state"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        State{!profileData && '*'}
                                    </label>

                                    <select
                                        className="border rounded px-3 py-2 w-full"
                                        name="state"
                                        value={inputs.state}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}

                                        // onBlur={handleRequiredBlur}
                                    >
                                        <option value="">-- State --</option>
                                        <option value="AL">AL</option>
                                        <option value="AK">AK</option>
                                        <option value="AZ">AZ</option>
                                        <option value="AR">AR</option>
                                        <option value="CA">CA</option>
                                        <option value="CO">CO</option>
                                        <option value="CT">CT</option>
                                        <option value="DE">DE</option>
                                        <option value="FL">FL</option>
                                        <option value="GA">GA</option>
                                        <option value="HI">HI</option>
                                        <option value="ID">ID</option>
                                        <option value="IL">IL</option>
                                        <option value="IN">IN</option>
                                        <option value="IA">IA</option>
                                        <option value="KS">KS</option>
                                        <option value="KY">KY</option>
                                        <option value="LA">LA</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MA">MA</option>
                                        <option value="MI">MI</option>
                                        <option value="MN">MN</option>
                                        <option value="MS">MS</option>
                                        <option value="MO">MO</option>
                                        <option value="MT">MT</option>
                                        <option value="NE">NE</option>
                                        <option value="NV">NV</option>
                                        <option value="NH">NH</option>
                                        <option value="NJ">NJ</option>
                                        <option value="NM">NM</option>
                                        <option value="NY">NY</option>
                                        <option value="NC">NC</option>
                                        <option value="ND">ND</option>
                                        <option value="OH">OH</option>
                                        <option value="OK">OK</option>
                                        <option value="OR">OR</option>
                                        <option value="PA">PA</option>
                                        <option value="RI">RI</option>
                                        <option value="SC">SC</option>
                                        <option value="SD">SD</option>
                                        <option value="TN">TN</option>
                                        <option value="TX">TX</option>
                                        <option value="UT">UT</option>
                                        <option value="VT">VT</option>
                                        <option value="VA">VA</option>
                                        <option value="WA">WA</option>
                                        <option value="WV">WV</option>
                                        <option value="WI">WI</option>
                                        <option value="WY">WY</option>
                                    </select>
                                </div>
                                <div className="mb-4 px-2 w-1/2 sm:w-1/4">
                                    <label
                                        htmlFor="zip"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Zip/Postal Code{!profileData && '*'}
                                    </label>

                                    <input
                                        type="number"
                                        name="zip"
                                        value={inputs.zip}
                                        onChange={handleInputChange}
                                        onBlur={onRequiredBlur}
                                        placeholder="Zip/Postal Code"
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                </div>
                                <div className="flex-1 w-full mb-8 px-2">
                                    <label
                                        htmlFor="country"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <select
                                        name="country"
                                        value={inputs.country}
                                        onChange={handleInputChange}
                                        className="border rounded px-3 py-2 w-full"
                                    >
                                        <option value="">
                                            -- Country --
                                        </option>
                                        <option value="AF">AF</option>
                                        <option value="AL">AL</option>
                                        <option value="DZ">DZ</option>
                                        <option value="AS">AS</option>
                                        <option value="AD">AD</option>
                                        <option value="AO">AO</option>
                                        <option value="AI">AI</option>
                                        <option value="AQ">AQ</option>
                                        <option value="AG">AG</option>
                                        <option value="AR">AR</option>
                                        <option value="AM">AM</option>
                                        <option value="AW">AW</option>
                                        <option value="AU">AU</option>
                                        <option value="AT">AT</option>
                                        <option value="AZ">AZ</option>
                                        <option value="BS">BS</option>
                                        <option value="BH">BH</option>
                                        <option value="BD">BD</option>
                                        <option value="BB">BB</option>
                                        <option value="BY">BY</option>
                                        <option value="BE">BE</option>
                                        <option value="BZ">BZ</option>
                                        <option value="BJ">BJ</option>
                                        <option value="BM">BM</option>
                                        <option value="BT">BT</option>
                                        <option value="BO">BO</option>
                                        <option value="BA">BA</option>
                                        <option value="BW">BW</option>
                                        <option value="BR">BR</option>
                                        <option value="IO">IO</option>
                                        <option value="BN">BN</option>
                                        <option value="BG">BG</option>
                                        <option value="BF">BF</option>
                                        <option value="BI">BI</option>
                                        <option value="CV">CV</option>
                                        <option value="KH">KH</option>
                                        <option value="CM">CM</option>
                                        <option value="CA">CA</option>
                                        <option value="KY">KY</option>
                                        <option value="CF">CF</option>
                                        <option value="TD">TD</option>
                                        <option value="CL">CL</option>
                                        <option value="CN">CN</option>
                                        <option value="CO">CO</option>
                                        <option value="KM">KM</option>
                                        <option value="CG">CG</option>
                                        <option value="CD">CD</option>
                                        <option value="CR">CR</option>
                                        <option value="CI">CI</option>
                                        <option value="HR">HR</option>
                                        <option value="CU">CU</option>
                                        <option value="CY">CY</option>
                                        <option value="CZ">CZ</option>
                                        <option value="DK">DK</option>
                                        <option value="DJ">DJ</option>
                                        <option value="DM">DM</option>
                                        <option value="DO">DO</option>
                                        <option value="EC">EC</option>
                                        <option value="EG">EG</option>
                                        <option value="SV">SV</option>
                                        <option value="GQ">GQ</option>
                                        <option value="ER">ER</option>
                                        <option value="EE">EE</option>
                                        <option value="ET">ET</option>
                                        <option value="FJ">FJ</option>
                                        <option value="FI">FI</option>
                                        <option value="FR">FR</option>
                                        <option value="GA">GA</option>
                                        <option value="GM">GM</option>
                                        <option value="GE">GE</option>
                                        <option value="DE">DE</option>
                                        <option value="GH">GH</option>
                                        <option value="GR">GR</option>
                                        <option value="GL">GL</option>
                                        <option value="GD">GD</option>
                                        <option value="GU">GU</option>
                                        <option value="GT">GT</option>
                                        <option value="GN">GN</option>
                                        <option value="GW">GW</option>
                                        <option value="GY">GY</option>
                                        <option value="HT">HT</option>
                                        <option value="HN">HN</option>
                                        <option value="HK">HK</option>
                                        <option value="HU">HU</option>
                                        <option value="IS">IS</option>
                                        <option value="IN">IN</option>
                                        <option value="ID">ID</option>
                                        <option value="IR">IR</option>
                                        <option value="IQ">IQ</option>
                                        <option value="IE">IE</option>
                                        <option value="IL">IL</option>
                                        <option value="IT">IT</option>
                                        <option value="JM">JM</option>
                                        <option value="JP">JP</option>
                                        <option value="JO">JO</option>
                                        <option value="KZ">KZ</option>
                                        <option value="KE">KE</option>
                                        <option value="KI">KI</option>
                                        <option value="KP">KP</option>
                                        <option value="KR">KR</option>
                                        <option value="KW">KW</option>
                                        <option value="KG">KG</option>
                                        <option value="LA">LA</option>
                                        <option value="LV">LV</option>
                                        <option value="LB">LB</option>
                                        <option value="LS">LS</option>
                                        <option value="LR">LR</option>
                                        <option value="LY">LY</option>
                                        <option value="LI">LI</option>
                                        <option value="LT">LT</option>
                                        <option value="LU">LU</option>
                                        <option value="MO">MO</option>
                                        <option value="MK">MK</option>
                                        <option value="MG">MG</option>
                                        <option value="MW">MW</option>
                                        <option value="MY">MY</option>
                                        <option value="MV">MV</option>
                                        <option value="ML">ML</option>
                                        <option value="MT">MT</option>
                                        <option value="MH">MH</option>
                                        <option value="MR">MR</option>
                                        <option value="MU">MU</option>
                                        <option value="YT">YT</option>
                                        <option value="MX">MX</option>
                                        <option value="FM">FM</option>
                                        <option value="MD">MD</option>
                                        <option value="MC">MC</option>
                                        <option value="MN">MN</option>
                                        <option value="ME">ME</option>
                                        <option value="MS">MS</option>
                                        <option value="MA">MA</option>
                                        <option value="MZ">MZ</option>
                                        <option value="MM">MM</option>
                                        <option value="NA">NA</option>
                                        <option value="NR">NR</option>
                                        <option value="NP">NP</option>
                                        <option value="NL">NL</option>
                                        <option value="NZ">NZ</option>
                                        <option value="NI">NI</option>
                                        <option value="NE">NE</option>
                                        <option value="NG">NG</option>
                                        <option value="NU">NU</option>
                                        <option value="NF">NF</option>
                                        <option value="MP">MP</option>
                                        <option value="NO">NO</option>
                                        <option value="OM">OM</option>
                                        <option value="PK">PK</option>
                                        <option value="PW">PW</option>
                                        <option value="PA">PA</option>
                                        <option value="PG">PG</option>
                                        <option value="PY">PY</option>
                                        <option value="PE">PE</option>
                                        <option value="PH">PH</option>
                                        <option value="PN">PN</option>
                                        <option value="PL">PL</option>
                                        <option value="PT">PT</option>
                                        <option value="PR">PR</option>
                                        <option value="QA">QA</option>
                                        <option value="RO">RO</option>
                                        <option value="RU">RU</option>
                                        <option value="RW">RW</option>
                                        <option value="RE">RE</option>
                                        <option value="BL">BL</option>
                                        <option value="SH">SH</option>
                                        <option value="KN">KN</option>
                                        <option value="LC">LC</option>
                                        <option value="MF">MF</option>
                                        <option value="PM">PM</option>
                                        <option value="VC">VC</option>
                                        <option value="WS">WS</option>
                                        <option value="SM">SM</option>
                                        <option value="ST">ST</option>
                                        <option value="SA">SA</option>
                                        <option value="SN">SN</option>
                                        <option value="RS">RS</option>
                                        <option value="SC">SC</option>
                                        <option value="SL">SL</option>
                                        <option value="SG">SG</option>
                                        <option value="SX">SX</option>
                                        <option value="SK">SK</option>
                                        <option value="SI">SI</option>
                                        <option value="SB">SB</option>
                                        <option value="SO">SO</option>
                                        <option value="ZA">ZA</option>
                                        <option value="SS">SS</option>
                                        <option value="ES">ES</option>
                                        <option value="LK">LK</option>
                                        <option value="SD">SD</option>
                                        <option value="SR">SR</option>
                                        <option value="SJ">SJ</option>
                                        <option value="SE">SE</option>
                                        <option value="CH">CH</option>
                                        <option value="SY">SY</option>
                                        <option value="TW">TW</option>
                                        <option value="TJ">TJ</option>
                                        <option value="TZ">TZ</option>
                                        <option value="TH">TH</option>
                                        <option value="TL">TL</option>
                                        <option value="TG">TG</option>
                                        <option value="TK">TK</option>
                                        <option value="TO">TO</option>
                                        <option value="TT">TT</option>
                                        <option value="TN">TN</option>
                                        <option value="TR">TR</option>
                                        <option value="TM">TM</option>
                                        <option value="TV">TV</option>
                                        <option value="UG">UG</option>
                                        <option value="UA">UA</option>
                                        <option value="AE">AE</option>
                                        <option value="GB">GB</option>
                                        <option value="US">US</option>
                                        <option value="UY">UY</option>
                                        <option value="UZ">UZ</option>
                                        <option value="VU">VU</option>
                                        <option value="VE">VE</option>
                                        <option value="VN">VN</option>
                                        <option value="WF">WF</option>
                                        <option value="EH">EH</option>
                                        <option value="YE">YE</option>
                                        <option value="ZM">ZM</option>
                                        <option value="ZW">ZW</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                
                            </div>
                            <div className="flex ">
                                <div className="mb-4 px-2 w-full">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={inputs.bio}
                                        onChange={handleInputChange}
                                        className="w-full h-60 p-4 border border-black rounded focus:outline-none focus:border-blue-500 resize-none "
                                        placeholder="Enter your bio text here..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
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
                                <div className="flex mt-10">
                                    <button className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        {profileModalOpen && (
                            <ProfileModal
                                open={profileModalOpen}
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
                            </ProfileModal>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileEditForm;
