import { dummyData } from "@/app/data/dummyData";
import React from "react";
import { Button } from "./ui/button";

// Add the Poppins class as a prop
type SidebarProps = {
  poppinsClass: string;
};

export const Sidebar = ({ poppinsClass }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-[#262626] text-white flex flex-col items-start p-4 shadow-md">
      {/* Logo at the top */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="/logonet.png" // Path to the logo in the public folder
          alt="Net Lessons Logo"
          className="w-auto h-auto" // Adjust size and spacing
        />
      </div>

      {/* Display all topics with hover effect */}
      {/* {dummyData.map((topic) => (
        <div
          key={topic.topicId}
          className="pl-4 hover:bg-[#808080] transition-colors duration-300" // Hover effect with transition
        >
          <h3 className={`${poppinsClass} text-md font-medium`}>
            {topic.topicName}
          </h3>
        </div>
      ))} */}
      <Button className="w-full" variant="ghost">
        Button
      </Button>
    </div>
  );
};
