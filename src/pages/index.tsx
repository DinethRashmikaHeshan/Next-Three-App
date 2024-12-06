import Image from "next/image";
import localFont from "next/font/local";
import ThreeDModel from "@/pages/component/ThreeModel";
import {div} from "three/src/nodes/math/OperatorNode";
import {useState} from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const { data } = await login(formData);
            // localStorage.setItem('token', data.token);
            // if(getUserRole()=='user'){
            //     window.location.href = '/user';
            // }else{
            //     window.location.href = '/admin';
            // }

        } catch (error) {
            alert('Login failed');
        }
    };
  return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
          <div className="w-2/3 h-2/3 flex border rounded-lg shadow-lg overflow-hidden">
              <div className="w-1/2 h-2/3">
                  <ThreeDModel/>
              </div>
              <div className="w-1/2 flex items-center justify-center p-8">
                  <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-xl ">
                      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                      <input
                          type="email"
                          placeholder="Email"
                          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <input
                          type="password"
                          placeholder="Password"
                          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <button
                          type="submit"
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200">
                          Login
                      </button>

                      <div className="mt-4 text-center">
                          <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">Forgot
                              password?</a>
                      </div>
                      <div className="mt-2 text-center">
                          <p className="text-gray-600 text-sm">
                              Don’t have an account?{' '}
                              {/*<Link to={'/signup'}>*/}
                                  <a className="text-blue-500 hover:underline">
                                      Sign up
                                  </a>
                          {/*</Link>*/}
                          </p>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}
