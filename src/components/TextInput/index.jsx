import './style.css';
export const TextInput = ({searchValue , handlechange}) => {
    return (
        <input
        className="textInput" 
        onChange={handlechange}
        value={searchValue}
        type="search" />
    )
}
