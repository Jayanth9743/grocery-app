import adfruit from '../assets/adfruit.png'
import adcart from '../assets/adcart.png'
import adveg from '../assets/adveg.png'

const BeforeFooter = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-8 mt-8 mb-8 lg:mt-12 lg:mb-12 lg:justify-around xl:mt-20 xl-mb-20">
      
        <div className='flex items-center justify-center rounded-lg w-72 h-44 bg-c1 '>
            <div className="flex flex-col items-start justify-center w-1/2">
                <p className='ml-3 text-lg font-medium'>40% off</p>
                <p className='ml-3 text-lg font-medium'>on fresh fruits</p>
            </div>
            <img src={adfruit} alt="" className='object-contain w-1/2 h-full' />
        </div>
        <div className='flex items-center justify-center rounded-lg w-72 h-44 bg-c3 '>
            <div className="flex flex-col items-start justify-center w-1/2">
                <p className='ml-3 text-lg font-medium'>healthy and fresh</p>
                <p className='ml-3 text-lg font-medium'>vegetables</p>
            </div>
            <img src={adveg} alt="" className='object-contain w-1/2 h-full' />
        </div>
        <div className='flex items-center justify-center rounded-lg w-72 h-44 bg-c2 '>
            <div className="flex flex-col items-start justify-center w-1/2">
                <p className='ml-3 text-lg font-medium'>groceries</p>
                <p className='ml-3 text-lg font-medium'>at your doorstep</p>
            </div>
            <img src={adcart} alt="" className='object-contain w-1/2 h-full' />
        </div>

    </div>
  )
}

export default BeforeFooter
