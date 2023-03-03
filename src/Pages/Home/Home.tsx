import { useState, useEffect } from 'react'
import './home.css';
import { CollectionCenterData } from '../../types/type';

//import { getPublicContent } from '../../services/user.service'
import HomeSearchBar from '../Home/search_bar/search_bar'

import banner_xl from '../../assets/Images/main_banner.jpg';
import CollectionCenterList from './CollectionCenterList/CollectionCenterList';
import MapModal from '../../Modal/MapModal';
import { useNavigate } from 'react-router-dom';
import * as authService from "../../services/auth.service"
import { getcollectionCenterList } from '../../services/public.service';


const Home = (props: any) => {
  const navigate = useNavigate();
  const [collectionCenterList, setCollectionCenterList] = useState<CollectionCenterData[]>([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const { loginStatus } = props;

  useEffect(() => {
    getcollectionCenterList()
      .then((data) => {
        setCollectionCenterList(data.response)
      });
  }, []);

  return (
    <>
      <div id="main_banner">
        <img src={banner_xl}></img>
      </div>
      <HomeSearchBar collectionList={collectionCenterList} onCenterData={setCollectionCenterList} />
      <div>
        <button id="mapBtn" className="mx-5 btn btn-sm mt-5" onClick={() => setShowMapModal(true)}>Map View</button>
        <MapModal show={showMapModal} onHide={() => setShowMapModal(false)} />
      </div>

      {collectionCenterList && collectionCenterList.length > 0 ?
        <CollectionCenterList collectionList={collectionCenterList} loginStatus={loginStatus} /> :
        <div className='text-center'>
          <p className="p-5">Sorry, no results found!</p>
        </div>
      }
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm justify-content-center">
          <li className="page-item m-0">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item m-0"><a className="page-link" href="#">1</a></li>
          <li className="page-item m-0"><a className="page-link" href="#">2</a></li>
          <li className="page-item m-0"><a className="page-link" href="#">3</a></li>
          <li className="page-item m-0">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Home

