import React from "react";
import { Loader } from "../component";
const CertificateDetail = ({ certificate }) => {
  const handleDownload = async (e) => {
    e.preventDefault();
    const response = await fetch(certificate.link);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate_preview.png";
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer"; // Set necessary security attributes
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col md:flex-row text justify-start items-center pt-2 px-4">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <form className="bg-white w-3/4 py-4 px-3  border rounded-xl shadow-2xl">
            <h2 className="text-3xl font-bold m-1 text-center">
              Certificate Details
            </h2>
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                Name
              </label>
              <input
                type="text"
                id="ipfsHash"
                value={certificate.stuname}
                className="border border-gray-300 rounded p-2 w-full"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                Organisation
              </label>
              <input
                type="text"
                id="ipfsHash"
                className="border border-gray-300 rounded p-2 w-full"
                value={certificate.organization}
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                Description
              </label>
              <input
                type="text"
                id="ipfsHash"
                value={certificate.details}
                className="border border-gray-300 rounded p-2 w-full"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                Issued by
              </label>
              <input
                type="text"
                id="ipfsHash"
                value={certificate.certifier}
                className="border border-gray-300 rounded p-2 w-full"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                Issued to
              </label>
              <input
                type="text"
                id="ipfsHash"
                value={certificate.student}
                className="border border-gray-300 rounded p-2 w-full"
                disabled
              />
            </div>
            <div className="flex items-center justify-center p-2">
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Download
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <img
            src={certificate.link}
            alt="Certificate Preview"
            className=" min-w-screen "
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
