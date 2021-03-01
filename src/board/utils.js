export function objectClone(obj) {
    const clone = Object.assign({}, obj);
      Object.keys(clone).forEach(subPropertyKey => {
        if(Array.isArray(clone[subPropertyKey])) {
          clone[subPropertyKey] = [].concat(clone[subPropertyKey]);
        } else if(typeof clone[subPropertyKey] === 'object') {
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

export function isObjectAndNotNull(item) {
  return typeof item === 'object' && item !== null;
};

export function mergeObjects(primaryObject, mergeObject) {
  const mergedObject = {...primaryObject};
  Object.keys(mergeObject).forEach(key => {
    if(Array.isArray(mergeObject[key]) && Array.isArray(primaryObject[key])) {
      mergedObject[key] = mergedObject[key].concat(mergeObject[key]);
    } else if(isObjectAndNotNull(mergeObject[key]) && isObjectAndNotNull(primaryObject[key])) {
      mergedObject[key] = mergeObjects(primaryObject[key], mergeObject[key]);
    } else {
      mergedObject[key] = mergeObject[key];
    }
  });
  return mergedObject;
}

export function removeData(primaryObject, mergeObject) {
  const mergedObject = {...primaryObject};
  Object.keys(mergeObject).forEach(key => {
    
    if(Array.isArray(mergeObject[key]) && Array.isArray(primaryObject[key])) {
      mergeObject[key].forEach(itemToRemove => {
        mergedObject[key] = mergedObject[key].filter(item => item !== itemToRemove);
      });
    } else if(isObjectAndNotNull(mergeObject[key]) && isObjectAndNotNull(primaryObject[key])) {
      mergedObject[key] = removeData(primaryObject[key], mergeObject[key]);
    } else {
      delete mergedObject[key];
    }
  });
  return mergedObject;
}

export function updateDocumentTitle(newTitle) {
  document.title = "Workshoppr.com - "+newTitle;
}