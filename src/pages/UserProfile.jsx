import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            {user?.photoURL && (
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-blue-500 mb-6"
                src={user?.photoURL}
                alt="Profile"
              />
            )}
            
            {/* Welcome Message */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, <span className="text-blue-600">{user?.displayName || 'User'}</span>
            </h1>
            
            {/* User Email */}
            <p className="text-gray-600 mb-6">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            
            {/* Additional User Info */}
            <div className="w-full mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Account Created</p>
                  <p>{new Date(user?.metadata?.creationTime).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Last Login</p>
                  <p>{new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}