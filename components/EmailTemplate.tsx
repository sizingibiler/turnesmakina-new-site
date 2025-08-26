import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, message }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
    <div style={{ maxWidth: '600px', margin: 'auto', backgroundColor: 'white', padding: '30px', borderRadius: '10px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Yeni Mesaj: Turnes Makina
      </h1>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Gönderen:</strong> {name}
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>E-posta:</strong> <a href={`mailto:${email}`} style={{ color: '#007BFF' }}>{email}</a>
      </p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #eee' }}>
        <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6' }}>
          {message}
        </p>
      </div>
      <p style={{ marginTop: '30px', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
        Bu e-posta Turnes Makina web sitesi üzerinden gönderilmiştir.
      </p>
    </div>
  </div>
);
