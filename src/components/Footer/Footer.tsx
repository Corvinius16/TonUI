import React, { Component } from 'react';
import FooterLinks from './FooterLinks';
import { NavLink } from 'react-router-dom';
import './Footer.css'




class Footer extends Component {
    render(): React.ReactNode {
        return (
            <div className='marginTopAuto'>
                <div className='lineFooter'/>
                <div className='footerContainer'>
                    <div className='footerInnerContainer'>
                        {FooterLinks.map(({ title, links }) => (
                            <div className='footerLinksContainer'  key={title+links.length}>
                                <h4 className='MulishText'>{title}</h4>
                                {links.map(({ title, href }) => (
                                    <NavLink key={title+href} className='MulishText' to={href}>{title}</NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default Footer;