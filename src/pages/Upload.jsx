import uploadIcon from "../assets/uoload-icon.svg";

const Upload = () => {
  return (
    <div className="container mx-auto px-3">
        <label htmlFor="uload" className="block border-dotted border-2 px-3 py-16 max-w-xl mx-auto text-center">
            <img src={uploadIcon} alt="Upload" className="w-16 mx-auto mb-10" />
            <p className="font-bold text-2xl">Drag and drop to upload file</p>
            <span className="block my-6 font-bold text-lg">or</span>
            <span className="bg-blue-light text-black font-medium px-8 py-3 cursor-pointer rounded-md shadow-lg shadow-blue/50">Browse File</span>
        </label>
        <input id="uload" className="hidden" type="file"></input>
    </div>
  );
};

export default Upload;
