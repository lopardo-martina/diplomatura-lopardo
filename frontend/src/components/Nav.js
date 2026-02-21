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
                    <li><Link href="/" className={isActive("/") ? 'activo' : ''}>Inicio</Link></li>
                    <li><Link href="/destinos" className={isActive("/destinos") ? 'activo' : ''}>Destinos</Link></li>
                    <li><Link href="/tips" className={isActive("/tips") ? 'activo' : ''}>Tips</Link></li>
                    <li><Link href="/contacto" className={isActive("/contacto") ? 'activo' : ''}>Contacto</Link></li>
                    <li><Link href="/admin" className={isActive("/admin") ? 'activo' : ''}><i className="fas fa-user"></i></Link></li>
                </ul>
            </div>
        </nav>
    )
}