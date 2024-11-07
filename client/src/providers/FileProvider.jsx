/* eslint-disable react/prop-types */
import { FileContext } from "../contexts";
import { useFileAPI } from "../hooks";

export const FileProvider = ({ children }) => {
    const fileApi = useFileAPI();
    return (
        <FileContext.Provider value={fileApi}>
            {children}
        </FileContext.Provider>
    )
}