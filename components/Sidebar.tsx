import React from "react";
import { Button } from "./ui/button";
import { dummyData } from "@/app/data/dummyData"; // Import your dummy data

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

      {/* Generate buttons based on the dummyData */}
      {dummyData.map(
        (
          topic // for loop, which goes through dummy data
        ) => (
          <Button key={topic.topicId} className="w-full mb-2" variant="ghost">
            {topic.topicName}
          </Button>
        )
      )}
    </div>
  );
};
