// import { FC } from "react";
// import HomeNav from "../ui/navs/HomeNav";
// import bg from "../images/home-bg.png";
// import shapeBg from "../images/Shape.png";

// const Index: FC = () => {
//   return (
//     <>
//       <div
//         className={`h-screen overflow-hidden bg-blue-500 flex flex-col gap-40 justify-between  bg-cover bg-center`}
//       >
//         {/* Background Shape Layer */}
//         <div
//           className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
//           style={{ backgroundImage: `url(${shapeBg})` }}
//         ></div>

//         {/* Navigation at the top */}
//         <header className="z-10">
//           <HomeNav />
//         </header>

//         {/* Center content */}
//         <div className="flex flex-col gap-20">
//           <main className="flex-1 flex items-center justify-center text-center z-40 ">
//             <div className="flex flex-col gap-6 w-2/3">
//               <h1 className="text-white text-[45px] text-h1 leading-tight tracking-wide font-extrabold mb-5">
//                 Protect your business <br /> from fraud, effortlessly
//               </h1>
//               <p className="text-white text-4xl">
//                 The ultimate fraud management platform to safeguard your
//                 operations <br />
//                 and ensure compliance
//               </p>
//             </div>
//           </main>

//           {/* Background image at the bottom */}
//           <div className="items-center">
//             <div
//               className={`z-50 h-[500px]`}
//               style={{
//                 backgroundImage: `url(${bg})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;

import { FC } from "react";
import HomeNav from "../ui/navs/HomeNav";
import bg from "../images/home-bg.png";
import shapeBg from "../images/Shape.png";

const Index: FC = () => {
  return (
    <div className="relative h-screen bg-blue-500 flex flex-col justify-between">
      {/* Background Shape Layer */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${shapeBg})` }}
      ></div>

      {/* Navigation at the top */}
      <header className="relative z-10">
        <HomeNav />
      </header>

      {/* Center Content */}
      <div className="flex flex-col gap-20">
        <main className="flex-1 flex items-center justify-center text-center z-40 ">
          <div className="flex flex-col mt-[5%]  gap-6 w-2/3">
            <h1 className="text-white text-[45px] text-h1 leading-tight tracking-wide font-extrabold mb-5">
              Protect your business <br /> from fraud, effortlessly
            </h1>
            <p className="text-white text-4xl">
              The ultimate fraud management platform to safeguard your
              operations <br />
              and ensure compliance
            </p>
          </div>
        </main>
      </div>

      {/* Bottom Background Image */}
      <div className="relative items-center">
        <div
          className={`z-20 h-[500px] mt-[3%]`}
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Index;
