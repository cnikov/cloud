const viewDescriptor = {
    views: {
      logs_per_category: {
        map: function (doc) {
          if (doc.category && doc.value) {
            emit(doc.category, doc.value);
          }
        },
        reduce: function (key, values) {
          return values
        }
      }
    }
  }
  module.exports = { viewDescriptor }