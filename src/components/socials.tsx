import { FaGithub, FaInstagram, FaLinkedinIn, FaSnapchat, FaXTwitter } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";

export const iconMapping:{[key: string]: JSX.Element} = {
    'LinkedIn': <FaLinkedinIn size={32}/>,
    'Github': <FaGithub size={32}/>,
    'Instagram': <FaInstagram size={32}/>,
    'Telegram': <LiaTelegramPlane size={32}/>,
    'Snapchat': <FaSnapchat size={32}/>,
    'Twitter' : <FaXTwitter size={32}/>,
};