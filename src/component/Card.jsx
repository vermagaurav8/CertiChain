import React from "react";

const Card = ({ certificate }) => {
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
      <div className="max-w-xs rounded-xl overflow-hidden shadow-xl border border-2">
        <img className="w-fit" src={certificate.ipfsLink} alt="Card" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {certificate.organization}
          </div>
          <p className="text-gray-700 text-base">{certificate.details}</p>
          <p className="text-black font-bold">
            Issued to <span className="text-black">{certificate.student}</span>
          </p>
          <p className="text-black font-bold">
            IPFS Hash <span>{certificate.ipfsHash}</span>
          </p>
          <div className="text-center container">
            <button onClick={handleDownload} className="bg-blue-600 px-4 w-1/2 py-2 rounded-lg text-white mt-2">
              Download
            </button>
          </div>
        </div>
      </div>
  );
};

export default Card;
