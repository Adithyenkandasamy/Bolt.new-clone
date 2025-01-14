import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-use-googlelogin';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'react-query'; // Import useMutation
import uuid4 from 'uuid4';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Import your dialog components
import Lookup from '@/data/Lookup'; // Import your lookup data
import { api } from '@/convex/_generated/api';

function SignInDialog({ openDialog, closeDialog }) {
    const { userDetail, setUserDetail } = useContext(UserDetailContext); 
    const CreateUser = useMutation(api.users.CreateUser); 

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY,
        onSuccess: async (tokenResponse) => {
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
        },
        onFailure: (error) => {
            console.error("Login Failed: ", error);
        }
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <h2 className='font-bold text-2xl text-center text-white'>{Lookup.SIGNIN_HEADING}</h2>
                        <button onClick={signIn}>Sign in with Google</button>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;