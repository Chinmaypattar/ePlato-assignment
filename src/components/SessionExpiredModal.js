import React from "react";

const SessionExpiredModal = ({ showModal, handleClose }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Session Expired</h2>
          <p className="mt-4 text-gray-600">Your session has expired. Please log in again to continue.</p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={handleClose}
          >
            Log In Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
