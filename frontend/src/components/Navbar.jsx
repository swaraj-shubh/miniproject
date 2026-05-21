import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Heart } from "lucide-react";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");
        setIsAuthenticated(!!token);
        setRole(userRole);

        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAuthenticated(false);
        setRole(null);
        navigate("/");
    };

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return isActive ? "nav-link nav-link-active" : "nav-link";
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

                .navbar-shell {
                    position: fixed;
                    top: 16px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 40px);
                    max-width: 1100px;
                    z-index: 1000;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .navbar-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 20px;
                    border-radius: 100px;
                    background: rgba(8, 5, 2, 0.55);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 165, 90, 0.18);
                    box-shadow:
                        0 4px 24px rgba(0, 0, 0, 0.35),
                        0 1px 0 rgba(212, 165, 90, 0.08) inset,
                        0 0 0 1px rgba(255,255,255,0.03) inset;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .navbar-shell.scrolled .navbar-inner {
                    background: rgba(6, 4, 2, 0.82);
                    border-color: rgba(212, 165, 90, 0.28);
                    box-shadow:
                        0 8px 40px rgba(0, 0, 0, 0.5),
                        0 0 80px rgba(212, 165, 90, 0.04),
                        0 1px 0 rgba(212, 165, 90, 0.12) inset;
                    padding: 14px 28px;
                    margin: 4px 12px 12px 4px;
                    mar
                }

                /* Logo */
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .nav-logo-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(212,165,90,0.25), rgba(212,165,90,0.05));
                    border: 1px solid rgba(212,165,90,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s;
                }
                .nav-logo:hover .nav-logo-icon {
                    background: linear-gradient(135deg, rgba(212,165,90,0.4), rgba(212,165,90,0.1));
                    border-color: rgba(212,165,90,0.6);
                    box-shadow: 0 0 16px rgba(212,165,90,0.25);
                }
                .nav-logo-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.15rem;
                    font-weight: 600;
                    color: #f5ead6;
                    letter-spacing: 0.04em;
                    line-height: 1;
                }
                .nav-logo-text em {
                    font-style: italic;
                    color: #d4a55a;
                }

                /* Nav links */
                .nav-links-list {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    display: block;
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 400;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(245, 234, 214, 0.55);
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    white-space: nowrap;
                    border: 1px solid transparent;
                }
                .nav-link:hover {
                    color: #f5ead6;
                    background: rgba(212, 165, 90, 0.08);
                    border-color: rgba(212, 165, 90, 0.12);
                }
                .nav-link-active {
                    color: #d4a55a !important;
                    background: rgba(212, 165, 90, 0.1);
                    border-color: rgba(212, 165, 90, 0.22);
                }

                /* Auth button */
                .btn-logout {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 500;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #0a0804;
                    background: linear-gradient(135deg, #d4a55a, #c08a3a);
                    border: none;
                    padding: 7px 18px;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 2px 12px rgba(212,165,90,0.25);
                    white-space: nowrap;
                }
                .btn-logout:hover {
                    background: linear-gradient(135deg, #e8bb6e, #d4a55a);
                    box-shadow: 0 4px 20px rgba(212,165,90,0.4);
                    transform: translateY(-1px);
                }

                .btn-login {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 400;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #d4a55a;
                    background: rgba(212,165,90,0.08);
                    border: 1px solid rgba(212,165,90,0.25);
                    padding: 7px 18px;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.35s;
                    text-decoration: none;
                    display: inline-block;
                    white-space: nowrap;
                }
                .btn-login:hover {
                    background: rgba(212,165,90,0.15);
                    border-color: rgba(212,165,90,0.45);
                    color: #f5ead6;
                }

                /* Mobile */
                .mobile-toggle {
                    display: none;
                    background: none;
                    border: 1px solid rgba(212,165,90,0.2);
                    color: #d4a55a;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .mobile-toggle:hover {
                    background: rgba(212,165,90,0.1);
                    border-color: rgba(212,165,90,0.4);
                }

                .mobile-drawer {
                    position: absolute;
                    top: calc(100% + 10px);
                    left: 0;
                    right: 0;
                    background: rgba(6, 4, 2, 0.92);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212,165,90,0.18);
                    border-radius: 24px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
                    animation: drawerIn 0.3s cubic-bezier(0.16,1,0.3,1);
                }
                @keyframes drawerIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .mobile-link {
                    display: block;
                    padding: 10px 16px;
                    border-radius: 100px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 400;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(245,234,214,0.6);
                    text-decoration: none;
                    transition: all 0.3s;
                    border: 1px solid transparent;
                }
                .mobile-link:hover, .mobile-link-active {
                    color: #d4a55a;
                    background: rgba(212,165,90,0.08);
                    border-color: rgba(212,165,90,0.15);
                }
                .mobile-divider {
                    height: 1px;
                    background: rgba(212,165,90,0.1);
                    margin: 6px 0;
                }

                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: flex; }
                    .navbar-inner { padding: 8px 14px; border-radius: 100px; }
                }
                @media (min-width: 769px) {
                    .mobile-drawer { display: none !important; }
                }
            `}</style>

            <header className={`navbar-shell ${isScrolled ? "scrolled" : ""}`}>
                <div className="navbar-inner">
                    <Link to="/" className="nav-logo">
                        <div className="nav-logo-icon">
                            <Heart size={14} color="#d4a55a" fill="rgba(212,165,90,0.4)" />
                        </div>
                        <span className="nav-logo-text">Second <em>Serve</em></span>
                    </Link>

                    <NavigationMenu className="desktop-nav">
                        <NavigationMenuList className="nav-links-list">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/" className={getLinkClass("/")}>Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/ngoDashboard" className={getLinkClass("/ngoDashboard")}>Find Food</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/map" className={getLinkClass("/map")}>Map</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {(role === "donor" || role === "admin") && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/restaurantDashboard" className={getLinkClass("/restaurantDashboard")}>Donate</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {role === "admin" && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link to="/admin" className={getLinkClass("/admin")}>Admin</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                            <NavigationMenuItem style={{ marginLeft: "6px" }}>
                                {isAuthenticated ? (
                                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <Link to="/auth" className="btn-login">Login</Link>
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="mobile-drawer">
                        <Link to="/" className={`mobile-link ${location.pathname === "/" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/ngoDashboard" className={`mobile-link ${location.pathname === "/ngoDashboard" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Find Food</Link>
                        <Link to="/map" className={`mobile-link ${location.pathname === "/map" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Map</Link>
                        {(role === "donor" || role === "admin") && (
                            <Link to="/restaurantDashboard" className={`mobile-link ${location.pathname === "/restaurantDashboard" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
                        )}
                        <Link to="/profile" className={`mobile-link ${location.pathname === "/profile" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                        {role === "admin" && (
                            <Link to="/admin" className={`mobile-link ${location.pathname === "/admin" ? "mobile-link-active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
                        )}
                        <div className="mobile-divider" />
                        {isAuthenticated ? (
                            <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="btn-logout" style={{ borderRadius: "100px", padding: "10px 16px", width: "100%" }}>
                                Logout
                            </button>
                        ) : (
                            <Link to="/auth" className="btn-login" style={{ textAlign: "center" }} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                        )}
                    </div>
                )}
            </header>
        </>
    );
}

export default Navbar;