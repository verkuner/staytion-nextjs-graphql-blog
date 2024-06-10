import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAuth = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const getIsLoggedIn = () => {
		// assuming our loggedin status was stored in the localstorage
		const status = localStorage.getItem('loggedInStatus');
		if (status) {
			setIsLoggedIn(true);
		}
		setIsLoggedIn(false);
	};

	useEffect(() => {
		getIsLoggedIn();
	}, [router]);
	return { isLoggedIn };
};
export default useAuth;
