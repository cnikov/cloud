const viewDescriptor = {
    views: {
      logs_per_category: {
        map: function (doc) {
          if (doc['type'].localeCompare("recommendation") ==0){
            var val = doc.value
              for(var user in val){
                var data = {}
                for(var item in val[user]){
                  var list = []
                  for(var i=0;i<3;i++){
                var max = 0
                var index = -1
                for (var j = 0; j <  val[user][item].with.length; j++) {
                  if (list.indexOf( val[user][item].with[j]) < 0 &&  val[user][item].quantity[j] > max) {
                  max =  val[user][item].quantity[j]
                  index = j}
                }
                 if (index != -1) {
              list.push( val[user][item].with[index])
            }
              }
             
            data[val[user][item]['name']]= list
                  
               
                  
                }
                 emit(user, data);
                  
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