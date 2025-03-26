
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 w-full border-t bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VIT CGPA Calculator. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span> 
            <Heart className="h-4 w-4 text-red-500 inline" fill="currentColor" /> 
            <span>for VIT students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
