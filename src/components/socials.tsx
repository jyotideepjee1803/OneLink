import { FaGithub, FaInstagram, FaLinkedinIn, FaSnapchat, FaXTwitter } from "react-icons/fa6";
import { LiaTelegramPlane } from "react-icons/lia";

export const iconMapping:{[key: string]: JSX.Element} = {
    'LinkedIn': <FaLinkedinIn size={32} className="fill-white"/>,
    'Github': <FaGithub size={32} className="fill-white"/>,
    'Instagram': <FaInstagram size={32} className="fill-white"/>,
    'Telegram': <LiaTelegramPlane size={32} className="fill-white"/>,
    'Snapchat': <FaSnapchat size={32} className="fill-white"/>,
    'Twitter' : <FaXTwitter size={32} className="fill-white"/>,
};