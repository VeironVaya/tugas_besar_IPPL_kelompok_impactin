import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { XCircle, AlertTriangle } from "lucide-react";

const CancelEventPopUp = ({ open, onClose, onConfirm }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XCircle size={22} />
        </button>

        {/* header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="text-red-600" size={26} />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Cancel Event
          </h2>

          <p className="text-sm text-gray-600">
            Are you sure you want to cancel this event?  
            This action cannot be undone.
          </p>
        </div>

        {/* actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Cancel Event
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CancelEventPopUp;
