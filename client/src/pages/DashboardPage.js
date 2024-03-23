import React, { useState, useEffect } from "react";
import classes from "./DashboardPage.module.css";
import DNSForm from "../components/DNSForm";
import SearchItem from "../components/SearchItem";
import axios from "axios";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Error from "./Error";
import CSVUpload from "../components/CSVUpload";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  // const [filteredRecords, setFilteredRecords] = useState([])
  const [formEdited, setFormEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCSVForm, setShowCSVForm] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);

      const { data } = await axios.get("/api/records");
      if (data.error) {
        setError(data.message);
        return;
      }
      setRecords(data.records);
      localStorage.setItem("records", JSON.stringify(records));
      setLoading(false);
    };
    fetchRecords();
  }, [formEdited]);

  const handleFormView = () => {
    setShowForm(false);
    setShowCSVForm(false);
  };

  const handleFormSave = () => {
    setFormEdited((prev) => !prev);
  };

  const handleFormEdit = (record) => {
    setShowForm(true);
    setSelectedRecord(record);
  };

  const handleFormDelete = async (record) => {
    const { data } = await axios.delete(`/api/records/${record.docId}`);

    if (data.message === "Success") {
      const updateRecords = records.filter((rec) => rec.id !== record.id);
      setRecords(updateRecords);
    }
  };

  const handleUpload = () => {
    setShowCSVForm(true);
  };

  const handleSearchText = (filteredRecords) => {
    setRecords(filteredRecords);
  };
  return error ? (
    <Error error={error} />
  ) : (
    <div>
      <div className={classes.dashboardWrapper}>
        <Header />
        {showCSVForm && (
          <CSVUpload onClose={handleFormView} onFormSave={handleFormSave} />
        )}
        {showForm && (
          <DNSForm
            formData={selectedRecord}
            onClose={handleFormView}
            onFormSave={handleFormSave}
          />
        )}
        <div className={classes.dashboardContainer}>
          <div className={classes.heading}>
            <SearchItem records={records} onSearch={handleSearchText} />
            <h2>My Dashboard</h2>
            <div className={classes.btnActions}>
              <Button
                clickHandler={() => {
                  setSelectedRecord(null);
                  setShowForm(true);
                }}
                title="Add +"
              />
              <Button clickHandler={handleUpload} title="Upload file" />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : records.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Domain Name</th>
                  <th>Record Type</th>
                  <th>IP address</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr key={record.id} className={classes.dnsRow}>
                    <td>{record.domain || "NA"}</td>
                    <td>{record.recordType || "NA"}</td>
                    <td>{record.ip || "NA"}</td>
                    <td className={classes.btn}>
                      <button onClick={() => handleFormEdit(record)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => handleFormDelete(record)}
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No records found. Add a record or upload a file</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
