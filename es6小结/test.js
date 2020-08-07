(function(global){
  function Set(data) {
    this._value = []
    this._size = 0
    data && data.forEach(element => {
      this.add(element)
    });
  }

  Set.prototype.add = function(data) {
    if (this._value.indexOf(data) == -1) {
      this._value.push(data)
      this._size++
    }
    return this
  }

  Set.prototype.delete = function(data) {
    let index = this._value.indexOf(data)
    if (index == -1)  return false
    this._value.splice(index, 1)
    this._size--
    return true
  }
  
  Set.prototype.has = function(data) {
    return this._value.indexOf(data) != -1
  }

  Set.prototype.clear = function() {
    this._value.length = 0
    this._size = 0
  }

  Set.length = 0;

  global.Set = Set;

})(window)
