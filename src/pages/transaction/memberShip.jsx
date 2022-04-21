import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import { url } from "../../constants/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const MemberShip = () => {
  const [activity, setActivity] = useState([]);
  const [allClient, setAllClient] = useState([]);
  const [allActivity, setAllActivity] = useState([]);
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [allData, setAllData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [status, setStatus] = useState(false);

  const isFound = false;
  const handleSubmit = async (event) => {
    let response;
    event.preventDefault();

    try {
      if (!status) {
        response = await fetch(`${url.memberShip}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activity: activity,
            client: client._id,
            startDate: startDate,
            endDate: endDate,
          }),
        });
      } else {
        response = await fetch(`${url.memberShip}/${updateId}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activity: activity,
            client: client._id,
            startDate: startDate,
            endDate: endDate,
          }),
        });
      }
      setStatus(false);
      console.log(activity);
    } catch (error) {
      console.log(error);
    }
    setClient("");
    setStartDate("");
    setEndDate("");
    setResponseMessage(response.statusText);
    toast(responseMessage);
    closeModal();
  };
  const getData = async () => {
    try {
      const allData = await axios.get(`${url.memberShip}`);

      setAllData(allData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (id) => {
    try {
      const allData = await axios.delete(`${url.activity}/${id}`);
      setResponseMessage(allData.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const getClients = async () => {
    try {
      const response = await axios.get(`${url.client}`);
      setAllClient(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const option = [];
  const getActivities = async () => {
    try {
      const response = await axios.get(`${url.activity}`);
      setAllActivity(response.data.data);
      const results = response.data.data;
      for (const key in results) {
        option.push({
          value: results[key]._id,
          label: results[key].name,
        });
      }
      setAllActivity(option);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (data) => {
    console.log(data);
    setActivity(data);
  };
  useEffect(() => {
    getData();
    getClients();
    getActivities();
  }, []);
  const customCatStyles = {
    content: {
      top: "10%",
      left: "30%",
      right: "20%",
      background: "#fff",
      opacity: 1,
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "2%",
      outline: "none",
    },
    overlay: {
      backgroundColor: "rgba(238, 228, 248, 0.80)",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">SubScription</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">SubScription List</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-sm-2 pull-right card invoices-tabs-card">
          <div className="card-body card-body pt-0 pb-0">
            <div className="invoices-main-tabs border-0 pb-0">
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12">
                  <div className="invoices-settings-btn invoices-settings-btn-one">
                    <a
                      onClick={openModal}
                      href="#"
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#add_items"
                    >
                      <i data-feather="plus-circle"></i>SubScription
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-sm-11">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-stripped table-hover datatable">
                    <thead className="thead-light">
                      <tr>
                        <th>Activity</th>
                        <th>Client</th>
                        <th>Start Date</th>
                        <th>End Date At</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allData.length !== 0 ? (
                        allData.map((data, index) => (
                          <tr>
                            <td className="items-text">{data.activity.name}</td>
                            <td>{data.client.name}</td>
                            <td className="items-text">{data.startDate}</td>
                            <td className="items-text">{data.endDate}</td>
                            <td className="items-text">{data.status}</td>
                            <td>
                              <span
                                onClick={() => {
                                  openModal();
                                  status(true);
                                  setUpdateId(data._id);
                                }}
                                className="btn btn-sm btn-white text-success me-2"
                              >
                                <i className="far fa-edit me-1"></i> Edit
                              </span>
                              <span
                                onClick={() => {
                                  deleteData(data._id);
                                }}
                                className="btn btn-sm btn-white text-danger"
                              >
                                <i className="far fa-trash-alt me-1"></i>
                                Delete
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>no Data Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customCatStyles}
          contentLabel="Example Modal"
        >
          <form
            className="modal-dialog modal-dialog-centered modal-lg"
            novalidate=""
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="form-header text-start mb-0">
                  <h4 className="mb-0">Create New Subscription</h4>
                </div>
              </div>
              <div className="modal-body">
                <div className="bank-inner-details">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <Select
                          placeholder="Search Activity"
                          closeMenuOnSelect={false}
                          options={allActivity}
                          isMulti
                          isSearchable
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Client</label>
                        <select
                          onChange={(client) =>
                            setClient(client.currentTarget.value)
                          }
                          className="form-select form-control"
                        >
                          {allClient.length != 0 ? (
                            allClient.map((data, index) => (
                              <option key={index} value={data}>
                                {data.name}
                              </option>
                            ))
                          ) : (
                            <span>No Client Found</span>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          placeholder="End Date"
                          onChange={(sDate) => setStartDate(sDate.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          placeholder="End Date"
                          onChange={(eDate) => setEndDate(eDate.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Description (Optional) </label>
                        <textarea
                          required
                          value={description}
                          onChange={(description) =>
                            setDescription(description.target.value)
                          }
                          className="form-control"
                          placeholder="More About Subsctiption"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-sm-2 bank-details-btn">
                  <a
                    onClick={closeModal}
                    className="btn btn-danger bank-cancel-btn"
                  >
                    Cancel
                  </a>
                </div>
                <div className=" col-sm-2 bank-details-btn">
                  <button
                    onClick={handleSubmit}
                    className="btn btn btn-success bank-save-btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
export default MemberShip;
