const viewDescriptor = {
    views: {
      logs_per_category: {
        map: function (doc) {
          if (doc['type'].localeCompare("recommendation") ==0){
            for(var user in doc.value){
              emit(user, doc['value'][user]);
            }
           
          }
        },
        reduce: function (key, values) {
          return values
        }
      }
    }
  }
  module.exports = { viewDescriptor }