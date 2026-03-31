"use client";
import React, {useState} from "react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setshowAuthModal] = useState(false);

  if(user){
    return (
        <div className="authButton m-6" action={()=>{signOut}}>
        <Button
          onClick={() => setshowAuthModal(true)}
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <LogIn className="w-5 h-5" />
          SignOut 
        </Button>
        </div>
    )
  }

  return (
    <>
      <div className="authButton m-6">
        <Button
          onClick={() => setshowAuthModal(true)}
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <LogIn className="w-5 h-5" />
          SignIn
        </Button>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setshowAuthModal(false)}
        />
      </div>
    </>
  );
};

export default AuthButton;
