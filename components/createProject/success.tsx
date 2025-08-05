import React, { useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/success.json";
import { useRouter } from "next/navigation";
import SuccessCard from "../success";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SuccessScreen = ({ data }: any) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Change this to the number of milliseconds you want to wait

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  return (
   <SuccessCard />
  );
};

export default SuccessScreen;