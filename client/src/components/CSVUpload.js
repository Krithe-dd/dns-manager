import React, { useRef, useState } from "react";
import Modal from "./Modal";
import classes from "./CSVUpload.module.css";
import axios from "axios";
import Button from "./Button";

const CSVUpload = ({ onClose, onFormSave }) => {
  const [submit, setSubmit] = useState(false);
  const fileRef = useRef(null);
  const handleOnClose = () => {
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileRef.current.files[0]) return;
    setSubmit(true);
    const form = new FormData();
    form.append("file", fileRef.current.files[0]);

    const res = await axios.post("/api/records/upload", form);
    onFormSave();
    setSubmit(false);
    onClose();
  };
  return (
    <Modal onClose={handleOnClose}>
      <form className={classes.csvForm} encType="multipart/form-data">
        <label>
          <h3>Upload a file</h3>
        </label>
        <input type="file" accept="text/csv" ref={fileRef} />
        <Button
          disabled={submit}
          clickHandler={handleSubmit}
          title={submit ? "Submitting" : "Submit"}
        />
      </form>
    </Modal>
  );
};

export default CSVUpload;
