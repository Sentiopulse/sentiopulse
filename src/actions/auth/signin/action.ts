'use server';

import { actionClient } from '@/lib/action';
import { Signin} from './logic';
import { SigninSchema} from './schema';

export const signinAction = actionClient
  .inputSchema(SigninSchema)
  .metadata({ actionName: 'signin' })
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    try {
      const result = await Signin(parsedInput);

      if (result.success) {
        return result.data;
      }

      throw new Error(result.error, { cause: { internal: true } });
    } catch (err) {
      const error = err as Error;
      const cause = error.cause as { internal: boolean } | undefined;

      if (cause?.internal) {
        throw new Error(error.message, { cause: error });
      }

      console.error('Sign in error:', error);
      throw new Error('Something went wrong');
    }
  });
