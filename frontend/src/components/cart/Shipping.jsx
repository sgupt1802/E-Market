import React from 'react'

const Shipping = () => {
  return (
    <>
    <div className="row wrapper mb-5">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          action="your_submit_url_here"
          method="post"
        >
          <h2 className="mb-4">Shipping Info</h2>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value=""
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city_field" className="form-label">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              name="city"
              value=""
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone_field" className="form-label">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              name="phoneNo"
              value=""
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postal_code_field" className="form-label"
              >Postal Code</label
            >
            <input
              type="number"
              id="postal_code_field"
              className="form-control"
              name="postalCode"
              value=""
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country_field" className="form-label">Country</label>
            <select
              id="country_field"
              className="form-select"
              name="country"
              required
            >
      
              <option value="Country1">Country1</option>
              <option value="Country2">Country2</option>
              
            </select>
          </div>

          <button id="shipping_btn" type="submit" className="btn w-100 py-2">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Shipping