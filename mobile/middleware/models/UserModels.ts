/**
 * User Model as defined in Strapi `backend` project.
 */

import { User } from "../../types";
import { login, logout } from "../controllers/UserController";

class UserModel {
  user: User = {} as User;
  constructor(user: User) {
    this.user = {...user};
  }

  async login() {
    const result = await login(this.user);

    if (!result) {
      throw new Error("Unable to login user.");
    }

    return true;
  }

  async logout() {
    const result = await logout(this.user);

    if (!(result as any)) {
      throw new Error("Unable to logout user.");
    }

    return true;
  }
}

export default UserModel;
