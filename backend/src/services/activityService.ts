import { prisma } from '../config/prisma';

export class ActivityService {
  static async log(params: {
    userId?: string;
    userName: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: any;
    ipAddress?: string;
  }) {
    try {
      await prisma.activityLog.create({
        data: {
          userId: params.userId,
          userName: params.userName,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId,
          details: params.details ? (typeof params.details === 'string' ? params.details : JSON.stringify(params.details)) : null,
          ipAddress: params.ipAddress,
        },
      });
    } catch (err) {
      console.error('[ActivityService Error]: Could not record activity log:', err);
    }
  }
}
