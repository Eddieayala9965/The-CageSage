import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ email, name, bio }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FASTAPI_URL}/update/profile/${user_id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      toggleModal();
      navigate("/user");
    } catch (error) {
      setError("Failed to update profile. Please try again later.");
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-lg rounded-lg p-2 hover:bg-blue-700 text-white font-bold"
      >
        Update Profile
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute right-0 top-0 m-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6.793 7.5L4.146 4.854l.708-.708L7.5 6.793l2.646-2.647l.708.708L8.207 7.5l2.647 2.646l-.708.707L7.5 8.208l-2.646 2.646l-.708-.707z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center pb-3 border-b text-black">
              <h3 className="text-xl font-bold flex-1">Update Profile</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
              ></svg>
            </div>
            <form onSubmit={handleSubmit} className="my-6 flex flex-col">
              <label className="font-semibold mb-2">Email:</label>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className="p-2 mb-2 border rounded border-gray-300"
              />
              <label className="font-semibold mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="p-2 mb-2 border rounded border-gray-300"
              />
              <label className="font-semibold mb-2">Bio:</label>
              <textarea
                value={bio}
                onChange={handleBioChange}
                className="p-2 mb-2 border rounded border-gray-300"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfileForm;
