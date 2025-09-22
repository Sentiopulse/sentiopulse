import 'server-only';

import { Result, success } from '@/lib/result';
import { getSession } from '@/lib/session';

export async function Signout(): Promise<Result<undefined>> {
  const session = await getSession();
  await session.destroy();
  return success(undefined);
}
