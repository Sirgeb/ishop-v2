import React from 'react';
import HeaderStyles from './HeaderStyles';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

// import Nav from '../../Nav/Nav';
// import Search from '../../Search/Search';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Header = () => {
	return (
		<HeaderStyles>
			<div className='wrapper'>
				<div className='logo'>
					<Link href='/'>
						<a>
							<i className='fas fa-shopping-bag'></i>&nbsp;&nbsp;
							<span>iShop</span>
						</a>
					</Link>
				</div>
				{/* <Search /> */}
			</div>
			{/* <Nav /> */}
		</HeaderStyles>
	);
};

export default Header;
