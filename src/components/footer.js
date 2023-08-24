import React from 'react';
import { faYoutube, faTwitter, faFacebook, faTelegram, faDiscord, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer(){
  const socialLinks = [
    {
      href: "https://www.youtube.com",
      icon: faYoutube,
    },
    {
      href: "https://www.twitter.com",
      icon: faTwitter,
    },
    {
      href: "https://www.telegram.com",
      icon: faTelegram,
    },
    {
      href: "https://www.facebook.com",
      icon: faFacebook,
    },
    {
      href: "https://www.discord.com",
      icon: faDiscord,
    },
    {
      href: "https://www.linkedin.com",
      icon: faLinkedin,
    },
    {
      href: "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDsXVdHvwkfVJjhHNbpNLxRdzfVMBBJMPtPRXWLmdWBRGBVNtHfDHnpqVBWZGKLsFzzKdH",
      icon: faEnvelope,
    },
    
  ]
  return (
    <footer>
      <div className='footer-bg'>
        <div className='footer'>
          {socialLinks.map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                <button aria-label="Link">
                  <i>
                    <FontAwesomeIcon icon={icon} />
                  </i>
                </button>
              </a>
            ))}
        </div>
      </div>
    </footer>
  )
}