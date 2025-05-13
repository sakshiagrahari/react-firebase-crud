import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const usersCollection = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersCollection);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      const userDoc = doc(db, "users", editingUser.id);
      await updateDoc(userDoc, { name, age });
      setEditingUser(null);
    } else {
      await addDoc(usersCollection, { name, age });
    }
    setName("");
    setAge("");
    getUsers();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    getUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setAge(user.age);
  };

  

  return (
    <div className="max-w-md mx-auto p-6 m-10 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">CRUD</h2>
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button 
        type="submit" 
        className={`w-full py-2 px-4 rounded text-white font-medium ${editingUser ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {editingUser ? "Update" : "Add"}
      </button>
    </form>
  
    <ul className="space-y-3">
      {users.map((user) => (
        <li 
          key={user.id} 
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
        >
          <span className="text-gray-700">
            {user.name} - {user.age}
          </span>
          <div className="space-x-2">
            <button 
              onClick={() => handleEdit(user)}
              className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(user.id)}
              className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App;
