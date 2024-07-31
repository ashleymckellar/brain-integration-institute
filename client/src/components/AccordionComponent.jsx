
import AccordionCopy from '../AccordionCopy.json';
import AccordionCard from './AccordionCard.jsx';

import {
    Accordion
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export const AccordionComponent = () => {
    console.log(AccordionCopy);

    //Video Presentation
    //Brain Integration Training
    //Clinical Hours
    //First Aid Certification
    //CPR Certification
    //Insurance
    //Study Guide
    //Assessment
    //If you set allowMultipleExpanded to true then the accordion will permit multiple items to be expanded at once.
    //<Accordion allowMultipleExpanded>
    //import items as props or context and map over them

    return (
        <div>
            <p>
                Follow these steps to submit your documentation for
                certification review. You may complete them in any order, except
                for the assessment, which can only be accessed once the
                preceding items are completed. If you have any questions about
                the process, please contact us, and a member of our board will
                be happy to assist you.
            </p>

            <Accordion allowMultipleExpanded>
                {AccordionCopy.map((copy) => (
                    <AccordionCard {...copy} key={copy.title} />
                ))}
            </Accordion>
        </div>
    );
};
