export function objectClone(obj) {
    const clone = Object.assign({}, obj);
      Object.keys(clone).forEach(subPropertyKey => {
        if(typeof clone[subPropertyKey] === 'object') {
          clone[subPropertyKey] = objectClone(clone[subPropertyKey]);
      }
    });
    return clone;
}
