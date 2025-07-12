const connectButton = document.getElementById('connectButton');
const statusText = document.getElementById('status');
const balanceDisplay = document.getElementById('ecoBalance');

// Ensure these are defined above or imported:
const contractAddress = "0x1829f248a78281c3D57ec05Bfb8a7a1D2169032f";
const contractABI = [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "_from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "_to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "owner",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

connectButton.onclick = async function () {
  if (typeof window.ethereum === 'undefined') {
    statusText.innerText = 'MetaMask is not installed!';
    alert('Please install MetaMask to use this app.');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const userAddress = accounts[0];
    statusText.innerText = 'Connected: ' + userAddress;
    console.log('Connected address:', userAddress);

    // ✅ Initialize provider and contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // ✅ Fetch token balance
    const rawBalance = await contract.balanceOf(userAddress);
    const decimals = 18; // Optional, if needed
    const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);


    // ✅ Save to localStorage
    localStorage.setItem('walletAddress', userAddress);

    // ✅ Redirect to dashboard
    window.location.href = 'dashboard.html';
    
  } catch (err) {
    if (err.code === 4001) {
      statusText.innerText = 'Connection request rejected by user.';
    } else {
      console.error(err);
      statusText.innerText = 'An error occurred: ' + err.message;
    }
  }
};









