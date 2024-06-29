import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nome = localStorage.getItem("nome");
  const foto = localStorage.getItem("url_foto");
  const foto_default = "../../../public/bug.png";
  const dropdownRef = useRef(null);
  const {logout} = useAuth()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="max-h-10 flex flex-row cursor-pointer justify-center items-center gap-3"
      >
        <p className="text-lg font-bold text-white">Olá, {nome}</p>
        <img
          src={foto === "null" ? foto_default : foto}
          alt="foto_perfil"
          className="w-10 rounded-full"
        />
        <img
          src="../../../public/dropdown.png"
          alt="dropdown"
          className={`w-3 h-2 transition-transform duration-300 ${isDropdownOpen ? '-rotate-180' : ''}`}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <a
                href="/MeuPerfil"
                className="block px-4 py-2 text-gray-800 font-semibold flex flex-row justify-start gap-3 hover:bg-gray-200"
              >
                <img src="../../../public/editarPerfil.png" alt="" className='w-5'/>
                Meu perfil
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block px-4 py-2 text-gray-800 font-semibold flex flex-row justify-start gap-3 hover:bg-red-100"
                onClick={logout}
              >
                <img src="../../../public/logout.png" alt="" className='w-5'/>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
