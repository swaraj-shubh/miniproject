import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token"); // or sessionStorage
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    const getLinkClass = (path) => {
        return `px-4 py-2 rounded-md transition-colors hover:bg-[#c0392b] text-gray-1000 hover:shadow-2xl shadow-black hover:text-black hover:font-medium transition-transform duration-1000 hover:scale-105 ${
            location.pathname === path ? "text-black font-bold" : ""
        }`;
    };
    

    return (
        <header className="bg-[#E74C3C] rounded-b-sm rounded-t-sm mt-2 text-white shadow-2xl w-full">
            <div className="container flex items-center justify-between p-4 mx-auto">
                <NavigationMenu className="w-full">
                    <NavigationMenuList className="flex gap-4 w-full items-center">
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
                                <Link to="/restaurantDashboard" className={getLinkClass("/restaurantDashboard")}>Donate</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                        {/* Right side ke items yaha se start h */}
                        <div className="ml-auto flex items-center gap-4">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>


                            <NavigationMenuItem className="">

                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 ml-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <Link to="/auth" className={getLinkClass("/auth")}>Login</Link>
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        </div>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}

export default Navbar;