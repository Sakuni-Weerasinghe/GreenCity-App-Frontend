import react, { ChangeEvent, useEffect, useState } from "react";
import './search_bar.css'
import collectionCenterData from '../../../data.json'
import CollectionCenterList from "../CollectionCenterList/CollectionCenterList";
import MapModal from "../../../Modal/MapModal"


const style = {
    search_bar: {
        background: "rgb(248,248,242)",
        alignItems: 'center',
    },
}

const Search_bar = (props: any) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [centerData, setCenterData] = useState(collectionCenterData);
    const [centerSearchData, setCenterSearchData] = useState(collectionCenterData);
    const [location, setLocation] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        fetch('../../../data.json')
            .then((response) =>
                response.json()
            )
            .then(
                (result) => {
                    console.log(result)
                    setCenterData(result);
                    setCenterSearchData(result)
                });
    }, []);

    const handleSearch = () => {
        debugger
        const newCenterData = centerData.filter(x => x.location == (location == '' ? x.location : location)
            && x.waste_type == (category == '' ? x.waste_type : category))
        props.onCenterData(newCenterData)
    }

    return (
        <div>
            <div className='container border rounded-bottom border-1 p-3 pb-0 col-12' style={style.search_bar}>
                <h6 className='pb-2 '>FIND YOUR COLLECTION CENTER</h6>
                <div className="row mb-3 mx-4">
                    <div className="col-md-6 ">
                        <input type="search" className={'form-control'} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                            <option selected value="">Category</option>
                            <option value="Metal">Metal</option>
                            <option value="Paper">Paper</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark btn-block px-5 rounded-1" id='search_btn' onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Search_bar