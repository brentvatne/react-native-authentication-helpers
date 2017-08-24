# react-native-authentication-helpers

If you want to set up some super basic authentication in your app, this might be for you.

```javascript
import {
  setUser,
  getUser,
  clearUser,
  withUser,
  loadUserAsync,
} from 'react-native-authentication-helpers';
```

- `UserType`: anything that can save to AsyncStorage.
- `setUser(user: UserType)`: set the user (eg: when you sign in).
- `getUser(): UserType`: get the user (eg: if you need to grab user data outside of a component).
- `clearUser()`: clear the user (eg: when you sign out).
- `withUser(Component: ReactComponent)` - a higher order component that passes in a `user` prop and is updated whenever it changes.
- `loadUserAsync(): Promise<UserType?>` - load user data from `AsyncStorage` -- the user is returned but you don't need to do anything with it
- `setUser`, `clearUser` automatically persist changes to `AsyncStorage`.
- `setUser`, `clearUser`, and `loadUserAsync` all emit updates for components wrapped by the `withUser` HOC
