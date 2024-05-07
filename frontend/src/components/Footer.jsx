const Footer = () => {
    return (
      <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2024 BookDex. All rights reserved.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  