const Processing = () => {
  return (
    <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-5">Processing...</h1>
        <p className="text-3xl font-light mb-10">This may take a few minutes.</p>
      
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.3} stroke="currentColor" className="w-28 h-28 text-blue animate-spin mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    </div>
  );
};

export default Processing;
