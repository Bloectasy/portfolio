import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

export default function About() {
    document.title = "About | Bloectasy";

    return (
        <>
            <main className='container'>
                <Navbar />
                    <div className="container-text-box">
                        <h1 className="container-h1">About Me</h1>
                        <div className="container-text">
                            Hi, I&apos;m David, a self-taught developer from Macedonia.
                        </div>
                        <div className="container-text">
                            I have a passion for programming and currently enjoy working with JavaScript/TypeScript and Rust.
                        </div>
                        <div className="container-text">
                            Outside of coding, I have a variety of interests and hobbies. I enjoy staying active, playing video games in my free time, and I&apos;m a car enthusiast who appreciates the beauty of automobiles.
                        </div>
                    </div>
                <Footer />
            </main>
        </>
    )
}