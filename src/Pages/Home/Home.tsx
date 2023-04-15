import { useState, useEffect } from 'react'
import './home.css';
import { SearchPanel } from './search_bar/SearchPanel';

import main_banner from '../../assets/Images/main_banner.png';
import { CollectionCenterList } from './CollectionCenterList/CollectionCenterList';
import MapModal from '../map/modals/map-modal/MapModal';
import { PublicService } from '../../shared/services/public.service';
import { CollectionCenterSummary } from '../../shared/models/publicModals';


export const Home = () => {
  const [collectionCenterList, setCollectionCenterList] = useState<CollectionCenterSummary[]>([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [activeView, setActiveView] = useState('list');

  useEffect(() => {
    /**
     * This function is used to get collection center summary details list according to pagination
     * @param pageNumber : page number
     * @param count : page results count
     */
    const getCollectionCenterSummaryList = async (pageNumber: number, count: number) => {
      try {
        const response = await PublicService.getCollectionCenterSummaryList(pageNumber, count);
        if (response && response.status) {
          setCollectionCenterList(response.response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCollectionCenterSummaryList(0, 10);
  }, []);

  /**
 * This function is used to filter collection centers according to the searched criteria
 * @param searchedCriteria : location, category
 */
  const searchCollectionCenters = (searchedCriteria: { location: string, category: string }) => {
    console.log(searchedCriteria);
  }

  return (
    <>
      {/* main banner */}
      <div id="main_banner">
        <img src={main_banner} alt='welcome_banner'></img>
      </div>
      {/* search bar */}
      <SearchPanel collectionList={collectionCenterList} searchCollectionCenters={searchCollectionCenters} />
      <div id="home-content" className='p-5'>
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
                collectionCenterList && collectionCenterList.length > 0 ? <CollectionCenterList dataList={collectionCenterList} /> :
                  <div className='text-center'>
                    <p className="p-5">Sorry, no results found!</p>
                  </div>
              }
              {/* pagination */}
              {
                collectionCenterList.length > 0 ? (
                  <nav className='mt-5' aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-center">
                      <li className="page-item m-0">
                        <a className="page-link" href="/" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li className="page-item m-0"><a className="page-link" href="/">1</a></li>
                      <li className="page-item m-0"><a className="page-link" href="/">2</a></li>
                      <li className="page-item m-0"><a className="page-link" href="/">3</a></li>
                      <li className="page-item m-0">
                        <a className="page-link" href="/" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                ) : <></>
              }
            </div>
        }
      </div>

    </>
  )
}


