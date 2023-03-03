import {
  login as loginController,
  createUser as createUserController,
  confirmEmail as confirmEmailController,
} from './auth';

import {
  updatePassword as updatePasswordController,
  resetPassword as resetPasswordController,
  newPassword as newPasswordController,
} from './password';

import {
  getCurrentUser as getCurrentUserController,
  updateUserAvatar as updateUserAvatarController,
  updateUser as updateUserController,
  logout as logoutController,
} from './user';

export {
  loginController,
  logoutController,
  createUserController,
  confirmEmailController,
  updatePasswordController,
  resetPasswordController,
  newPasswordController,
  updateUserController,
  getCurrentUserController,
  updateUserAvatarController,
};
