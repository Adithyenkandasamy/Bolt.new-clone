import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'react-query'; // Import useMutation
import uuid4 from 'uuid4';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Import your dialog components
import Lookup from '@/data/Lookup'; // Import your lookup data
import { api } from '@/convex/_generated/api';
import { Button } from '../ui/button';

function SignInDialog({ openDialog, closeDialog }) {
    const { userDetail, setUserDetail } = useContext(UserDetailContext); 
    const CreateUser = useMutation(api.users.CreateUser); 

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY,
        onSuccess: async (tokenResponse) => {
            try {
            console.log("Login Success: ", tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse.credential } },
            );

            console.log(userInfo);
            const user = userInfo.data;
            await CreateUser.mutateAsync({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuid4() // Generate a unique ID
            });

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
            }

            setUserDetail(userInfo?.data);
            closeDialog(false);
            } catch (error) {
                console.error("Error during sign-in process: ", error);
            }
        },
        onFailure: (error) => {
            console.error("Login Failed: ", error);
            console.log("Error details: ", JSON.stringify(error, null, 2));
        }
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
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
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;