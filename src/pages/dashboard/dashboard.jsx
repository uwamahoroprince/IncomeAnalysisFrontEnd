import React from "react";
import Widget from "../../components/ui/widget/widget";

const Dashboard = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="row">
          <Widget
            title="Amount Due"
            number="1.343"
            persentage="1.55"
            subTitle="Since Last Week"
          />
          <Widget
            title="Amount Due"
            number="1.343"
            persentage="1.55"
            subTitle="Since Last Week"
          />
          <Widget
            title="Amount Due"
            number="1.343"
            persentage="1.55"
            subTitle="Since Last Week"
          />
          <Widget
            title="Amount Due"
            number="1.343"
            persentage="1.55"
            subTitle="Since Last Week"
          />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
