import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";



export function UserTable({ users, fetchUsers, adminId }) {

    

    const deleteUserHandler = async (id) => {
      if (!id) {
        toast.error("User id is required");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/auth/users/${id}`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          toast.success("User deleted successfully!");
          fetchUsers();
        } else {
          toast.error(data.message || "Failed to delete user!");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Error submitting user delete:", error);
      }
    };
  
    return (
      <div className="overflow-x-auto">
        <table className=" w-full mx-auto border shadow-md border-gray-100 my-6">
          <thead>
            <tr className="bg-[#666666] text-white">
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Name
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Email
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Role
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300 border-b"
              >
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {user?.name}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {user?.email}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {user?.role}
                </td>
  
                <td className="px-2 py-2 text-center h-full">
                  <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                    <div
                      onClick={() => deleteUserHandler(user?._id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdDeleteOutline />
                    </div>
                    <Link
                      href={`/admin-panel/${adminId}/users/edit-user/${
                        user?._id || "0"
                      }`}
                      className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                    >
                      <CiEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }