
function Pagination( props ) {
    const {previous, next, searchOffset, searchLimit, setSearchOffset} = props;

    return (
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center">
                {previous && (
                    <button
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-l"
                        onClick={() => setSearchOffset(searchOffset - searchLimit)}
                    >
                        Previous
                    </button>
                )}
                {next && (
                    <button
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-r"
                        onClick={() => setSearchOffset(searchOffset + searchLimit)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default Pagination;