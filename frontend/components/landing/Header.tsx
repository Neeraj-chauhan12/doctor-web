import React from "react";
import { Calendar } from "../ui/calendar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge, Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeadersProps {
  showDashbooardNav?: boolean;
}

interface NavigationItem {
  lable: string;
  icon: React.ComponentType<any>;
  href: string;
  active: boolean;
}
const Headers: React.FC<HeadersProps> = ({ showDashbooardNav }) => {
  const user = {
    type: "patient",
    profileImage:"fdsfs",
    name:"Neraj chauhan",
    email:"nc1676639@mail.com"
  };

  const isAuthentication=true;
  const pathname = usePathname();
  const getDashboardNavigation = (): NavigationItem[] => {
    // if (!user || !showDashbooardNav) return [];

    if (user.type === "patient") {
      return [
        {
          lable: "Appointments",
          icon: Calendar,
          href: "/patient/dashboard",
          active: pathname.includes("/patient/dashboard") || false,
        },
      ];
    } else if (user.type === "doctor") {
      return [
        {
          lable: "Dashboard",
          icon: Calendar,
          href: "/doctor/dashboard",
          active: pathname.includes("/doctor/dashboard") || false,
        },
        {
          lable: "Appointments",
          icon: Calendar,
          href: "/doctor/appointments",
          active: pathname.includes("/doctor/appointments") || false,
        },
      ];
    }
    return []
  };
  return <>
  <div className=" h-16 w-screen fixed top-0 border-b-2 border-gray-400 bg-white flex justify-between items-center md:px-10">
    <div>
       <div className="text-2xl font-bold text-blue-600">
          Medicare+
      </div>
    
    {/* appointments button */}
     {!isAuthentication && !showDashbooardNav && (
        <nav className="hidden items-center md:flex space-x-5">
          {getDashboardNavigation().map((item)=>(
              <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-1 transition-colors ${item.active}`}
              >
                <item.icon className="h-4 w-4 " />
                <span>{item.lable}</span>
              </Link>
          ))
          }

        </nav>
      )}

    </div>

  {/* if user is not authentication or new user */}
    <div className="flex ">
      {!isAuthentication && !showDashbooardNav ?(
        <div className="flex items-center space-x-4">
          <Button variant='ghost' size={'sm'} className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1  bg-red-600 w-5 h-5  rounded-full text-white right-1 text-sm">4</Badge>

          </Button>

        </div>

      )
      :(
       <>
        <Link href={'/login/patient'}>
        <Button variant={'ghost'} className="text-gray-500 hover:text-blue-700">
          Log in
        </Button>
        </Link>
         
         <Link href={'/signup/patient'}>
         <Button variant={'ghost'} className="bg-blue-600 font-medium text-white hover:bg-blue-800 rounded-3xl">
          Book Consultation
         </Button>
         </Link>
       </>
      )
    }

    {/* this is for the authenticate user  */}
     {
      !isAuthentication && !showDashbooardNav &&(
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} className="flex items-center space-x-2 px-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.profileImage} alt={user.name}></AvatarImage>
                  <AvatarFallback className="bg-blue-100 text-blue-500 text-sm font-semibold">
                        {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>

                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
          <div>
            <h1 className="text-2xl text-black "> {user.name}</h1>
            <h1 className="-mt-1 text-gray-600">{user?.type}</h1>
          </div>
        </div>
      )
     }


    
    </div>



  
   
   



  </div>
  </>;
};

export default Headers;

