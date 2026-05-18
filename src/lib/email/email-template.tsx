interface ContactEmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  subject,
  message,
}: ContactEmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>
          You&apos;ve receive a new message!
        </h2>

        <div
          style={{
            marginBottom: '16px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '16px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
            From
          </p>
          <p
            style={{
              margin: '0 0 8px 0',
              color: '#333',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {name}
          </p>
          <p style={{ margin: '0', color: '#0066cc' }}>
            <a
              href={`mailto:${email}`}
              style={{ textDecoration: 'none', color: '#0066cc' }}
            >
              {email}
            </a>
          </p>
        </div>

        <div
          style={{
            marginBottom: '16px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '16px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
            Subject
          </p>
          <p
            style={{
              margin: '0',
              color: '#333',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {subject}
          </p>
        </div>

        <div>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
            Message
          </p>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              whiteSpace: 'pre-wrap',
              color: '#333',
            }}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
