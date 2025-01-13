"use client"
import Colors from '@/data/Colors';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext } from 'react'
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import SignInDialog from './SignInDialog';

function Hero() {
  const [userInput,setUserInput] = React.useState();
  const {messages,setMessages}=useContext(MessagesContext);
  const {userDetail,setUSerDetail}=useContext(UserDetailContext);
  const [openDialog,setOpenDialog]=React.useState(false);
  const onGenerate = (input)=>{
   if(!userDetail?.name)
   {
    setOpenDialog(true);
    return ;
   }
   setMessages({
     role:'user',
     content:input
   })
  }

  return (
    <div className='flex flex-col items-center mt-36 xl:mt-56 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
      <div className='p-5 border rounded-xl max-w-2xl w-full mt-3'
      style={{
        background:Colors.BACKGROUND
      }}>
        <div className='flex gap-2'>
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
          onChange={(event)=>setUserInput(event.target.value)}
          className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'/>
        {userInput&&  <ArrowRight 
        onClick={()=>onGenerate(userInput)}
        className='bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer' />}
        </div>
      <div>
        <Link className='h-5 w-5'/>
      </div>
      </div>
    <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
      {Lookup?.SUGGSTIONS.map((suggestion,index)=>(
        <h2 key={index}
        onClick={()=>onGenerate(suggestion)}
        className='p-1 px-2 border rounded-full text-sm text-gray-400 cursor-pointer'>{suggestion}</h2>
      ))}
    </div>
    <SignInDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(v)
    }/>
    </div>
    
  )
}

export default Hero