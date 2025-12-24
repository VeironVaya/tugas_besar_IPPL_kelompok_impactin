import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AlertTriangle } from "lucide-react";

const LogoutPopUp = ({ open, onClose, onConfirm }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="text-red-600" size={26} />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Are you sure you want to Sign out?
          </h2>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Sign out
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LogoutPopUp;
