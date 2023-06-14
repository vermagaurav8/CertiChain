// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertiChain {
    address private owner;
    event FileCertified(address indexed certifier, address indexed student, string ipfsHash, uint timestamp);

    struct Certificate {
        string name;
        string organization;
        string details;
        address certifier;
        address student;
        string ipfsHash;
        string ipfsLink;
        uint timestamp;
    }

    mapping (address => bool) private authorizedCertifiers;                   // people who can certify a certificate
    mapping (address => Certificate[]) private certificatesByStudent;        // list of certificates mapped to a student
    address[] private authorizedCertifiersList; 

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAuthorizedCertifier(address certifier) public onlyOwner {
        authorizedCertifiers[certifier] = true;
        authorizedCertifiersList.push(certifier);                             // owner of contract can make new authorized personnel
    }

    function removeAuthorizedCertifier(address certifier) public onlyOwner {
        authorizedCertifiers[certifier] = false;                              // remove certifiers 
        for (uint256 i = 0; i < authorizedCertifiersList.length; i++) {
            if (authorizedCertifiersList[i] == certifier) {
                authorizedCertifiersList[i] = authorizedCertifiersList[authorizedCertifiersList.length - 1];
                authorizedCertifiersList.pop();
                break;
            }
        }                            
    }

    function certifyFile(string memory name, string memory organization, string memory details, address student, string memory ipfsLink, string memory ipfsHash) public payable {
        require(authorizedCertifiers[msg.sender], "Only authorized certifiers can call this function.");
        require(student != address(0), "Invalid student address");

        Certificate memory newCertificate = Certificate(name, organization, details, msg.sender, student, ipfsHash, ipfsLink, block.timestamp);
        certificatesByStudent[student].push(newCertificate);

        emit FileCertified(msg.sender, student, ipfsHash, block.timestamp);
    }

    // for student 
    function getCertificatesByStudent() public view returns (Certificate[] memory) {
        return certificatesByStudent[msg.sender];
    }

    // student or verifier
    function getCertificateByHash(string memory ipfsHash, address person) public view returns (Certificate memory) {
        for (uint i = 0; i < certificatesByStudent[person].length; i++) {
            Certificate memory certificate = certificatesByStudent[person][i];
            if (keccak256(bytes(certificate.ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return certificate;
            }
        }
        revert("Certificate not found.");
    }

    // get all authorized Certifiers
    function getAuthorizedCertifiers() public view returns (address[] memory) {
        return authorizedCertifiersList;
    }
}
