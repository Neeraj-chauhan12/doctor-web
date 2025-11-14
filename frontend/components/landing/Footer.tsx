import { contactInfo, footerSections, socials } from '@/lib/contants'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Icon } from 'lucide-react'





const Footer = () => {
  return (
    <>
  <div className='min-h-screen md:h-screen w-screen pt-5 md:pt-24 px-5 md:px-24 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] text-white'>

    <div className='flex md:flex-row flex-col  justify-between   items-start'>
       <div className=" w-full md:w-[27vw] text-white">
        <h1 className='text-2 md:text-3xl font-bold'>Medicare+</h1>

        <h2 className='text-gray-300'>Your trusted healthcare partner providing quality mdical consultations with certified doctors online , anytime, anywhere</h2>
          
          <div className='mt-7'>
            {
              contactInfo.map((item,id)=>(
                <div className='flex gap-3' key={id}>
                  <item.icon className='h-5 w-5 test-white' />
                  <h1>{item.text}</h1>

                </div>

              ))
            }
          </div>
      </div>

      {/* company */}
      <div className='flex md:grid-cols-4 grid-cols-2 items-start mt-12 md:mt-0 flex-wrap gap-10 md:gap-24'>
        {
          footerSections.map((item,id)=>(
            <div key={id} className=''>
              <div>
                <h1 className='text-2xl font-bold mb-4'>{item.title}</h1>
                {item.links.map((data,i)=>(
                  <div  key={i} className='gap-2'>
                    <Link href={data.href}>{data.text}</Link>

                  </div>

                ))}
              </div>

            </div>
          ))
        }
       


      </div>

    

   
   

    </div>


   <div className='md:mt-32 mt-10 flex flex-col md:flex-row gap-5 py-3 px-2 md:justify-between items-center border  border-blue-950 md:px-5 md:py-6'>
    <div>
     <h1 className='text-2xl font-bold'>Stay Updated</h1>
     <h2 className='text-gray-400 text-sm '>Get health tips and products delivery to you inbox</h2>
    </div>

    <div className='flex gap-2'>
    <Input type="email" placeholder="Email" />
    <button className='px-5 py-2 bg-blue-800 rounded hover:bg-blue-900 text-white'>Subscribe</button>
    </div>

    </div>

    <div className='mt-5 flex md:gap-0 gap-5 md:mb-0 mb-10 flex-col md:flex-row md:justify-between items-center border  border-blue-950 md:px-5 md:py-6'>
    <div>
     <h2 className='text-gray-400'>@2025 Medicare+, Inc.All rights reserved</h2>
    </div>

    <div className='flex gap-2'>
      <h1>Follow us:</h1>
      {
        socials.map((item,id)=>(
          <a key={id}
          href={item.url}
          target='_blank'
          className='w-8 flex justify-center items-center h-8 bg-blue-700/50 hover:bg-blue-600'
          >
           <item.icon className='h-6 w-6' />

          </a>
        ))
      }
   </div>

    </div>


     

  </div>


 
 

   

  
      
    </>
  )
}

export default Footer
