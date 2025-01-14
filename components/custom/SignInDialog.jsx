import React from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext'; // Ensure this import is correct
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Lookup from '@/data/Lookup';  
import { Button } from '../ui/button';

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = React.useContext(UserDetailContext); 

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogDescription>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
          <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
          <Button className='bg-blue-500 text-white w-44 hover:bg-blue-400 mt-2 mx-auto' onClick={googleLogin}>
            Sign In With Google
          </Button>
          <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
        </div>
      </DialogDescription>
    </Dialog>
  );
}

export default SignInDialog;