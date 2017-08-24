import React from 'react';
import { AsyncStorage } from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import { EventEmitter } from 'fbemitter';

const USER_KEY = 'react-native-authentication-helpers/user';
let _user = null;

let emitter = new EventEmitter();

export async function loadUserAsync() {
  let result = await AsyncStorage.getItem(USER_KEY);

  try {
    _user = JSON.parse(result);
    Object.freeze(_user);
    _emitUserChangeEvent();
    return _user;
  } catch (e) {
    return null;
  }
}

function _emitUserChangeEvent() {
  emitter.emit('change', _user);
}

export function getUser() {
  return _user;
}

export function setUser(user) {
  AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  _user = user;
  _emitUserChangeEvent();
}

export function clearUser() {
  AsyncStorage.removeItem(USER_KEY);
  _user = null;
  _emitUserChangeEvent();
}

export function withUser(WrappedComponent) {
  class ComponentWithUser extends React.Component {
    static displayName = `withUser(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    state = {
      user: _user,
    };

    componentWillMount() {
      this._mounted = true;
      this._subscription = emitter.addListener('change', user => {
        this._mounted && this.setState({ user });
      });
    }

    componentWillUnmount() {
      this._mounted = false;
      this._subscription.remove();
    }

    render() {
      return <WrappedComponent {...this.props} user={this.state.user} />;
    }
  }

  return hoistStatics(ComponentWithUser, WrappedComponent);
}
