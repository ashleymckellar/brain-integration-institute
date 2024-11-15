return (
    <>
        <div className="result--filter">
            <h2>Refine Results</h2>
            <form className="filter--option">
                <input 
                type="text" 
                value={practitioner.name}
                name='name'
                onChange={}
                placeholder="Name..."
                />
                <button
                onClick={resultFilter()}
                >
                    <img src="magnifying-glass-icon" />
                </button>
            </form>
            <form className="filter--option">
                <input 
                type="text" 
                value={practitioner.speciality}
                name='speciality'
                onChange={}
                placeholder="Speciality..."
                />
                <button
                onClick={resultFilter()}
                >
                    <img src="magnifying-glass-icon" />
                </button>
            </form>
            <form className="filter--option">
                <input 
                type="text" 
                value={practitioner.location}
                name='location'
                onChange={}
                placeholder="Zip Code, City or State..."
                />
                <button
                onClick={resultFilter()}
                >
                    <img src="magnifying-glass-icon" />
                </button>
            </form>
        </div>
        <div>
      </div>
    </>
)