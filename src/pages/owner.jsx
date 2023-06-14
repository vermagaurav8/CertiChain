import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import certichain from '../../artifacts/contracts/CertiChain.sol/CertiChain.json';
import { certichainAddress } from '../../config';
import { toast } from 'react-toastify';

const provider = window.ethereum;
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function Owner() {
  const [certifier, setCertifier] = useState('');
  const [authorizedCertifiers, setAuthorizedCertifiers] = useState([]);
  const [adding,setAdding]=useState(false);
  const [remove,setRemoving]=useState(false);

  useEffect(() => {
    fetchAuthorizedCertifiers();
  }, []);

  const fetchAuthorizedCertifiers = async () => {
    try {
      const certifiers = await Certichain.methods.getAuthorizedCertifiers().call();
      setAuthorizedCertifiers(certifiers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCertifier = async (event) => {
    event.preventDefault();
    setAdding(true);
    try {
      await Certichain.methods.addAuthorizedCertifier(certifier).send({ from: window.ethereum.selectedAddress });
      toast("Certifier added successfully");
      fetchAuthorizedCertifiers();
      setCertifier('');
    } catch (error) {
      console.error(error);
      toast("Failed to add authorized certifier.");
    }
    setAdding(false);
  };

  const handleRemoveCertifier = async (certifierAddress) => {
    setRemoving(true);
    try {
      await Certichain.methods.removeAuthorizedCertifier(certifierAddress).send({ from: window.ethereum.selectedAddress });
      toast("Certifier removed successfully.");
      fetchAuthorizedCertifiers();
    } catch (error) {
      console.error(error);
      toast('Failed to remove authorized certifier.');
    }
    setRemoving(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Add or Remove Authorized Certifier</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-3/4 max-w-screen">
        <div className='flex flex-col justify-center items-center'>
          <form  onSubmit={handleAddCertifier}>
            <label className="mb-2 block">
              <b>Address of Certifier</b>
              <input
                type="text"
                value={certifier}
                onChange={(e) => setCertifier(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              {adding?<div class="animate-spin inline-block w-6 h-6 p-1 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
              </div>:"Add Authorized Certifier"}
            </button>
          </form>
        </div>
        <div className='text-center p-4 gap-1'>
          <h3 className="text-xl font-bold mb-4">Authorized Certifiers</h3>
          {authorizedCertifiers.length>0 &&<div className='border border-black w-full'></div>}
          {authorizedCertifiers.length > 0 ? (
            <ul className="flex flex-col justify-start items-stretch space-y-4 p-1 border-b-2 border-gray-400">
              {authorizedCertifiers.map((certifierAddress) => (
                <li key={certifierAddress} className="flex items-center justify-between my-2 rounded-lg">
                  <p className='mr-5'>{certifierAddress}</p>
                  <button
                    onClick={() => handleRemoveCertifier(certifierAddress)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                  >
                    {remove?<div class="animate-spin inline-block w-5 h-5 p-1 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                      <span class="sr-only">Loading...</span>
                    </div>:"Remove"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No authorized certifiers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Owner;
