import { testimonials } from '@/lib/contants'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter } from '../ui/card'

const TestimonialSection = () => {

  const star=[0,0,0,0,0];
  return (
    <>
    <div className='min-h-screen md:h-screen container max-w-screen px-5 md:px-32 md:pt-24 bg-blue-50'>
      <div className='flex  md:justify-center md:items-center flex-col'>
        <h1 className='text-2xl text-center md:text-3xl mb-2 font-bold'>Our patients love us</h1>
        
        <div className='flex gap-1 text-center md:ml-0 ml-10 md:gap-3'>
          <h1>4.8</h1>
          <div className='flex text-yellow-400'>
             {
              star.map((id)=>(
                 <svg key={id}  className="w-6 h-6 fill-current " viewBox="0 0 24 24">
                <path  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
             </svg>
              ))
             }
           
          </div>
          <h1>72k+ reviews</h1>
        </div>

      </div>

      {/* testimonial grid */}

      <div className='grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
          testimonials.map((testimonial,index)=>(
            <Card key={index} className={`${testimonial.bgColor} border hover:backdrop-blur-2xl `}>
              <CardContent className='px-5'>
                <div className='flex text-amber-300'>
                  {
                    [...Array(testimonial.rating)].map((_ ,i)=>(
                        <svg key={i} className="w-6 h-6 fill-current " viewBox="0 0 24 24">
                        <path  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                       </svg>
                    ))
                  }

                </div>
              </CardContent>

              <CardDescription className='px-5 text-md text-black'>
                {testimonial.text}
              </CardDescription>

              <CardFooter className='flex flex-col  items-start justify-start text-justify'>
                <h1>{testimonial.author}</h1>
                <h1>{testimonial.location}</h1>
                
              </CardFooter>
            </Card>

          ))
        }

      </div>

      <div className='flex justify-center items-center'>
      <button className='text-blue-500 text-2xl font-bold mt-10'>See more</button>
      </div>

    </div>
      
    </>
  )
}

export default TestimonialSection
