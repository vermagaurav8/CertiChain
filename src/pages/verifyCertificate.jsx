import React, { useState, useEffect } from "react";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";
import Web3 from "web3";
import { CertificateDetail, Loader } from "../component";
import { toast } from "react-toastify";

const web3 = new Web3(window.ethereum);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

const VerifyCertificate = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [address, setAddress] = useState("");
  const [certificate, setCertificate] = useState({
    stuname: "",
    organization: "",
    details: "",
    certifier: "",
    student: "",
    hash: "",
    link: "",
  });
  const[loader,setLoader]=useState(false);

  useEffect(() => {
    console.log("certificate object is :", certificate);
  }, [certificate]);

  async function getCertificate(ipfsHash, address) {
    setLoader(true);
    try {
      const result = await Certichain.methods
        .getCertificateByHash(ipfsHash, address)
        .call();
      setCertificate({
        ...certificate,
        stuname: result.name,
        organization: result.organization,
        details: result.details,
        certifier: result.certifier,
        student: result.student,
        hash: result.ipfsHash,
        link: result.ipfsLink,
      });
      toast.success("Verified Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Hash/Address!");
    }
    setLoader(false);
  }

  const handleVerify = (e) => {
    e.preventDefault();
    getCertificate(ipfsHash, address);
  };

  if(certificate.hash.length<=0){
    return (

      <div className="h-96 flex items-center justify-center">
        <form onSubmit={handleVerify} className="border rounded-xl shadow-2xl p-4">
          <h2 className="text-center text-2xl font-bold mb-4">
            Verify Certificate
          </h2>
          <div className="flex flex-col items-stretch justify-between">
            <div className="mb-4">
              <label htmlFor="ipfsHash" className="font-bold">
                IPFS Hash:
              </label>
              <input
                type="text"
                id="ipfsHash"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="font-bold">
                Address:
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
              <button
                className="bg-blue-500 block hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
              >
                {loader?<Loader/>:'Verify'}
              </button>
          </div>
        </form>
      </div>
      
    );
  };


  return (
    <CertificateDetail certificate={certificate}/>
  );
};

export default VerifyCertificate;

