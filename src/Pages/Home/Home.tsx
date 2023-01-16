import { useState, useEffect } from 'react'

//import { getPublicContent } from '../../services/user.service'
import Map from "../../Components/Map/Map"


const Home = () => {
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
    <div>
      <Map />
    </div>
  )
}

export default Home

