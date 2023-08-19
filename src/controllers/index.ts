import {
  login as loginController,
  createUser as createUserController,
  confirmEmail as confirmEmailController,
} from './auth-controller';

import {
  updatePassword as updatePasswordController,
  resetPassword as resetPasswordController,
  newPassword as newPasswordController,
} from './password-controller';

import {
  getCurrentUser as getCurrentUserController,
  updateUserAvatar as updateUserAvatarController,
  updateUser as updateUserController,
  logout as logoutController,
} from './user-controller';

import { addProject, getProjects, updateProject } from './project-controller';
import {
  addBook, getBooks, updateBook, deleteBook,
} from './book-controller';
import {
  addBlock, getBlocks, updateBlock, deleteBlock,
} from './block-controller';
import { addTest, updateTest } from './test-controller';

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
  addProject,
  getProjects,
  updateProject,
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  addBlock,
  getBlocks,
  updateBlock,
  deleteBlock,
  addTest,
  updateTest,
};
