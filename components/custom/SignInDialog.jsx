import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Lookup from '@/data/Lookup';  
import { Button } from '../ui/button';
import { useGoogleLogin } from 'react-use-googlelogin';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';

function SignInDialog({ openDialog, closeDialog }) {
    const { userDetail, setUserDetail } = React.useContext(UserDetailContext); 

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY,
        onSuccess: async (tokenResponse) => {
            console.log("Login Success: ", tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            setUserDetail(userInfo?.data);
            closeDialog(false);
        },
        onError: errorResponse => console.log("Login Failed: ", errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button className='bg-blue-500 text-white w-44 hover:bg-blue-400 mt-2 mx-auto' onClick={signIn}>
                                Sign In With Google
                            </Button>
                            <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;