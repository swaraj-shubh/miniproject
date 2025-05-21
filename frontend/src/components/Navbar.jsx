import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";

function Navbar() {
    const location = useLocation();
    const getLinkClass = (path) =>
        `px-4 py-2 rounded-md transition-colors hover:bg-[#c0392b]  text-gray-1000 hover:shadow-2xl shadow-black hover:text-black hover:font-medium transition-transform duration-1000 hover:scale-105 ${
           location.pathname === path ? "text-black font-bold" : ""
          }`;
    
    return(
        <header className="bg-[#E74C3C] rounded-b-sm text-white shadow-2xl w-full">
            <div className="container flex items-center justify-between p-4 mx-auto">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-4">

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/" className={getLinkClass("/")}>Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/ngoDashboard" className={getLinkClass("/ngoDashboard")}> Find Food</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link to="/restaurantDashboard" className={getLinkClass("/restaurantDashboard")}>Donate</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="ml-auto">
                            <NavigationMenuLink asChild>
                                <Link to="/auth" className={getLinkClass("/auth")}>Login/Register</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
};

export default Navbar;