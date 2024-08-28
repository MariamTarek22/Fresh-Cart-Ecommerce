import React from "react";
import style from "./Notfound.module.css";
import errorImage from "../../assets/error.svg";
import PropTypes from 'prop-types';

export default function Notfound({error}) {
  Notfound.propTypes = {
    error: PropTypes.string,  // error must be a string and isnt required
    
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col my-10">
        <h2>{error}</h2>
        <img src={errorImage} alt="error-404" />
      </div>
    </>
  );
}
