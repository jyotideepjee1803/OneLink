import { FaInstagram, FaSnapchat, FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { LiaTelegramPlane } from "react-icons/lia";
import { AiOutlineDiscord } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";

export const iconMapping:{[key: string]: JSX.Element} = {
    'LinkedIn': <SlSocialLinkedin size={32} className="fill-white"/>,
    'Github': <FiGithub size={32} className="fill-white"/>,
    'Instagram': <FaInstagram size={32} className="fill-white"/>,
    'Telegram': <LiaTelegramPlane size={32} className="fill-white"/>,
    'Snapchat': <FaSnapchat size={32} className="fill-white"/>,
    'Twitter' : <FaXTwitter size={32} className="fill-white"/>,
    'Discord' : <AiOutlineDiscord size={32} className="fill-white"/>,
    'Facebook' : <CiFacebook size={32} className="fill-white"/>
};