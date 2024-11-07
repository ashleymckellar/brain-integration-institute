return (
    <>
        <Masthead/>
            <div className="user--individualCert--progression--bar">
                <div className="progression--bar--milestone">
                    About
                    <img src={'in/complete circle'}/>
                </div>
                <div className="progression--bar--milestone">
                    Study Guide
                    <img src={'in/complete circle'}/>
                </div>
                <div className="pb--trail"></div>
                <div className="progression--bar--milestone">
                    Pay Fee
                    <img src={'in/complete circle'}/>
                </div>
                <div className="pb--trail"></div>
                <div className="progression--bar--milestone">
                    Take Assessment
                    <img src={'in/complete circle'}/>
                </div>
            </div>
            <br />
            <div>
                <div>
                    <h1>Step 4</h1>
                    <p>Take Assessment</p>
                </div>
                <div>
                    Back
                    <p>You are about to enter the test.</p>
                    <br />
                    <p>This is a timed test.</p>
                    <br />
                    <p>We suggest you are away from interruptions.</p>
                    <br />
                    <button>{`Start Test`}</button>
                </div>
            </div>
    </>
)