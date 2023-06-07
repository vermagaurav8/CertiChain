# Fake Certificate Identification Platform

This project utilizes blockchain technology to securely store and validate certificates issued by an organization. The certificates and their associated data are stored in a custom data structure within smart contracts, ensuring integrity and immutability. Authorized certifiers have the capability to add new certificates to the blockchain.

To facilitate the interaction with the blockchain, a user-friendly React application serves as the frontend. The owner or deployer of the smart contract has the authority to authorize certifiers, granting them permission to issue certificates. The frontend also provides features for end users, enabling them to retrieve all their certificates or share certificate hashes with potential employers for verification purposes.

The React app includes a Download button, which generates the certificates and makes them easily downloadable for end users, ensuring convenient access to their validated credentials.
<br><br>

# Why Blockchain ?

Problem with centralized systems:
- Single point of failure
- Limited scalability
- Security vulnerabilities
- Lack of privacy control

Solutions:
- Decentralization to eliminate single point of failure
- Distributed computing for scalability
- Strong encryption and access controls for security
- Privacy-enhancing technologies for better privacy control

<br><br>

# Getting Started

1. Clone the project from Git.
2. Navigate to the project directory using the command line: `cd project-name`.
3. Run `npm install` to install the project dependencies.
4. In a separate terminal, start the local hardhat node by running `npx hardhat node`.
5. In the same directory, execute the following commands:
   - `npx hardhat compile` to compile the smart contract.
   - `npx hardhat run scripts/deploy.js --network localhost` to deploy the smart contract to the local blockchain.
6. In another terminal within the same directory, run `npm run dev`.
7. The project should now be running, and you can proceed with further development or testing.

# How to run the project  ?

To run this project, please follow these steps:

1. Make sure you have Metamask installed in your browser. You will need it to interact with the blockchain.
2. Import the private keys of the first hardhat address into Metamask. This is necessary as it is the owner account.
3. With the owner account, you can add new certifiers and certify certificates for users.
4. The project utilizes technologies such as Blockchain, Solidity, React, and hardhat.

By completing these steps, you will be able to interact with the project, manage certifiers, and certify certificates using the owner account through the Metamask extension. The technologies involved include the use of blockchain for secure storage, Solidity for smart contract development, React for the frontend, and hardhat as a development framework.

