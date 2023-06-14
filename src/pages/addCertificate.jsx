import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertiChain.json";
import { certichainAddress } from "../../config";
import { Loader } from "../component";
import { toast } from "react-toastify";

const provider = window.ethereum;
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function generateRandomString() {
  const uuid = uuidv4();
  const segments = uuid.split("-").slice(0, 4);
  const result = segments.map((segment) => segment.substr(0, 3)).join("-");

  return result;
}

function AddCertificate() {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [details, setDetails] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  async function certifyFile() {
    setLoader(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const senderAddress = accounts[0];
      const transaction = await Certichain.methods
        .certifyFile(
          name,
          organisation,
          details,
          address,
          imageLink,
          generateRandomString()
        )
        .send({
          from: senderAddress,
          gas: 2000000,
        });
        toast.success("Certificate added successfully.")
      console.log("transaction: ", transaction);
    } catch (error) {
      toast.error("Error Occurred. Please try again in a while")
    }
    setLoader(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    certifyFile();
    setMessage("Certificate submitted successfully!");
  };


  return (
    <div className="bg-gray-100">
      <div className="flex flex-col md:flex-row text justify-start items-center pt-2 px-4">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white w-3/4 px-4 pt-3 border rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold m-1 text-center">Add Certificate</h2>
            <div className=" p-2">
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div className=" p-2">
              <label className="block mb-2" htmlFor="organisation">
                Organisation
              </label>
              <input
                type="text"
                id="organisation"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div className=" p-2">
              <label className="block mb-2" htmlFor="details">
                Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <div className=" p-2">
              <label className="block mb-2" htmlFor="imageLink">
                Certificate Link
              </label>
              <input
                type="text"
                id="imageLink"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
              <small className="text-red-600">*Link must be a valid link</small>
            </div>
            <div className="mb-4 p-2">
              <label className="block mb-2" htmlFor="address">
                Certificant Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              {loader?<Loader/>:"Add Certificate"}
            </button>
            <p className="text-center mt-4 text-green-600">{message}</p>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4">
          {imageLink ? (
            <img
              src={imageLink}
              alt="Certificate Preview"
              className=" min-w-screen "
            />
          ) : (
            <Loader msg={"Preview is available after inserting certificate link"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCertificate;
