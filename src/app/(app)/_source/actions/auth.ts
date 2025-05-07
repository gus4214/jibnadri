'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServer } from '@/lib/supabase/server';

export const loginWithKakao = async () => {
	const supabase = createServer();
	const origin = (await headers()).get('origin');

	const { data, error } = await (
		await supabase
	).auth.signInWithOAuth({
		provider: 'kakao',
		options: {
			redirectTo: `${origin}/auth/callback/kakao`,
		},
	});

	if (error) throw error;

	if (data.url) {
		redirect(data.url);
	}
};

export async function logout() {
	const supabase = await createServer();
	await supabase.auth.signOut();

	revalidatePath('/', 'layout');
}
