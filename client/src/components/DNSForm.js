import React, { useState } from "react";
import Modal from "./Modal";
import classes from "./DNSForm.module.css";
import axios from "axios";
import Button from "./Button";

const DNSForm = ({ onClose, formData, onFormSave }) => {
  const [inputValues, setInputValues] = useState({
    domain: formData?.domain || "",
    recordType: formData?.recordType || "A",
    ip: formData?.ip || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleOnClose = () => {
    onClose();
  };

  const handleDomainChange = (e) => {
    setInputValues({ ...inputValues, domain: e.target.value });
  };
  const handleAddressChange = (e) => {
    setInputValues({ ...inputValues, recordType: e.target.value });
  };
  const handleIpChange = (e) => {
    setInputValues({ ...inputValues, ip: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSaving(true);
    if (formData?.id) {
      const { data } = await axios.patch("/api/records", {
        ...inputValues,
        id: formData.id,
        docId: formData.docId,
      });
      if (data.error) {
        setError(data.message);
        setSaving(false);
        return;
      }
    } else {
      const { data } = await axios.post("/api/records", inputValues);
      setError(error);
      if (data.error) {
        setError(data.message);
        setSaving(false);
        return;
      }
    }
    onFormSave();
    setSaving(false);
    onClose();
  };
  return (
    <Modal onClose={handleOnClose}>
      <form onSubmit={handleSubmit} className={classes.dnsForm}>
        {formData ? <h3>Edit Entry</h3> : <h3>New DNS Entry</h3>}
        <div className={classes.formControl}>
          <label>Domain Name</label>
          <input
            type="text"
            value={inputValues.domain}
            onChange={handleDomainChange}
            placeholder="www.domainname.com"
          />
        </div>
        <div className={classes.formControl}>
          <label>Address</label>
          <select value={inputValues.recordType} onChange={handleAddressChange}>
            <option>A</option>
            <option>AAAA</option>
            <option>CNAME</option>
            <option>MX</option>
            <option>TXT</option>
            <option>PTR</option>
            <option>SRV</option>
          </select>
        </div>
        <div className={classes.formControl}>
          <label>IPv4 Address</label>
          <input
            type="text"
            value={inputValues.ip}
            onChange={handleIpChange}
            placeholder="192.0.2.1"
          />
        </div>
        {error && <p>{error}</p>}
        <Button
          type="submit"
          disabled={saving}
          title={saving ? "Saving..." : "Save"}
        />
      </form>
    </Modal>
  );
};

export default DNSForm;
