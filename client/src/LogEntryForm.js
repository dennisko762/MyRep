import React, { useState } from "react";
import "./LogEntryForm.css";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      setError(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label for="title">Title</label>
      <input name="title" required ref={register}></input>
      <label for="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label for="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label for="image">Image</label>
      <input name="image" ref={register}></input>
      <label for="visitDate">VisitDate</label>
      <input name="visitDate" type="date" ref={register}></input>
      <button disabled={loading}>
        {loading ? "Loading...." : "Create Entry"}
      </button>
    </form>
  );
};

export default LogEntryForm;
