import { prisma } from '../db/index.js';

// Base controller with common CRUD operations
export const baseController = {
  // Generic find by ID
  async findById(model, id, include = {}) {
    return prisma[model].findUnique({
      where: { id },
      include
    });
  },

  // Generic find many with filters
  async findMany(model, filters = {}, include = {}, pagination = {}) {
    const { skip, take } = pagination;
    return prisma[model].findMany({
      where: filters,
      include,
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    });
  },

  // Generic create
  async create(model, data, include = {}) {
    return prisma[model].create({
      data,
      include
    });
  },

  // Generic update
  async update(model, id, data, include = {}) {
    return prisma[model].update({
      where: { id },
      data,
      include
    });
  },

  // Generic delete
  async delete(model, id) {
    return prisma[model].delete({
      where: { id }
    });
  },

  // Generic status update
  async updateStatus(model, id, status) {
    return prisma[model].update({
      where: { id },
      data: { status }
    });
  },

  // Generic count with filters
  async count(model, filters = {}) {
    return prisma[model].count({
      where: filters
    });
  },

  // Generic bulk create
  async createMany(model, data) {
    return prisma[model].createMany({
      data
    });
  },

  // Generic soft delete (update status to INACTIVE)
  async softDelete(model, id) {
    return prisma[model].update({
      where: { id },
      data: { status: 'INACTIVE' }
    });
  },

  // Generic approval handling
  async handleApproval(model, id, approverId, status, comments = null) {
    const approval = await prisma.approval.create({
      data: {
        approverId,
        status,
        comments,
        [`${model.toLowerCase()}Id`]: id
      }
    });

    // Update the main record's status
    await prisma[model].update({
      where: { id },
      data: { status }
    });

    return approval;
  },

  // Generic notification creation
  async createNotification(userId, message) {
    return prisma.notification.create({
      data: {
        userId,
        message
      }
    });
  },

  // Generic audit log creation
  async createAuditLog(userId, action, details) {
    return prisma.auditLog.create({
      data: {
        userId,
        action,
        details
      }
    });
  },

  // Generic search with filters and sorting
  async search(model, searchQuery = {}, filters = {}, sortOptions = {}, pagination = {}) {
    const { skip, take } = pagination;
    const where = {
      ...filters,
      ...searchQuery
    };

    return prisma[model].findMany({
      where,
      orderBy: sortOptions,
      skip,
      take
    });
  },

  // Generic batch update
  async updateMany(model, filters = {}, data = {}) {
    return prisma[model].updateMany({
      where: filters,
      data
    });
  },

  // Generic relation count
  async getRelationCount(model, id, relation) {
    const result = await prisma[model].findUnique({
      where: { id },
      include: {
        [relation]: {
          select: {
            _count: true
          }
        }
      }
    });
    return result?.[relation]?._count || 0;
  },

  // Generic status transition validation
  async validateStatusTransition(model, id, newStatus, allowedTransitions = {}) {
    const record = await prisma[model].findUnique({
      where: { id },
      select: { status: true }
    });

    if (!record) {
      throw new Error('Record not found');
    }

    const currentStatus = record.status;
    const allowed = allowedTransitions[currentStatus] || [];

    if (!allowed.includes(newStatus)) {
      throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }

    return true;
  },

  // Generic pagination helper
  async paginate(model, query = {}, page = 1, limit = 10, include = {}, sortBy = 'createdAt', sortOrder = 'desc') {
    const skip = (page - 1) * limit;
    const [total, items] = await Promise.all([
      prisma[model].count({ where: query }),
      prisma[model].findMany({
        where: query,
        include,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder }
      })
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  // Generic validation helper
  async validateUnique(model, field, value, excludeId = null) {
    const where = {
      [field]: value
    };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    const existing = await prisma[model].findFirst({ where });
    return !existing;
  },

  // Generic status aggregation
  async getStatusCounts(model, filters = {}) {
    const counts = await prisma[model].groupBy({
      by: ['status'],
      where: filters,
      _count: true
    });
    return counts.reduce((acc, curr) => {
      acc[curr.status] = curr._count;
      return acc;
    }, {});
  },

  // Generic date range query helper
  async findByDateRange(model, dateField, startDate, endDate, filters = {}, include = {}) {
    return prisma[model].findMany({
      where: {
        ...filters,
        [dateField]: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include
    });
  },

  // Generic batch status update
  async updateManyStatus(model, ids, status) {
    return prisma[model].updateMany({
      where: {
        id: { in: ids }
      },
      data: { status }
    });
  },

  // Generic related records deletion
  async deleteWithRelated(model, id, relations = []) {
    const deleteRelated = relations.map(relation =>
      prisma[relation].deleteMany({
        where: { [`${model.toLowerCase()}Id`]: id }
      })
    );

    await prisma.$transaction([
      ...deleteRelated,
      prisma[model].delete({ where: { id } })
    ]);
  },

  // Generic stats by time period
  async getStatsByPeriod(model, timeField = 'createdAt', period = 'day', filters = {}) {
    const grouping = period === 'month' ? '$month' :
      period === 'year' ? '$year' : '$dayOfMonth';

    return prisma[model].aggregate({
      where: filters,
      _count: true,
      by: [timeField]
    });
  },

  // Generic department-wise analytics
  async getDepartmentStats(model, filters = {}) {
    return prisma[model].groupBy({
      by: ['department'],
      where: filters,
      _count: true,
      _sum: {
        amount: true
      }
    });
  },

  // Generic workflow transition helper
  async transition(model, id, fromStatus, toStatus, actorId, reason = '') {
    return prisma.$transaction(async (tx) => {
      const record = await tx[model].findUnique({
        where: { id }
      });

      if (!record || record.status !== fromStatus) {
        throw new Error('Invalid transition state');
      }

      const updated = await tx[model].update({
        where: { id },
        data: { status: toStatus }
      });

      await tx.auditLog.create({
        data: {
          userId: actorId,
          action: `${model}_STATUS_CHANGE`,
          details: {
            from: fromStatus,
            to: toStatus,
            reason
          }
        }
      });

      return updated;
    });
  }
};

// Common notification function
export const createNotification = async (userId, message, type = 'INFO') => {
  return prisma.notification.create({
    data: {
      userId,
      message,
      type
    }
  });
};

// Common audit log function
export const createAuditLog = async (userId, action, details = {}) => {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      details: JSON.stringify(details)
    }
  });
};
