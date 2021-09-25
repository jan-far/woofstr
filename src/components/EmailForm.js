import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { DeviceSize } from './responsive';

const EmailMobileFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 50px;
  height: 90vh;
`;

const EmailTabletUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 50px;
  height: 50vh;
`;

const EmailInput = styled.input`
  border: none;
  border-radius: 4px;
  height: 2em;
`;

const EmailMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 75vw;
  margin: 24px 0px;
`;

const EmailMessage = styled.textarea`
  width: 75vw;
  max-width: 600px;
  height: 5em;
  border-radius: 4px;
  border: none;
`;

const SendButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75vw;
`;

const SendButton = styled.button`
  border-radius: 4px;
  border: none;
  background-color: #800080;
  color: #fff;
  width: 200px;
  height: 2em;
`;

const EmailForm = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const submitRequest = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDisabled(true);

    const params = {
      to_email: email,
      to_message: message,
    };

    emailjs
      .send(
        'david@woofstr.com',
        'template_90v52cz',
        params,
        'user_lQnsVPMdQthP4zZDhtJ6O'
      )
      .then(
        (result) => {
          setFeedback(`Nice - You're in!`);
          setTimeout(() => {
            setFeedback('');
            setEmail('');
            setMessage('');
            setDisabled(false);
          }, 5000);
        },
        (error) => {
          setFeedback('Message failed to send.');
          setTimeout(() => {
            setFeedback('');
            setEmail('');
          }, 4000);
        }
      );
  };

  const onEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const onMessageChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
  };

  const EmailForm = () => (
    <>
      <label>Email</label>
      <EmailInput
        type="email"
        name="email"
        id="email"
        placeholder="your email address"
        onChange={onEmailChange}
        value={email}
        required
      />
      <EmailMessageContainer>
        <label>Message</label>
        <EmailMessage
          name="message"
          id="message"
          placeholder="enter your message here"
          onChange={onMessageChange}
          value={message}
        ></EmailMessage>
      </EmailMessageContainer>
      <SendButtonContainer>
        <SendButton type="submit" disabled={disabled}>
          Send
        </SendButton>
      </SendButtonContainer>
      <span>{feedback}</span>
      <input type="hidden" name="form-name" value="woofstr-signup" />
    </>
  );
  return (
    <>
      {isMobile ? (
        <EmailMobileFormContainer
          id="signup-form"
          onSubmit={submitRequest}
          className="email__form"
        >
          <EmailForm />
        </EmailMobileFormContainer>
      ) : (
        <EmailTabletUpFormContainer
          id="signup-form"
          onSubmit={submitRequest}
          className="email__form"
        >
          <EmailForm />
        </EmailTabletUpFormContainer>
      )}
    </>
  );
};

export default EmailForm;
