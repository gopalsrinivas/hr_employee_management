const {
  getPagination,
  getOrder,
  buildSearch,
  buildExactFilters,
  buildPaginationMeta,
  Op
} = require("./listQuery");
const { createAuditFields, updateAuditFields, deleteAuditFields } = require("./audit");
const { NotFoundError } = require("./appError");

const createCrudService = ({
  model,
  modelName,
  searchFields = [],
  filterFields = [],
  sortFields = ["created_at", "updated_at", "id"],
  defaultSort = "created_at",
  include = [],
  beforeCreate,
  beforeUpdate,
  beforeDelete,
  buildWhere,
  afterCreate,
  afterUpdate
}) => {
  const list = async (query = {}, user) => {
    const { page, limit, offset } = getPagination(query);
    const where = {
      ...buildSearch(query.search, searchFields),
      ...buildExactFilters(query, filterFields),
      ...(buildWhere ? await buildWhere(query, user) : {})
    };

    const result = await model.findAndCountAll({
      where,
      include,
      limit,
      offset,
      distinct: true,
      order: getOrder(query, sortFields, defaultSort)
    });

    return {
      records: result.rows,
      pagination: buildPaginationMeta(page, limit, result.count)
    };
  };

  const getById = async (id, user) => {
    const record = await model.findByPk(id, { include });

    if (!record) {
      throw new NotFoundError(`${modelName} not found`);
    }

    if (buildWhere) {
      const accessWhere = await buildWhere({}, user);
      const isDenied = Object.entries(accessWhere).some(([key, value]) => {
        if (value === undefined) {
          return false;
        }
        return String(record[key]) !== String(value);
      });
      if (isDenied) {
        throw new NotFoundError(`${modelName} not found`);
      }
    }

    return record;
  };

  const create = async (payload, user) => {
    const nextPayload = beforeCreate ? await beforeCreate(payload, user) : payload;
    const record = await model.create({
      ...nextPayload,
      ...createAuditFields(user)
    });

    if (afterCreate) {
      await afterCreate(record, payload, user);
    }

    return getById(record.id, user);
  };

  const update = async (id, payload, user) => {
    const record = await getById(id, user);
    const nextPayload = beforeUpdate ? await beforeUpdate(record, payload, user) : payload;

    await record.update({
      ...nextPayload,
      ...updateAuditFields(user)
    });

    if (afterUpdate) {
      await afterUpdate(record, payload, user);
    }

    return getById(id, user);
  };

  const remove = async (id, user) => {
    const record = await getById(id, user);

    if (beforeDelete) {
      await beforeDelete(record, user);
    }

    await record.update(deleteAuditFields(user));
    await record.destroy();

    return true;
  };

  return {
    list,
    getById,
    create,
    update,
    remove,
    Op
  };
};

module.exports = createCrudService;
