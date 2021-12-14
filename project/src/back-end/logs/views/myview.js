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
          var data = {}
          return values
          for(var item of values){
            var list = []
            for(var i=0;i<3;i++){
              var max = 0
              var index = -1
              for (var j = 0; j < item.with.length; j++) {
                if (list.indexOf(data.with[j]) < 0 && data.quantity[j] >= max) {
                max = item.quantity[j]
                index = j}
              }
            }
            if (index != -1) {
            list.push(data.with[index])

          }
          data[item]= list
        }
        return data
        }
        
      }
    }
  }
  module.exports = { viewDescriptor }