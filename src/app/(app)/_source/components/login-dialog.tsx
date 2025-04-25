import { loginWithKakao } from '@/app/(app)/_source/actions/auth';
import { Button } from '@/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';

const LoginDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm'>로그인</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>로그인</DialogTitle>
				</DialogHeader>
				<form>
					<Button formAction={loginWithKakao} variant='outline' className='w-full' size='lg'>
						카카오 로그인
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default LoginDialog;
