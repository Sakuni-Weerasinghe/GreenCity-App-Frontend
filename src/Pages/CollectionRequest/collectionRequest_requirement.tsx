import React from 'react'

const CollectionRequest_requirement = () => {
  return (
    <>
      <div className="container mt-5 border mb-5">
        <div className="message alert alert-danger text-center mt-3" role="alert">
          <h5 className="alert-heading">Order Creating is failed!</h5>
        </div>
        <div className="row">
          <div className="col-xl-6 col-sm-12 col-lg-6 col-md-6 p-3 mx-auto">
            <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
              <h4 className="mb-0">Delivery Details</h4>
            </div>
            <div className="mt-2 p-3 border">
              <form >
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" placeholder="Address line 1" />
                  <input type="text" className="form-control mt-2" placeholder="Address line 2" />
                  <input type="text" className="form-control mt-2" placeholder="Address line 3" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <select className="form-control col-md-6">
                    <option value="" selected disabled>Location...</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Negombo">Negombo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Note</label>
                  <textarea className="form-control" ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-sm-12 col-md-6 p-3 mx-auto">
            <div className="jumbotron jumbotron-fluid py-2 text-center mb-3 py-3">
              <h4 className="mb-0">Shop Details</h4>
            </div>
            <div className="mt-2 p-3 border">
              <div>
                <h5>Shop Name</h5>
              </div>
              <hr />
              <div className="border p-3 mb-3">
                <ul className="list-group list-group-flush text-center">
                  <li className="list-group-item">LKR</li>
                  <li className="list-group-item">Delivery in : Days </li>
                  <li className="list-group-item">Location : Location </li>
                </ul>
              </div>
              <form>
                <div className="col-auto mb-2">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div id="quantityLabel" className="input-group-text">Quantity :</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Enter quantity..." />
                    <div className="input-group-prepend">
                      <div className="input-group-text">Unit</div>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
                <div className="col-auto">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div id="totalPriceLabel" className="input-group-text">Total Price :</div>
                    </div>
                    <input id="totalPrice" type="text" className="form-control" placeholder="{{totalPrice}}.00 LKR" />
                  </div>
                </div>
              </form>
            </div>
            <hr />
            <div className="text-right">
              <button className="btn" data-target="#exampleModal" id="submit-btn" data-toggle="modal" type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionRequest_requirement
