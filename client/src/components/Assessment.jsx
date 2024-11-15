/* eslint-disable react/prop-types */
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import AccordionUpArrow from '../assets/icons/AccordionUpArrow.png';
import AccordionRadioUnfilled from '../assets/icons/AccordionRadioUnfilled.png';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Assessment(props) {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const shouldExpand = urlParams.get('expand') === 'true';

        if (location.hash === '#assessment' && shouldExpand) {
            setIsExpanded(true);

            // Delay the scrolling slightly to ensure the DOM is fully updated
            setTimeout(() => {
                const assessmentElement = document.getElementById('assessment');
                if (assessmentElement) {
                    assessmentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // 100ms delay
        }
    }, [location]);

    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div
                        id="assessment"
                        onClick={toggleExpand}
                        className={
                            isExpanded
                                ? 'expanded-accordion'
                                : 'collapsed-accordion'
                        }
                    >
                        <div className="flex items-center gap-2 pl-9">
                            {!isExpanded ? (
                                <>
                                    <img src={AccordionRadioUnfilled} />
                                    <h1 className="font-fira text-xl text-black font-bold tracking-tight pl-12">
                                        {props.title}
                                    </h1>{' '}
                                </>
                            ) : (
                                <h1 className="font-fira text-xl text-black font-bold tracking-tight ">
                                    {props.title}
                                </h1>
                            )}
                        </div>
                        {isExpanded ? (
                            <button className="pr-5">
                                <img
                                    src={AccordionUpArrow}
                                    alt="Dropdown Arrow"
                                    className={`transform transition-transform duration-500 ${
                                        isExpanded ? 'rotate-0' : 'rotate-180'
                                    }`}
                                />
                            </button>
                        ) : (
                            <button onClick={toggleExpand} className="pr-5">
                                <img
                                    src={AccordionUpArrow}
                                    className={`transform transition-transform duration-500 ${
                                        isExpanded ? 'rotate-0' : 'rotate-180'
                                    }`}
                                />
                            </button>
                        )}
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{props.children}</AccordionItemPanel>
        </AccordionItem>
    );
}

export default Assessment;
