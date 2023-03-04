import { useState, useEffect } from 'react'
import './home.css';
import { CollectionCenterData } from '../../types/type';

//import { getPublicContent } from '../../services/user.service'
import HomeSearchBar from '../Home/search_bar/search_bar'

import banner_xl from '../../assets/Images/main_banner.jpg';
import CollectionCenterList from './CollectionCenterList/CollectionCenterList';
import MapModal from '../../Modal/MapModal';
import { useNavigate } from 'react-router-dom';
import * as authService from "../../shared/services/auth.service"
import { getcollectionCenterList } from '../../services/public.service';


const Home = (props: any) => {
  const navigate = useNavigate();
  const [collectionCenterList, setCollectionCenterList] = useState<CollectionCenterData[]>([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const { loginStatus } = props;
  const [activeView, setActiveView] = useState('list');

  useEffect(() => {
    getcollectionCenterList()
      .then((data) => {
        setCollectionCenterList(data.response)
      });
  }, []);

  return (
    <>
      {/* main banner */}
      <div id="main_banner">
        <img src={banner_xl}></img>
      </div>
      {/* search bar */}
      <HomeSearchBar collectionList={collectionCenterList} onCenterData={setCollectionCenterList} />
      <div className='container py-5'>
        {/* toggle for list and map views */}
        <div className='text-end'>
          <i className={'list-icon me-2 ' + (activeView === 'list' ? 'active' : '')} onClick={() => { setShowMapModal(false); setActiveView('list') }}></i>
          <i className={'map-icon ' + (activeView === 'map' ? 'active' : '')} onClick={() => { setShowMapModal(true); setActiveView('map') }}></i>
        </div>
        {
          // map view
          showMapModal ? <MapModal show={showMapModal} onHide={() => setShowMapModal(false)} /> :
            // list view
            <div>
              {/* collection center list */}
              {
                collectionCenterList && collectionCenterList.length > 0 ?
                  <CollectionCenterList collectionList={collectionCenterList} loginStatus={loginStatus} /> :
                  <div className='text-center'>
                    <p className="p-5">No Collection Center....</p>
                  </div>
              }
              {/* pagination */}
              {/* {
                collectionCenterList.length > 0 ? (
                  <nav className='mt-5' aria-label="Page navigation example">
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
                ) : <></>
              } */}
            </div>
        }
      </div>

    </>
  )
}

export default Home

