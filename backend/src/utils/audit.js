const getUserId = (user) => (user && user.id ? user.id : null);

const createAuditFields = (user) => ({
  created_by: getUserId(user),
  updated_by: getUserId(user)
});

const updateAuditFields = (user) => ({
  updated_by: getUserId(user)
});

const deleteAuditFields = (user) => ({
  deleted_by: getUserId(user)
});

module.exports = {
  createAuditFields,
  updateAuditFields,
  deleteAuditFields,
  getUserId
};
