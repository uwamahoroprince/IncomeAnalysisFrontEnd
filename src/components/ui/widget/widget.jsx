import React from "react";

const Widget = (props) => {
  return (
    <>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card">
          <div className="card-body">
            <div className="dash-widget-header">
              <span className="dash-widget-icon bg-1">
                <i className="fas fa-dollar-sign"></i>
              </span>
              <div className="dash-count">
                <div className="dash-title">{props.title}</div>
                <div className="dash-counts">
                  <p>{props.number}</p>
                </div>
              </div>
            </div>
            <div className="progress progress-sm mt-3">
              <div
                className="progress-bar bg-5"
                role="progressbar"
                // style="width: 75%"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p className="text-muted mt-3 mb-0">
              <span className="text-danger me-1">
                <i className="fas fa-arrow-down me-1"></i>
                {props.persentage}%
              </span>
              {props.subTitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Widget;
