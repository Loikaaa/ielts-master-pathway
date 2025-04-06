
import { OAuthResponse } from '@/types/user';

export const mockOAuthLogin = async (
  provider: 'google' | 'facebook',
  redirectUrl?: string
): Promise<OAuthResponse> => {
  // In a real OAuth flow:
  // 1. Redirect to OAuth provider
  // 2. User authenticates with provider
  // 3. Provider redirects back to your app with a code
  // 4. Exchange code for access token
  // 5. Use access token to get user info
  
  console.log(`Simulating ${provider} OAuth flow with redirect to: ${redirectUrl || 'default redirect'}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate random user data for demo
  const id = `${provider}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
  let firstName, lastName, email, profileImage;
  
  if (provider === 'google') {
    const names = [
      { first: 'Emma', last: 'Wilson' },
      { first: 'Noah', last: 'Taylor' },
      { first: 'Olivia', last: 'Adams' },
      { first: 'Liam', last: 'Martinez' }
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    firstName = randomName.first;
    lastName = randomName.last;
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
    profileImage = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&background=4285F4`;
  } else {
    const names = [
      { first: 'Sophia', last: 'Johnson' },
      { first: 'Jackson', last: 'Williams' },
      { first: 'Mia', last: 'Brown' },
      { first: 'Lucas', last: 'Jones' }
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    firstName = randomName.first;
    lastName = randomName.last;
    email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@facebook.com`;
    profileImage = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&background=3b5998`;
  }
  
  return {
    provider,
    id,
    email,
    firstName,
    lastName,
    profileImage
  };
};

export const getOAuthLoginUrl = (
  provider: 'google' | 'facebook',
  redirectUrl: string
): string => {
  // In a real app, this would generate the correct OAuth authorization URL
  const baseUrl = provider === 'google' 
    ? 'https://accounts.google.com/o/oauth2/v2/auth'
    : 'https://www.facebook.com/v13.0/dialog/oauth';
    
  // Mock client IDs - in a real app these would be environment variables  
  const clientId = provider === 'google'
    ? 'mock-google-client-id-123456'
    : 'mock-facebook-app-id-123456';
    
  // Construct a mock OAuth URL (this is just for demonstration)  
  return `${baseUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=${provider === 'google' ? 'email profile' : 'email'}`;
};
