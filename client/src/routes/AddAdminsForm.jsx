const AddAdminsForm = () => {
    return (
        <div className="flex flex-col gap-10 items-center max-w-4xl w-full  p-6 rounded-xl shadow-lg bg-white">
             <h2 className="text-2xl font-semibold text-center mb-6">Add New Admin</h2>
            <form>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="border border-charcoal rounded-xl p-2"
                    ></input>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="border border-charcoal rounded-xl p-2"
                    ></input>
                    <input
                        type="text"
                        placeholder="Email Address"
                        className="border border-charcoal rounded-xl p-2"
                    ></input>
                    <button className="bg-green-600 hover:bg-green-500 p-2 rounded-xl text-white font-semibold transition-all duration-200">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddAdminsForm;
