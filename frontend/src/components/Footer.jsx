const Footer = () => {
  return (
    <footer className="bg-black-950 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-lg font-bold">
            HackCast<span className="text-cyan-400">.</span>
          </div>

          <div className="flex space-x-6">Made by Vangmay</div>

          <div className="text-sm text-gray-400">
            © 2024 HackCast. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
