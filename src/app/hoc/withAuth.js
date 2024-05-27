'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const withAuth = (Component) => {
	return (props) => {
		const { currentUser } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!currentUser) {
				router.push('/signIn');
			}
		}, [currentUser, router]);

		if (!currentUser) {
			return null;
		}

		return <Component {...props} />;
	};
};

export default withAuth;
