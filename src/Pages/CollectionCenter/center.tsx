import { useState, useEffect } from "react";

import { getCenterBoard } from "../../services/user.service";
import center from "../../assets/Images/center1.jpg";
import "./collectioncenter.css";

const BoardCenter = () => {
  // const [content, setContent] = useState<string>("");

  // useEffect(() => {
  //   getCenterBoard().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
    <>
      <div id="main_banner">
        {/*<img src={banner} alt="" />*/
        }
      </div>

      <div className="container mt-4">
        <div>
          <h2>Center Name</h2>
          <p>Created On: | Created By:</p>
        </div>

        <div className="row mx-auto">
          <div id="shopPicture" className="col-xl-6 col-lg-6 col-md-9 col-sm-12 px-0 my-auto">
            <img src={center} className="w-100 h-500 " />
          </div>
          <div className="col-xl-6 col-md-3 col-lg-6 col-sm-12 p-0 my-auto">
            <ul className="list-group text-center">
              <li className="list-group-item text-light p-1 title">Category</li>
              <li className="list-group-item p-2 data">Glass | Plastic</li>
              <li className="list-group-item text-light p-1 title">Location</li>
              <li className="list-group-item p-2 data">Peradeniya, Kandy</li>
              <li className="list-group-item text-light p-1 title">Contact</li>
              <li className="list-group-item p-2 data">+94077123456</li>
              <li className="list-group-item p-2 data">center1@gmail.com</li>
              <li className="list-group-item text-light p-1 title">Working days</li>
              <li className="list-group-item p-2 data">Weekdays</li>
            </ul>
          </div>
        </div>

        <div id="description" className="row mt-3 mx-0">
          <h4 className="col py-3 text-center">Description</h4>
        </div>
        <div>
          <p className="text-justify p-3 py-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur qui ab eveniet quos voluptate ex tenetur repellat aliquid, recusandae, itaque nihil ea! Atque delectus illum asperiores voluptates unde, consequuntur voluptatum?</p>
        </div>
        <div>
          <button className="btn btn-dark btn-block px-3 mb-3 mt-1"> Request  </button>
        </div>
      </div>
    </>
  );

};

export default BoardCenter;