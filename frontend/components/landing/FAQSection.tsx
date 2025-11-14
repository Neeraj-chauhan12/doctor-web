import { faqs, trustLogos } from '@/lib/contants'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'

const FAQSection = () => {

   const [openFAQ,setOpenFAQ]=useState<number | null>(0);

  return (
    <>
   <div className='w-screen min-h-screen bg-blue-50 pt-10 md:pt-0 px-5 md:px-20 pb-24'>

    <div className='flex justify-center items-center'>
      <h1 className='text-3xl font-bold'>Trusted by millions since 2010</h1>
    </div>

    
    <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center'>
      {
        trustLogos.map((items,id)=>(
          <div key={id} className='flex mt-10 items-center justify-center h-16 md:text-2xl'>
           {items}
          </div>
        ))
      }

    </div>


    {/* FAQ SECTION */}

    <div className='max-w-4xl mx-auto '>
      <h2 className=' text-3xl font-bold text-primary text-center pt-5 md:pt-0 mb-12'>
        Frequently asked question
      </h2>

       <div className='space-y-4 '>
      {
       faqs.map((item,index)=>(
        <Card key={index} className='bg-card border border-border'>
          <CardContent className='p-0'>
            <button
            className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors duration-200 '
            onClick={()=>setOpenFAQ(openFAQ==index?null:index)}
            >
            <span>{item.question}</span>
            <svg
            className={`w-5 h-5 text-muted-foreground  transform transition-transform duration-200  shrink-0 ${openFAQ===index ?"rotate-180":""} `}
            fill='none'
            stroke='current'
            >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m19  9l-7 7-7-7' />
            </svg>
            </button>
          {
            openFAQ===index &&(
              <div className='pb-4 px-4'>
                <p className='text-muted-foreground leading-relaxed'>
                  {item.answer}
                </p>

              </div>
            )
          }
          </CardContent>

        </Card>
       ))
      }
    </div>

    </div>

   
   

   </div>
      
    </>
  )
}

export default FAQSection
