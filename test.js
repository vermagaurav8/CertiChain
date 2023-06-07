<div className="grid grid-cols-2">
  {/* First Col */}
  <div className="p-4 w-3/4 border rounded-xl shadow-2xl m-4 flex justify-center">
    <form className="border">
      <h2 className="text-center text-2xl font-bold mb-4">
        Verify Certificate
      </h2>
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
      <div className="flex items-center justify-center">
        <button
          onClick={handleVerify}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
        >
          Verify
        </button>
      </div>
    </form>
  </div>
  ;
