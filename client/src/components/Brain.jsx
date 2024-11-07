/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import AccordionUpArrow from '../assets/icons/AccordionUpArrow.png';
import AccordionRadioUnfilled from '../assets/icons/AccordionRadioUnfilled.png';

import CheckedRadio from '../assets/icons/checkedRadio.png';

import { useState } from 'react';

export default function Brain(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { brainMetaData } = props;

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    function submitDocument() {
        setIsSubmitted(true);
    }

    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div
                        onClick={toggleExpand}
                        className={
                            isExpanded
                                ? 'expanded-accordion'
                                : 'collapsed-accordion'
                        }
                    >
                        <div className="flex items-center gap-2 pl-9">
                            {!isExpanded && brainMetaData.length === 0 ? (
                                <>
                                    <img src={AccordionRadioUnfilled} />
                                    <h1 className="font-fira text-xl text-black font-bold tracking-tight pl-12">
                                        {props.title}
                                    </h1>
                                </>
                            ) : !isExpanded && brainMetaData.length > 0 ? (
                                <>
                                    <img
                                        className="h-[45px] w-[50px]"
                                        src={CheckedRadio}
                                    />
                                    <h1 className="font-fira text-xl text-black font-bold tracking-tight">
                                        {props.title}
                                    </h1>
                                </>
                            ) : (
                                <>
                                    <h1 className="font-fira text-xl text-black font-bold tracking-tight">
                                        {props.title}
                                    </h1>
                                </>
                            )}
                        </div>
                        {isExpanded ? (
                            <button className="pr-5" onClick={toggleExpand}>
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
