import React from 'react'

function EditUser() {
  return (
    <div>EditUser</div>
  )
}

export default EditUser


// function EditUser({userprop}) { 
//     const [file, setFile] = useState(null);
//     const [firstname, setFirstname] = useState("");
//     const [lastname, setLastname] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [status, setStatus] = useState("");
//     const [success, setSuccess] = useState(false);
//     const { user, dispatch } = useContext(Context);
//     const PF = "http://localhost:3000/homeserver/images/";
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log("e: " + JSON.stringify(e.data));
//       console.log("userprop.email: " + userprop.email);
//       console.log("userprop._id: " + userprop._id);
//       dispatch({ type: "UPDATE_START" });
//       const updatedUser = {
//         userId: user._id,
//         firstname,
//         lastname,
//         email,
//         password,
//         status,
//       };
//       if (file) {
//         const data = new FormData();
//         const filename = Date.now() + file.name; //create new file name using date (random)
//         data.append("name", filename);
//         data.append("file", file);
//         updatedUser.profilePic = filename;
//         try {
//           await axios.post("http://localhost:3000/homeserver/api/upload", data);
//         } catch (err) {
//           console.log("err: " + err);
//         }
//       }
//       try {
//         const res = await axios.put(
//           "http://localhost:3000/homeserver/api/users/" + userprop._id,
//           updatedUser
//         );
//         setSuccess(true);
//         dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
//       } catch (err) {
//         dispatch({ type: "UPDATE_FAILURE" });
//       }
//     };
//   return (
//     <div className="editUser">
//       <div className="editUser_title_div">
//         <span className="editUser_title">Edit User's Account</span>
//       </div>
//       <div className="editUser_div">
//         <form className="editUser_form" onSubmit={handleSubmit}>
//           <div className="editUser_pp">
//             <label htmlFor="file_input">
//               {file ? (
//                 <img
//                   className="editUser_pp_topImg"
//                   src={URL.createObjectURL(file)}
//                   alt=""
//                 />
//               ) : user.profilePic ? (
//                 <img
//                   className="editUser_pp_topImg"
//                   src={PF + user.profilePic}
//                   alt=""
//                 />
//               ) : (
//                 <img
//                   className="editUser_pp_topImg"
//                   src={require("../../assets/img/defaultProfilePic.jpg")}
//                   alt=""
//                 />
//               )}
//             </label>
//             <input
//               type="file"
//               id="file_input"
//               style={{ display: "none" }}
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>
//           <div className="editUser_input">
//             <table className="editUser_input_table">
//               <tr>
//                 <td>
//                   <label className="editUser_label">First Name</label>
//                   <input
//                     type="text"
//                     className="editUser_input"
//                     placeholder={userprop.firstname}
//                     required
//                     onChange={(e) => setFirstname(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <label className="editUser_label">Last Name</label>
//                   <input
//                     type="text"
//                     className="editUser_input"
                  
//                     required
//                     onChange={(e) => setLastname(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className="editUser_label">Email</label>
//                   <input
//                     type="email"
//                     className="editUser_input"
                   
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <label className="editUser_label">Password</label>
//                   <input
//                     type="password"
//                     className="editUser_input"
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className="editUser_label">Status</label>
//                   <div className="editUser_status_div">
//                     <input
//                       className="editUser_input_status"
//                       type="radio"
//                       name="status"
//                       value="active"
//                       required
//                       onChange={(e) => setStatus(e.target.value)}
//                     />
//                     <label className="editUser_label_status">Active</label>
//                     <input
//                       className="editUser_input_status"
//                       type="radio"
//                       name="status"
//                       value="inactive"
//                       onChange={(e) => setStatus(e.target.value)}
//                     />
//                     <label className="editUser_label_status">InActive</label>
//                   </div>
//                 </td>
//               </tr>
//             </table>
//             <div className="editUser_btn_div">
//               <button
//                 className="editUser_btn"
//                 id="editUser_btn_update"
//                 type="submit"
//               >
//                 Update
//               </button>
//               <Link className="link" to="/">
//                 <button
//                   className="editUser_btn"
//                   id="editUser_btn_cancel"
//                   type="submit"
//                 >
//                   Cancel
//                 </button>
//               </Link>
//             </div>
//             {success && (
//               <span className="editUser_msg">
//                 Account has been updated!
//                 <Link className="link" to="/admin/manageUser">
//                   <span className="editUser_msg_gohome"> go back</span>
//                 </Link>
//               </span>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditUser
