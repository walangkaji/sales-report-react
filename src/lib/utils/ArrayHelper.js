const ArrayHelper = {
  chunk: (arr, length) => {
    let result = []
    let copy = arr.slice()
    while (copy.length) {
      result.push(copy.splice(0, length))
    }

    return result
  },
  equals: (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false
    }
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }

    return true
  },
  notEquals: (arr1, arr2) => {
    if (arr1.length === 0 && arr2.length === 0) {
      return false
    }

    if (arr1.length !== arr2.length) {
      return true
    }
    for (var i = arr1.length; i--;) {
      if (arr1[i] === arr2[i]) {
        return false
      }
    }

    return true
  },
  equals2DFeed: (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false
    }
    for (var i = arr1.length; i--;) {
      for (var x = arr1[i].length; x--;) {
        if (arr1[i][1][x] !== arr2[i][1][x]) {
          return false
        }
      }
    }

    return true
  }
}

export default ArrayHelper
