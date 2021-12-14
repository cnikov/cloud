const viewDescriptor = {
    views: {
      logs_per_category: {
        map: function (doc) {
          if (doc._id && doc.value) {
            emit(doc._id, doc.value);
          }
        },
        reduce: function (key, values) {
          return values
        }
      }
    }
  }
  module.exports = { viewDescriptor }