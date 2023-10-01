import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Setup() {
    document.title = "Title | Bloectasy";

    return(
        <>
            <main className="container">
                <Navbar />
                <div className="container-text-box">
                    <h1 className="container-h1">Setup</h1>
                    <div className="container-text">
                        Some of the tech I am using for coding and gaming.
                    </div>
                    <div className="container-blank"></div>
                    <h3 className="container-h3">Desktop</h3>
                    <ul className="container-list container-text">
                        <li>2x 24&quot; Benq Zowie XL2411P 144Hz monitors</li>
                        <li>Glorious Model O (gaming and productivity)</li>
                        <li>Keychron C1 mechanical keyboard with gateron blue switches (gaming and productivity)</li>
                        <li><a href="https://pcpartpicker.com/list/m9GPXk" target="_blank" rel="noreferrer">PC Parts</a></li>
                    </ul>
                    <div className="container-blank"></div>
                    <h3 className="container-h3">Coding</h3>
                    <ul className="container-list container-text">
                        <li>Editor: Visual Studio Code</li>
                        <li>Theme: Github Dark Default</li>
                        <li>Terminal: Bash and PowerShell</li>
                    </ul>
                    <div className="container-blank"></div>
                </div>
                <Footer />
            </main>
        </>
    )
}