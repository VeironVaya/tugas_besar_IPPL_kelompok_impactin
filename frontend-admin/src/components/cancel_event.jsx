import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const CancelEventPopUp = ({ open, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError(true);
      return;
    }
    onConfirm(reason);
    setReason("");  // clear
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center z-[99999]"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="relative bg-white rounded-xl p-6 w-full max-w-2xl mx-4 z-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center mb-3">Reason Of Cancellation</h2>

        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setError(false);
          }}
          placeholder="Please fill reason of cancellation"
          className={`w-full min-h-[160px] border rounded-lg p-3 focus:outline-none mb-1 ${error ? "border-red-500" : ""}`}
        />

        {error && (
          <p className="text-red-600 text-sm mb-4">
            Please write the reason if cancellation before confirming.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Confirm
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-500 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CancelEventPopUp;
