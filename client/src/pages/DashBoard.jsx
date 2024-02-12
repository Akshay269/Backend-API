import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const DashBoard = () => 
{
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("images", selectedImage);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const { status } = true;
      return status
        ? toast(`Hello`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/dashboard")); //If the server response indicates failure, remove the token cookie, and redirect the user to the login page.
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome
        </h4>
        <div>
          <form onSubmit={handleImageUpload} enctype="multipart/form-data">
            <input type="file" name="images" onChange={handleImageChange}/>
            <button type="submit" >Upload</button>
          </form>
        </div>

        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default DashBoard;
