import react, { useEffect, useState } from "react";
import './search_bar.css';
import { getcollectionCenterList } from "../../../services/public.service";

const style = {
    search_bar: {
        background: "#EBECE4",
        alignItems: 'center',
    },
}

const Search_bar = (props: any) => {
    const collection_center_list = props.collectionList;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [centerData, setCenterData] = useState(collection_center_list);
    const [centerSearchData, setCenterSearchData] = useState(collection_center_list);
    const [location, setLocation] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        getcollectionCenterList()
            .then((data) => {
                setCenterData(data.response)
                setCenterSearchData(data.response)
            });
    }, []);

    const handleSearch = () => {
        // debugger
        const newCenterData = centerData.filter((x: { location: any; wastetype: any; }) => x.location == (location == '' ? x.location : location)
            && x.wastetype == (category == '' ? x.wastetype : category))
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
                            <option value="">Waste Type</option>
                            <option value="Plastic">Plastic </option>
                            <option value="Metal">Metal </option>
                            <option value="Glass">Glass</option>
                            <option value="Polythene">Polythene</option>
                            <option value="E-Waste">E-Waste</option>
                            <option value="Paper">Paper</option>
                            <option value="Rubber">Rubber</option>
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


