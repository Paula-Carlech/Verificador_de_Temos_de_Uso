import React from 'react';
import './Rodape.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            SysATU ® {currentYear}
        </footer>
    );
}

export default Footer;
