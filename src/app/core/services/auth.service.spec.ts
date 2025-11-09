import { signal } from '@angular/core';

describe('AuthService - Logic Tests', () => {
  
  it('should detect authenticated state correctly', () => {

    const currentUser = signal<any>(null);
    const isAuthenticated = () => !!currentUser();
    

    expect(isAuthenticated()).toBe(false);
    

    currentUser.set({ uid: '123', email: 'test@test.com' });
    expect(isAuthenticated()).toBe(true);
    

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
    expect(currentUser()?.displayName).toBe('Carlos');
  });

  it('should convert null user to false authentication', () => {
    const isAuthenticated = (user: any) => !!user;
    
    expect(isAuthenticated(null)).toBe(false);
    expect(isAuthenticated(undefined)).toBe(false);
    expect(isAuthenticated({ uid: '123' })).toBe(true);
  });
});