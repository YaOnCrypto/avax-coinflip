import type { NextPage } from 'next';
import Image from 'next/image';

import { CoinFlip } from '../components/CoinFlip';

import { Header } from '../components/Header';
import { Symfoni } from '../hardhat/SymfoniContext';

const Home: NextPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true} >
             <Header/>
          <CoinFlip></CoinFlip>
        </Symfoni>
      </header>
    </div>
  )
}

export default Home
