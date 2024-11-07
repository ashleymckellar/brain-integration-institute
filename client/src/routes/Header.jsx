const Header = () => {
    return (
        <div>
            {/* Brain Trust Integration Intitute Stamp image element */}
            <Navbar/>
                {/* Navbar will handle the links to "Home", "About Us", "Certifications" and "Find Practitioner" 
                page links
                */}
            <div className="userFeatures">
                <Notifications/>
                {/* image link to PersonalProfile */}
            </div>
                {/* 
                    The "userFeatures" div will handle the Notifications component and the link to the 
                    user's personal profile page.
                */}
        </div>
    )
}
export {Header}