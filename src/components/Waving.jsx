import WaveOne from "../assets/wave-1.svg";
import WaveTwo from "../assets/wave-2.svg";

const Waving = () => {
  return (
    <div className="overflow-x-hidden my-10 relative">
      <img src={WaveOne} alt="WaveOne" className="wave-1 w-full absolute" />
      <img src={WaveTwo} alt="WaveTwo" className="wave-2 w-full" />
    </div>
  );
};

export default Waving;
