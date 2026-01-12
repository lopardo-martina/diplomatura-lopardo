import Link from "next/link";

export default function Nav() {

    return (
        <nav>
            <ul className="nav-links" id="navLinks">
                <li><a href="/">Inicio</a></li>
                <li><a href="/destinos">Destinos</a></li>
                <li><a href="/buenos-aires">Buenos Aires</a></li>
                <li><a href="/tips">Tips</a></li>
                <li><a href="/contacto">Contacto</a></li>
            </ul>
        </nav>
    )
}