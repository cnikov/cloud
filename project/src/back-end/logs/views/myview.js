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
          for(var item in values[0]){
            var list = []
            
            for(var i=0;i<3;i++){
              var max = 0
              var index = -1
              for (var j = 0; j < item.with.length; j++) {
                if (list.indexOf(item.with[j]) < 0 && item.quantity[j] >= max) {
                max = item.quantity[j]
                index = j}
              }
            }
            if (index != -1) {
            list.push(item.with[index])

          }
          data[item.name]= list
        }
        return data
        }
        
      }
    }
  }
  module.exports = { viewDescriptor }