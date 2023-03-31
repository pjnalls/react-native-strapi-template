import { User } from "../../types";
import { store } from "../Store";

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.

/** TODO: Ensure `jwt` parameter has an explicit type. */
export const saveUser = (jwt: any, user: User) => {
  store.dispatch({
    type: "USER_SAVE",
    payload: {
      jwt,
      user,
    },
  });
};

export const deleteUser = () => {
  store.dispatch({ type: "USER_DELETE" });
};
