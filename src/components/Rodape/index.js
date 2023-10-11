import React from 'react';
import './Rodape.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            Terms Of Use Advisor ® {currentYear}
        </footer>
    );
}

export default Footer;
