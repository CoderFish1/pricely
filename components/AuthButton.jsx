"use client";
import React, {useState} from "react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { AuthModal } from "./AuthModal";

const AuthButton = ({ user }) => {
  const [showAuthModal, setshowAuthModal] = useState(false);

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
          isclose={() => setshowAuthModal(false)}
        />
      </div>
    </>
  );
};

export default AuthButton;
