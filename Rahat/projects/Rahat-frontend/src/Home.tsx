import connectWallet from './connectWallet';

function Home() {
  return <div>{connectWallet()};</div>;
}

export default Home;
