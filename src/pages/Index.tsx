// import { FC } from "react";
// import HomeNav from "../ui/HomeNav";
// import bg from "../assets/home-bg.png";

// const Index: FC = () => {
//   return (
//     <>
//       <div className=" flex items-center justify-center min-h-screen bg-blue-500">
//         <div
//           className={`absolute inset-0 bg-cover bg-center bg-[url("src/assets/Shape.png")]`}
//         ></div>
//       </div>

//       <div>
//         <HomeNav />
//       </div>
//       <div className="z-50 flex flex-col justify-between items">
//         <div className=" flex flex-col gap-6 text-center justify-center mx-auto w-2/3">
//           <h1 className="text-h1 text-white text-[50px] text-center font-extrabold">
//             Protect your business <br /> from fraud, effortlessly
//           </h1>

//           <p className="text-white text-4xl">
//             The ultimate fraud management platform to safeguard your operations{" "}
//             <br />
//             and ensure compliance
//           </p>
//         </div>

//         <div
//           className={`absolute h-full w-full bottom-0 left-0`}
//           style={{
//             backgroundImage: `url(${bg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Index;

import { FC } from "react";
import HomeNav from "../ui/HomeNav";
import bg from "../images/home-bg.png";

const Index: FC = () => {
  return (
    <div
      className={`h-screen overflow-hidden bg-blue-500 flex flex-col gap-40 justify-between bg-[url("src/assets/Shape.png")] bg-cover bg-center`}
    >
      {/* Navigation at the top */}
      <header className="z-50">
        <HomeNav />
      </header>

      {/* Center content */}
      <div className="flex flex-col gap-20 mt-20">
        <main className="flex-1 flex items-center justify-center text-center z-40 ">
          <div className="flex flex-col gap-6 w-2/3">
            <h1 className="text-white text-[40px] text-h1 leading-tight tracking-wide font-extrabold mb-5">
              Protect your business <br /> from fraud, effortlessly
            </h1>
            <p className="text-white text-4xl">
              The ultimate fraud management platform to safeguard your
              operations <br />
              and ensure compliance
            </p>
          </div>
        </main>

        {/* Background image at the bottom */}
        <div className="items-center  ">
          <div
            className={` h-[500px] mt-12`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
