import { useAuth } from '../context/AuthContext';
import { useHelloUser } from '../hooks/queries/useUsers';

export function HomePage() {
  const { user } = useAuth();
  const { data: helloMessage, isLoading, isError } = useHelloUser();
  
  return (
    <div>
      <h1>The Art of <br />Building Faster.</h1>
      <p style={{ marginTop: '24px', fontSize: '18px', maxWidth: '600px' }}>
        Welcome back, {user?.name}. Your workspace is optimized and ready for your next creative endeavor.
      </p>

      <div style={{ marginTop: '40px', padding: '24px', background: 'var(--white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--royal-blue)', marginBottom: '8px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          API Test Connection
        </h3>
        
        {isLoading && <p style={{ fontSize: '14px', color: 'var(--gray-400)' }}>Pinging backend...</p>}
        {isError && <p style={{ fontSize: '14px', color: '#ef4444' }}>Failed to connect to the backend.</p>}
        {helloMessage && (
          <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
            Backend response: <strong>{helloMessage}</strong>
          </p>
        )}
      </div>
      
      <div style={{ marginTop: '60px', height: '1500px', padding: '40px', background: 'var(--white)', border: '1px solid var(--gray-100)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-soft)' }}>
        <h3>Scroll down to test the sticky header</h3>
        <p style={{ marginTop: '16px' }}>This container is artificially tall to demonstrate the sticky navigation behavior.</p>
      </div>
    </div>
  );
}
