import { useState } from "react";
import InputField from "./components/input-field";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:5000/convert?id=${inputValue}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.text();
      console.log(jsonData);
      setData(jsonData);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-full min-h-screen relative p-3 ">
      <div className=" h-20 w-full shadow-md shadow-gray-300 fixed top-0 left-0 justify-between items-center px-6 flex ">
        <img src="/tech-one.png" alt="" className=" bg-gray-500 h-16" />

        <div className=" hidden md:block ">
          <p className=" font-semibold text-2xl ">
            Thuvarakan <br /> Selvasothy
          </p>
        </div>
      </div>
      <div className=" pt-20 w-full ">
        <div className=" mt-6 flex flex-col items-center justify-center w-full text-center ">
          <h2 className=" text-3xl font-semibold ">Pre interview Assessment</h2>
          <h2 className=" text-xl font-semibold mt-4 ">
            Convert numerical input into words
          </h2>
        </div>
        <div className=" w-full justify-center items-center flex flex-col ">
          <div className=" max-w-sm ">
            <p></p>
            <div className="mt-6 flex  w-full gap-4 md:flex-row flex-col  ">
              <InputField
                placeholder="Enter the amount"
                min={0}
                max={1000000000000000}
                onChange={setInputValue}
              />
              <button
                className=" px-4 py-2 bg-yellow-400 rounded-md  font-medium  "
                onClick={fetchData}
              >
                Convert
              </button>
            </div>
            <div className=" mt-6 border border-gray-300 rounded-md w-full min-h-[112px] p-2 font-medium  ">
              <p className=" text-lg text-gray-800 ">{data}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden block absolute bottom-10 right-5 ">
        <p className=" font-semibold text-2xl ">Thuvarakan Selvasothy</p>
      </div>
    </div>
  );
}
