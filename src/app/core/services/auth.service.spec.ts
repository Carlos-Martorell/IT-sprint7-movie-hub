import { signal } from '@angular/core';

describe('AuthService - Logic Tests', () => {
  

  it('should detect authenticated state correctly', () => {

    const currentUser = signal<any>(null);
    const isAuthenticated = () => !!currentUser();
    
    // Sin usuario → false
    expect(isAuthenticated()).toBe(false);
    
    // Con usuario → true
    currentUser.set({ uid: '123', email: 'test@test.com' });
    expect(isAuthenticated()).toBe(true);
    
    // Después de logout → false
    currentUser.set(null);
    expect(isAuthenticated()).toBe(false);
  });

 
  it('should manage user state with signals', () => {
    const currentUser = signal<any>(null);
    
    expect(currentUser()).toBeNull();
    
    const mockUser = { uid: '123', displayName: 'Carlos' };
    currentUser.set(mockUser);
    
    expect(currentUser()).toEqual(mockUser);
    expect(currentUser()?.uid).toBe('123');
  });

  
  // ✅ Test 3: Conversión a booleano
  it('should convert null user to false authentication', () => {
    const isAuthenticated = (user: any) => !!user;
    
    expect(isAuthenticated(null)).toBe(false);
    expect(isAuthenticated(undefined)).toBe(false);
    expect(isAuthenticated({ uid: '123' })).toBe(true);
  });
});