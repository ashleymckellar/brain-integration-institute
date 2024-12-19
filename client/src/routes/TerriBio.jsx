import { Navbar } from '../components/header/Navbar';
import { Footer } from '../components/Footer';
import rectangleTerri from '../assets/images/TerriHeadshot.png';
import map from '../assets/icons/map-pin.png';
import phone from '../assets/icons/phone.png';
import mail from '../assets/icons/mail.png';

export const TerriBio = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4 md:p-10 lg:p-20 pb-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column */}
                    <div className="flex flex-col items-center lg:items-start gap-10 lg:basis-1/2">
                        <img
                            src={rectangleTerri}
                            className="w-full sm:w-[800px] md:w-[600px] lg:w-[800px] h-auto object-cover"
                            alt="Terri Harris"
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={map}
                                    alt="map pin"
                                    className="w-8 h-8"
                                />
                                <span className="font-bold">
                                    West Jordan & Midvale, UT
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={phone}
                                    alt="phone"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="tel:1-801-910-3400"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    1-801-910-3400
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <img
                                    src={mail}
                                    alt="email"
                                    className="w-8 h-8"
                                />
                                <a
                                    href="mailto:terriblackberry5@gmail.com"
                                    className="text-blue-600 hover:underline font-bold"
                                >
                                    terriblackberry5@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-10 sm:w-[800px] md:w-[600px] lg:w-[1800px] h-auto object-cover">
                        <h1 className="text-6xl font-bold">Terri Harris</h1>
                        <h2 className="text-xl font-semibold">
                            MA, BS, CRC (ret), SSW, BI Practitioner
                        </h2>
                        <p className="px-2 md:px-6 lg:px-10">
                            Terri brings a wealth of Brain Integration and
                            related experience to the Board of the Brain
                            Integration Institute. Terri graduated from Sam
                            Houston State University with a BS in Social Work.
                            She then graduated from the University of Utah, with
                            an MA in Rehabilitation Counseling.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            Terri is well versed in caring for youth and adults
                            alike, with 20 years’ experience at the State of
                            Utah in the areas of Child Protective Services,
                            Adult Protective Services, and Foster Care. Terri
                            has served as an Adoption Specialist and Supervisor
                            and Regional Coordinator of Independent Living
                            Services for emancipating foster care youth.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            Terri also has 5 years’ experience at the State of
                            Utah Vocational Rehabilitation Agency as a
                            Rehabilitation Counselor. Terri obtained her first
                            trainings and certifications in Brain Integration
                            starting in 2012, and since then has been certified
                            or trained in the following: Crossinology
                            Practitioner, with training in Brain Physiology I,
                            II, Muscle Reactivation, and Advance Brain
                            Physiology; LEAP Brain Integration, with training in
                            Simply the Brain, Glial Cells, LEAP Learning I, II,
                            III, IV and V, Tibetan Figure 8’s and the Seven Chi
                            Keys; Principles of Kinesiology, with training
                            levels I and II achieved and additional training in
                            Hugo Tobar’s Lockdown Series and Coronavirus;
                            Emotion Code Training, and Kinergetics Reset
                            Seminar.
                        </p>
                        <p className="px-2 md:px-6 lg:px-10">
                            Terri is the owner of Integral Brain Health and
                            currently works there as a practitioner.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
