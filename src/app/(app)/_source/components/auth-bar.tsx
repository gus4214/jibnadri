import { PopoverTrigger } from '@radix-ui/react-popover';
import { LogOut } from 'lucide-react';

import { logout } from '@/app/(app)/_source/actions/auth';
import LoginDialog from '@/app/(app)/_source/components/login-dialog';
import { Avatar, AvatarImage } from '@/components/avatar';
import { Button } from '@/components/button';
import { Popover, PopoverContent } from '@/components/popover';
import { Separator } from '@/components/separator';
import { createServer } from '@/lib/supabase/server';

const AuthBar = async () => {
	const supabase = createServer();

	const {
		data: { user },
	} = await (await supabase).auth.getUser();

	const userAvatarUrl = user?.user_metadata.avatar_url;
	const userName = user?.user_metadata.user_name;
	const userEmail = user?.user_metadata.email;

	return (
		<>
			{user ? (
				<Popover>
					<PopoverTrigger asChild>
						<Avatar className='cursor-pointer'>
							<AvatarImage src={userAvatarUrl} alt={`profile picture for ${userName}`} />
						</Avatar>
					</PopoverTrigger>
					<PopoverContent align='end' className='p-6'>
						<div className='flex items-center space-x-4 justify-center'>
							<Avatar className='size-12'>
								<AvatarImage src={userAvatarUrl} alt={`profile picture for ${userName}`} />
							</Avatar>
							<div>
								<h4 className='font-bold'>{`${userName}님 안녕하세요 👋`}</h4>
								<p className='text-xs text-muted-foreground'>{userEmail}</p>
							</div>
						</div>
						<Separator className='my-5' />
						<form action={logout}>
							<Button variant='ghost' size='sm' className='w-full cursor-pointer focus-visible:ring-0'>
								<LogOut className='size-3.5' /> 로그아웃
							</Button>
						</form>
					</PopoverContent>
				</Popover>
			) : (
				<LoginDialog />
			)}
		</>
	);
};

export default AuthBar;
