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
                <h1>Step 1</h1>
                <p>Download Study Guide</p>
            </div>
            <button>
                <img src='download--arrow' /> Download
            </button>
            <div>
                Essential Study Tips For Using a Study Guide
                <ol>
                    <li>Follow the Guide Structure:</li>
                    <p>Tip 1 Description</p>
                    <li>Active Review Techniques:</li>
                    <p>Tip 2 Description</p>
                    <li>Regular Self-Assessment:</li>
                    <p>Tip 3 Description</p>
                </ol>
                <p>These tips will help you make the most of your study guide and effectively prepare you for your exam.</p>
                <button>{`Next >`}</button>
            </div>
        </div>
    </>
)