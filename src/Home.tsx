import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import background from "../images/panda_home_page.jpg";

export default function Home() {
    document.title = "Home | Bloectasy";
    
    return (
      <>
        <main className='container'>
          <Navbar />
          <div className="container-text-box">
            <div className="container-img">
              <img className="container-img-rounded" src={background} alt="" />
            </div>
            <h3 className="container-h3 container-text-center">Welcome friends!</h3>
            <div className="container-text container-text-center">My name is David Acevski, I am a self taught developer and you have found my personal website.</div>
          </div>
          <Footer />
        </main>
      </>
    )
}