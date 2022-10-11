import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const LoadingModal = () => {
  const modal = useSelector((state) => state.modalReducer);
  if (!modal) return <></>;

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-[rgba(255,255,255,0.8)] z-[55] flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default LoadingModal;
