import React, {useEffect} from 'react';
import './ShortPopUp.module.scss'; // Import your CSS for styling
import moneyBagsGif from '../../assets/money-bags.gif';

interface ShortPopupProps {
    onClose: () => void;
}

const ShortPopup: React.FC<ShortPopupProps> = ({onClose}) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [onClose]);

    return (
        <div className="short-popup">
            <img src={moneyBagsGif} alt="Money Bags GIF"/>
        </div>
    );
};

export default ShortPopup;