import "./Projects.css";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import ProjectList from "../components/ProjectList.tsx";

export default function Projects() {
    document.title = "Projects | Bloectasy";
    const projects = [
        {
          title: "Valeriyya",
          description: "Valeriyya is an advanced and feature-rich bot crafted to elevate your Discord experience.",
          category: ["API", "Discord", "Rust"],
          url: "https://github.com/Bloectasy/Valeriyya",
        },
        {
          title: "Personal Website",
          description: "Developed a personal website as a digital portfolio which is offering a glimpse into my achievements and interests. It's a space where i share my work and experience with the world.",
          category: ["Web Development", "React", "Vite", "Node", "Typescript"],
          url: "https://github.com/Bloectasy/Personal_Website",
        },
      ];

    return (
        <>
            <main className='container'>
                <Navbar />
                    <div className="container-text-box">
                        <h1 className="container-h1">Projects</h1>
                        <ProjectList projects={projects}/>
                    </div>
                <Footer />
            </main>
        </>
    )
}