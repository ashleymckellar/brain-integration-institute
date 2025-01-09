import { useState, useEffect, useContext } from 'react';
import { AssessmentContext } from '../contexts';

export const TestResults = () => {

    const { score } = useContext(AssessmentContext)
    return (
        <div className="p-4 space-y-6">
        {/* Score Section */}
        <header className="text-center">
            <h1 className="text-2xl font-bold">Your score is {score}%</h1>
            <h2 className="text-lg text-gray-600">A passing score is 70 or above.</h2>
        </header>
    
        {/* Missed Sections */}
        <section className="space-y-4">
            <p className="text-base text-gray-800">
                These are the test sections in which you missed one or more questions. We encourage you to review these sections thoroughly before retaking the test.
            </p>
            <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-sky-blue text-black">
                    Brain Introduction
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-mauve text-black">
                    Hypothalamus
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-ice-blue text-black">
                    Diencephalon
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-lavender text-black">
                    Hemispheres
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-lightest-grey text-black">
                    Parietal Lobe
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-greyish-blue text-black">
                    Temporal Lobe
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-pinky-pink text-black">
                    Prefrontal Cortex
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-sky-blue text-black">
                    Occipital Lobe
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-mauve text-black">
                    Brainstem
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-ice-blue text-black">
                    Cerebellum
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-lavender text-black">
                    Autonomic Nervous System
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-lightest-grey text-black">
                    Glial Cells
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-greyish-blue text-black">
                    Neuron Function
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-pinky-pink text-black">
                    Motor Neurons
                </div>
                <div className="px-3 py-1 rounded-full text-sm font-semibold text-center bg-sky-blue text-black">
                    Optic Nerve
                </div>
            </div>
        </section>
    
        {/* Recommendations */}
        <article>
            <p className="text-base text-gray-800">
                We recommend that you study these sections more in depth before retaking the test in three weeks. Once the three-week waiting period has passed, you have 90 days to retake the test free of charge.
            </p>
            <p className="text-base text-gray-800 mt-4">
                If you do not pass the second attempt, there will be an additional three-week waiting period, and a fee of $250 will apply for subsequent attempts.
            </p>
        </article>
    </div>
    )}
    