import React from 'react';
import {useNavigate} from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate()
  return (
    <div>
      Update
      <div>
        Details
        <div className="card">
          <div className="card-header">
            <button className="btn btn-primary" type="button" onClick={() => {navigate(-1)}}>GO Back</button>
            Featured
          </div>
          <div className="card-body">
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
              <input type="text" className="form-control" aria-label="Sizing example input"
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
              <input type="text" className="form-control" aria-label="Sizing example input"
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Price</span>
              <input type="text" className="form-control" aria-label="Sizing example input"
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Category</span>
              <input type="text" className="form-control" aria-label="Sizing example input"
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Picture</span>
              <input type="text" className="form-control" aria-label="Sizing example input"
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
              details
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Update;
