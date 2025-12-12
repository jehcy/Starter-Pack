import { NextResponse } from 'next/server';
import { init } from '@instantdb/admin';
import { getSystemWideUsage, getTopUsersByUsage, getPromptUsage } from '@/lib/prompt-limits';

// Initialize InstantDB admin client for server-side auth verification
const adminDb = init({
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID!,
  adminToken: process.env.INSTANTDB_ADMIN_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    // Verify authentication
    if (!refreshToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const authUser = await adminDb.auth.verifyToken(refreshToken);
    if (!authUser) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Verify user is admin
    const { userProfiles } = await adminDb.query({
      userProfiles: {
        $: { where: { userId: authUser.id } },
      },
    });

    const profile = userProfiles?.[0];
    if (!profile || profile.userType !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all stats in parallel
    const [systemUsage, topUsers, adminUsage] = await Promise.all([
      getSystemWideUsage(),
      getTopUsersByUsage(10),
      getPromptUsage(authUser.id),
    ]);

    return NextResponse.json({
      systemUsage,
      topUsers,
      adminUsage: adminUsage
        ? {
            promptCount: adminUsage.promptCount,
            inputTokens: adminUsage.inputTokens ?? 0,
            outputTokens: adminUsage.outputTokens ?? 0,
          }
        : { promptCount: 0, inputTokens: 0, outputTokens: 0 },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
