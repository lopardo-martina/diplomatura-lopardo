'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {

    const pathname = usePathname();
    const isActive = (path) => path === pathname;

    return (
        <nav className="navbar">
            <div className="container nav-content holder">
                <div className="logo">BAirWays</div>
                <ul className="nav-links" id="navLinks">
                    <li><a href="/" className={isActive("/") ? 'activo' : ''}>Inicio</a></li>
                    <li><a href="/destinos" className={isActive("/destinos") ? 'activo' : ''}>Destinos</a></li>
                
                    <li><a href="/tips" className={isActive("/tips") ? 'activo' : ''}>Tips</a></li>
                    <li><a href="/contacto" className={isActive("/contacto") ? 'activo' : ''}>Contacto</a></li>
                </ul>
            </div>
        </nav>
    )
}