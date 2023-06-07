import React, { useEffect, useState } from "react";
import { certichainAddress } from "../../config";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import Web3 from "web3";
import Card from "../component/Card";

const web3 = new Web3(window.ethereum);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

const Home = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await new Web3(window.ethereum).eth.getAccounts();
        const result = await Certichain.methods
          .getCertificatesByStudent()
          .call({ from: accounts[0] });
        setCertificates(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (certificates.length === 0) {
    return <div>No certificates found!</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <div className="grid  grid-cols-3 gap-4">
        {certificates.map((certificate, index) => (
          <Card key={index} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default Home;
