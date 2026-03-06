import "./FindByLocation.scss"
import Map from '../Map/Map'
import { useState } from "react"

function FindByLocation({supportedCountries, onCountryClicked, onSearchClicked}){

    const [searchInput, setSearchInput] = useState('')

    const onSearchChange = (e) => {
        setSearchInput(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //if(onSearchClicked){onSearchClicked();}
    }

    return (<main className="findbylocation main">
        <div className="findbylocation-head">
            <h1 className="findbylocation-head__title">Find a Proxy</h1>
            <form className="findbylocation-head-search" onSubmit={onSubmit}>
                <input className="findbylocation-head-search__input" name="search" placeholder="Search" onChange={onSearchChange} value={searchInput}></input>
                <button className="findbylocation-head-search__button" type="submit" >Go!</button>
            </form>
        </div>
        <Map supportedCountries={supportedCountries} onCountryClicked={onCountryClicked}/>
    </main>)
}

export default FindByLocation;