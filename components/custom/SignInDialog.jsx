import React, { useContext } from 'react';
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
import uuid4 from 'uuid4';

function SignInDialog({ openDialog, closeDialog }) {
const { userDetail, setUserDetail } = useContext(UserDetailContext); 
const CreateUser=useMutation(ApiError.user.CreateUser);
const { signIn } = useGoogleLogin({
       clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY,
        onSuccess: async (tokenResponse) => {
            console.log("Login Success: ", tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user=userInfo.data;
            await CreateUser({
                name:user?.name,
                email:user?.email,
                picture:user?.picture,
                uid:uuid4()
            })
             
            

            setUserDetail(userInfo?.data);
            closeDialog(false);
        },
        onError: errorResponse => {
            console.log("Login Failed: ", errorResponse);
            closeDialog(false);
        },
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
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