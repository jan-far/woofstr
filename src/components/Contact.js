import React from 'react';
import EmailForm from './EmailForm';
import { Navbar } from './navbar';
import './Contact.css';
import useWindowSize from '../hooks/useWindowSize';
import BackgroundImage from '../bg02.jpg';

export default function Contact() {
  const page = useWindowSize();

  return (
    <div className="contact" style={{ ...page }}>
      <Navbar />
      <div
        className="contact__body"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: 'center',
        }}
      >
        <EmailForm />
      </div>
    </div>
  );
}
