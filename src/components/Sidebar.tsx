import { IconProps } from "@radix-ui/react-icons/dist/types";
import Logo from "@/components/Logo";
import SidebarItems from "./SidebarItems";
import SidebarUser from "./SidebarUser";


const Sidebar = () => {
 
  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <Logo/>
          <SidebarItems />
        </div>
        <SidebarUser/>
      </div>
    </aside>
  );
};

export default Sidebar;
