import { FC } from 'react'
import loader from "../../assets/loader.gif"

const CustomLoader: FC = () => {
  return (
    <>
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div className="w-20 h-20">
          <img src={loader} className="w-full h-full" alt='spinner' loading='lazy'/>
          </div>
        </div>
    </>
  )
}

export default CustomLoader