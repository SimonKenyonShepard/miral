export function objectClone(obj) {
    const clone = Object.assign({}, obj);
      Object.keys(clone).forEach(subPropertyKey => {
        if(typeof clone[subPropertyKey] === 'object') {
          clone[subPropertyKey] = objectClone(clone[subPropertyKey]);
      }
    });
    return clone;
}

export function createNewObjectsForChangedElements(newData, patch) {
  if(patch.length > 0) {
      patch.forEach(change => {
          const changePath = change.path.split("/");
          newData[changePath[1]][changePath[2]] = {...newData[changePath[1]][changePath[2]]};

      })
  }
  return newData;
}
