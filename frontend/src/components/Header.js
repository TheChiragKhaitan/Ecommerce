import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menudisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  // console.log("user header", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message);
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-20">
      <div className="container mx-auto h-full flex items-center px-4 justify-between">
        {/* Logo */}
        <div className="">
          <Link to={"/"}>
            <img src={logo} width={90} height={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow hover:shadow">
          <input
            type="text"
            placeholder="Search for Products here..."
            className="w-full outline-none "
            onChange={handleSearch} 
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center text-white justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center justify-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.ProfilePic ? (
                  <img
                    src={user?.ProfilePic}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full "
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}
            {menudisplay && user?.role === ROLE.ADMIN && (
              <div className="absolute bg-white hidden md:block bottom-0 top-11 p-2 h-fit shadow-lg rounded ">
                <nav className="hover:scale-110 hover:font-semibold transition-all duration-200">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap  p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-sm ">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
