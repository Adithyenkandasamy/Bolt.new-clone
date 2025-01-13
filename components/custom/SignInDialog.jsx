import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'  

function SignInDialog({openDialog,closeDialog}) {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog }>
  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription className="flex flex-col item-center justify-center">
        <div>
        <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
        </div>
        </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default SignInDialog