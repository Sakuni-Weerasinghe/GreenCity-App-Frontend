import { useState, useEffect } from 'react'
import './home.css';
import collectionCenterData from '../../data.json'
import { CollectionCenterData } from '../../types/type';

//import { getPublicContent } from '../../services/user.service'
import HomeSearchBar from '../Home/search_bar/search_bar'

import banner_xl from '../../assets/Images/main_banner.jpg';
import CollectionCenterList from './CollectionCenterList/CollectionCenterList';
import MapModal from '../../Modal/MapModal';


const Home = () => {
  const [collectionCenterList, setCollectionCenterList] = useState(collectionCenterData)
  const [showMapModal, setShowMapModal] = useState(false);

  const onCenterData = (collectionCenterList: any) => {
    setCollectionCenterList(collectionCenterList)
  }
  // const[content,setContent] = useState<string>("");

  // useEffect(() => {
  //   getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content = 
  //         (error.response && error.response.data) || 
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //     );
  // }, []);

  return (
    <>
      <div id="main_banner">
        <img src={banner_xl}></img>
      </div>
      <div className='col-12'>

      </div>
      <HomeSearchBar onCenterData={setCollectionCenterList} />
      <div>
        <button id="mapBtn" className="mx-5 btn btn-sm mt-5" onClick={() => setShowMapModal(true)}>Map View</button>
        <MapModal show={showMapModal} onHide={() => setShowMapModal(false)} />
      </div>

      {collectionCenterList && collectionCenterList.length > 0 ?
        <CollectionCenterList collectionList={collectionCenterList} /> :
        <h6 className="p-5">No Collection Center....</h6>
      }
    </>
  )
}

export default Home

