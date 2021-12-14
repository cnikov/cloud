const viewDescriptor = {
    views: {
      logs_per_category: {
        map: function (doc) {
          if (doc.type && doc.value) {
            emit(doc.type, doc.value);
          }
        },
        reduce: function (key, values) {
          return values
        }
      }
    }
  }
  module.exports = { viewDescriptor }