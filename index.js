const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
  } = require("@solana/web3.js");
  
  // Generating a new wallet keypair
  const newPair = new Keypair();
  console.log(newPair);
  
  // Storing the public and private key(Each wallet has private & public key for transaction)
  const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
  const secretKey = newPair._keypair.secretKey;
  
  //Getting the wallet Balance
  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const myWallet = await Keypair.fromSecretKey(secretKey);
      const walletBalance = await connection.getBalance(
        new PublicKey(myWallet.publicKey)
      );
      console.log(`=> For wallet address ${publicKey}`);
      console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Air dropping SOL (since this is an empty wallet we airdrop some sol to it)
  const airDropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletKeyPair = await Keypair.fromSecretKey(secretKey);
      console.log(`-- Airdropping 2 SOL --`)
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey),
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Driver function for running the complete program we made
  const driverFunction = async () => {
      await getWalletBalance();
      await airDropSol();
      await getWalletBalance();
  }
  driverFunction();