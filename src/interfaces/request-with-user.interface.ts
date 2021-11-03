import { Request } from 'express';
import { User } from '../user/user-persistence/schemas/user.schema';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
