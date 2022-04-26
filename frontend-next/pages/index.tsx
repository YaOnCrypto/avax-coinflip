import type { NextPage } from 'next';
import Image from 'next/image';

import { CoinFlip } from '../components/CoinFlip';
import { Symfoni } from '../hardhat/SymfoniContext';

const Home: NextPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >
        {/* <Nav
             Main */}
          <CoinFlip></CoinFlip>
        </Symfoni>
      </header>
    </div>
  )
}

export default Home
