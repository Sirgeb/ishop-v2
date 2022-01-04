import React from 'react';
import Link from 'next/link';

import FooterStyles from './FooterStyles';

const Footer = () => {
	return (
		<FooterStyles>
			iShop - Designed and developed by&nbsp;
			<Link prefetch={false} href='https://gabriel-aniora.web.app/'>
				<a target='_blank' title='My Portfolio Link'>
					Sirgeb | Hire Me
				</a>
			</Link>
		</FooterStyles>
	);
};

export default Footer;
